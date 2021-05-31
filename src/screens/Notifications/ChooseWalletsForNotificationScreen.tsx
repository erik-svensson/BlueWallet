import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEmpty } from 'lodash/fp';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, FlatButton, CheckBox, EllipsisText } from 'app/components';
import { Route, RootStackParams, Wallet, ConfirmAddressFlowType } from 'app/consts';
import { ApplicationState } from 'app/state';
import {
  subscribeWallet as subscribeWalletAction,
  SubscribeWalletActionCreator,
  unsubscribeWallet as unsubscribeWalletAction,
  subscribeDeviceToken as subscribeDeviceTokenAction,
  UnsubscribeWalletActionCreator,
} from 'app/state/notifications/actions';
import { isLoading, readableError } from 'app/state/notifications/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ChooseWalletsForNotification>;
  route: RouteProp<RootStackParams, Route.ChooseWalletsForNotification>;
  subscribe: SubscribeWalletActionCreator;
  subscribeFcmToken: (wallet: Wallet[]) => void;
  unsubscribe: UnsubscribeWalletActionCreator;
  error: string;
  isLoading: boolean;
}

interface State {
  wallets: Wallet[];
}

export class ChooseWalletsForNotificationScreen extends PureComponent<Props, State> {
  state = {
    wallets: [],
  };

  componentDidMount() {
    if (this.props.route.params?.wallet && !isEmpty(this.props.route.params?.wallet)) {
      this.setState((state: State) => ({ wallets: [...state.wallets, this.props.route.params?.wallet] }));
    }
  }

  addWallet = (wallet: Wallet) => this.setState((state: State) => ({ wallets: [...state.wallets, wallet] }));

  removeWallet = (selectingWallet: Wallet) =>
    this.setState((state: State) => ({
      wallets: state.wallets.filter(wallet => wallet.id !== selectingWallet.id),
    }));

  checkWallet = (wallet: Wallet) => (this.isWalletChecked(wallet) ? this.removeWallet(wallet) : this.addWallet(wallet));

  checkAll = () => this.setState({ wallets: this.areAllWalletsChecked() ? [] : this.props.route.params.wallets });

  areAllWalletsChecked = () => this.props.route.params.wallets.length === this.state.wallets.length;

  isWalletChecked = (selectedWallet: Wallet) =>
    this.state.wallets.some((wallet: Wallet) => wallet.id === selectedWallet.id);

  renderItem = (item: Wallet) => {
    return (
      <View style={styles.itemRow}>
        <View style={styles.row}>
          <CheckBox
            testID={`subscribe-${item.label}-wallet-checkbox`}
            checked={this.isWalletChecked(item)}
            onPress={() => this.checkWallet(item)}
            containerStyle={styles.checkBox}
          />
          <View>
            <EllipsisText style={styles.walletName}>{item.label}</EllipsisText>
            <Text style={styles.caption}>{item.getAddressForTransaction()}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}> {i18n.tabNavigator.wallets}</Text>
      <CheckBox
        testID="subscribe-all-wallets-checkbox"
        checked={this.areAllWalletsChecked()}
        onPress={this.checkAll}
        containerStyle={styles.checkBox}
      />
    </View>
  );

  onResend = () => {
    const {
      route: { params },
    } = this.props;

    if (params.flowType === ConfirmAddressFlowType.SUBSCRIBE) {
      return this.props.subscribe(this.state.wallets, params.email);
    }
    if (params.flowType === ConfirmAddressFlowType.UNSUBSCRIBE) {
      return this.props.unsubscribe(this.state.wallets, params.email);
    }
  };

  onConfirm = () => {
    const {
      navigation,
      route: { params },
    } = this.props;

    if (params.flowType === ConfirmAddressFlowType.SUBSCRIBE) {
      this.props.subscribe(this.state.wallets, params.email);
      //TODO:
      this.props.subscribeFcmToken(this.state.wallets);
      return navigation.navigate(Route.ConfirmEmail, {
        email: params.email,
        flowType: params.flowType,
        onSuccess: params.onSuccess,
        onResend: this.onResend,
      });
    }
    if (params.flowType === ConfirmAddressFlowType.UNSUBSCRIBE) {
      this.props.unsubscribe(this.state.wallets, params.email);
      navigation.navigate(Route.ConfirmEmail, {
        email: params.email,
        flowType: params.flowType,
        onSuccess: params.onSuccess,
        onResend: this.onResend,
      });
    }
  };

  render() {
    const {
      isLoading,
      route: {
        params: { email, wallets, onSkip, subtitle, description },
      },
    } = this.props;

    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={
          <>
            <Button
              testID="confirm-action-button"
              title={i18n._.confirm}
              disabled={!this.state.wallets.length}
              onPress={this.onConfirm}
            />
            <FlatButton
              testID="skip-button"
              containerStyle={styles.skipButton}
              title={i18n._.skip}
              onPress={onSkip}
              loading={isLoading}
            />
          </>
        }
        noScroll
        contentContainer={styles.screenTemplate}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{subtitle}</Text>
          <Text style={styles.infoDescription}>{description}</Text>
        </View>
        <View style={styles.amountInput}>
          <Text testID="email-address-text" style={styles.amount}>
            {email}
          </Text>
        </View>

        <FlatList
          data={wallets}
          renderItem={item => this.renderItem(item.item)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderListHeader()}
        />
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  error: readableError(state),
  isLoading: isLoading(state),
});

const mapDispatchToProps = {
  subscribe: subscribeWalletAction,
  unsubscribe: unsubscribeWalletAction,
  subscribeFcmToken: subscribeDeviceTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWalletsForNotificationScreen);

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  screenTemplate: { flex: 1 },
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
  walletName: { ...typography.subtitle6, paddingRight: 50 },
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
