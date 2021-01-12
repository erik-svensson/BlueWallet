import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, FlatButton, CheckBox } from 'app/components';
import {
  Route,
  MainCardStackNavigatorParams,
  RootStackParams,
  NotificationNavigatorParams,
  ConfirmAddressFlowType,
  Wallet,
  ActionMeta,
} from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import {
  checkSubscription,
  CheckSubscriptionAction,
  createNotificationEmail,
  CreateNotificationEmailAction,
} from 'app/state/notifications/actions';
import { unSubscribedWallets } from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

type Item = any; // TODO will be changed to proper type when implementing logic

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    CompositeNavigationProp<
      StackNavigationProp<NotificationNavigatorParams, Route.ConfirmNotificationCode>,
      StackNavigationProp<MainCardStackNavigatorParams, Route.ChooseWalletsForNotification>
    >
  >;
  wallets: Wallet[];
  route: RouteProp<MainCardStackNavigatorParams, Route.ChooseWalletsForNotification>;
  checkSubscription: (wallets: Wallet[], email: string) => CheckSubscriptionAction;
  createNotificationEmail: (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
}

interface State {
  wallets: any[];
}

export class ChooseWalletsForNotificationScreen extends PureComponent<Props, State> {
  state = {
    wallets: [],
  };

  async componentDidMount() {
    const {
      wallets,
      checkSubscription,
      route: {
        params: { email },
      },
    } = this.props;
    checkSubscription(wallets, email); // handle errors
  }

  onConfirm = () => {
    this.proceed();
  };

  goToSuccessScreen = () =>
    CreateMessage({
      title: i18n.message.success,
      description: i18n.notifications.emailAddedSuccessMessage,
      type: MessageType.success,
      buttonProps: {
        title: i18n.notifications.goToNotifications,
        onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
      },
    });

  onSkip = () =>
    this.props.createNotificationEmail(this.props.route.params.email, { onSuccess: this.goToSuccessScreen });

  addWallet = (wallet: Item) => this.setState((state: State) => ({ wallets: [...state.wallets, wallet] }));

  removeWallet = (selectingWallet: Item) =>
    this.setState((state: State) => ({
      wallets: state.wallets.filter(wallet => wallet.id !== selectingWallet.id),
    }));

  checkWallet = (wallet: Item) => (this.isWalletChecked(wallet) ? this.removeWallet(wallet) : this.addWallet(wallet));

  checkAll = () => this.setState({ wallets: this.areAllWalletsChecked() ? [] : this.props.wallets });

  areAllWalletsChecked = () => this.props.wallets.length === this.state.wallets.length;

  isWalletChecked = (selectedWallet: any) => this.state.wallets.some((wallet: Item) => wallet.id === selectedWallet.id);

  renderItem = (item: Wallet) => {
    return (
      <View style={styles.itemRow}>
        <View style={styles.row}>
          <CheckBox
            checked={this.isWalletChecked(item)}
            onPress={() => this.checkWallet(item)}
            containerStyle={styles.checkBox}
          />
          <View>
            <Text style={styles.walletName}>{item.label}</Text>
            <Text style={styles.caption}>{item.getAddressForTransaction()}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}> {i18n.tabNavigator.wallets}</Text>
      <CheckBox checked={this.areAllWalletsChecked()} onPress={this.checkAll} containerStyle={styles.checkBox} />
    </View>
  );

  proceed = () => {
    const {
      navigation,
      route: { params },
    } = this.props;

    if (params.isOnboarding) {
      navigation.navigate(Route.ConfirmNotificationCode, { email: params.email });
    } else {
      this.props.navigation.navigate(Route.ConfirmEmail, {
        email: params.email,
        flowType: ConfirmAddressFlowType.FIRST_ADDRESS,
        walletsToSubscribe: this.state.wallets,
      });
    }
  };

  render() {
    const {
      wallets,
      route: {
        params: { email },
      },
    } = this.props;
    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={
          <>
            <Button title={i18n._.confirm} disabled={!this.state.wallets.length} onPress={this.onConfirm} />
            <FlatButton containerStyle={styles.skipButton} title={i18n._.skip} onPress={this.onSkip} />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.getNotification}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.chooseWalletsDescription}</Text>
        </View>
        <View style={styles.amountInput}>
          <Text style={styles.amount}>{email}</Text>
        </View>

        <FlatList
          data={wallets.filter(wallet => !wallet.isSubscribed)}
          renderItem={item => this.renderItem(item.item)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderListHeader()}
        />
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    wallets: unSubscribedWallets(state),
  };
};

const mapDispatchToProps = {
  checkSubscription,
  createNotificationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWalletsForNotificationScreen);

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  infoDescription: {
    ...typography.caption,
    color: palette.textGrey,
    margin: 20,
    textAlign: 'center',
  },
  amountInput: { width: '100%', borderBottomColor: palette.grey, borderBottomWidth: 1, paddingBottom: 10 },
  amount: { ...typography.caption, color: palette.textGrey },
  skipButton: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  itemRow: {
    marginVertical: 8,
  },
  checkBox: {
    justifyContent: 'flex-start',
    padding: 0,
  },
  walletName: { ...typography.subtitle6 },
  caption: { ...typography.warning, color: palette.textGrey },
  listHeader: {
    marginTop: 24,
  },
  listHeaderTitle: {
    ...typography.overline,
    color: palette.textGrey,
    marginLeft: 7,
    marginBottom: 5,
  },
});
