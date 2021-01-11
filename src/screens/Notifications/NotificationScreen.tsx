import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Button, FlatButton, ButtonType, Image } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams, ConfirmAddressFlowType, Wallet } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import {
  deleteNotificationEmail,
  DeleteNotificationEmailAction,
  CheckSubscriptionAction,
  checkSubscription,
} from 'app/state/notifications/actions';
import { subscribedWallets } from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.Notifications>
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.Notifications>;
  email: string;
  deleteEmail: () => DeleteNotificationEmailAction;
  checkSubscription: (wallets: Wallet[], email: string) => CheckSubscriptionAction;
  wallets: Wallet[];
}
export class NotificationScreen extends Component<Props> {
  async componentDidMount() {
    const { wallets, checkSubscription, email } = this.props;
    !!email && checkSubscription(wallets, email);
  }

  onChangeEmailPress = () =>
    this.props.navigation.navigate(Route.ChangeEmail, {
      address: this.props.email,
    });

  onDeletePress = () =>
    this.props.navigation.navigate(Route.DeleteEntity, {
      title: i18n.notifications.deleteEmail,
      subtitle: i18n.notifications.deleteYourEmail,
      name: i18n.notifications.deleteYourEmail,
      onConfirm: this.deleteEmail,
    });

  goToSuccessScreen = () =>
    CreateMessage({
      title: i18n.message.success,
      description: i18n.notifications.deleteEmailSuccessMessage,
      type: MessageType.success,
      buttonProps: {
        title: i18n.notifications.goToNotifications,
        onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
      },
    });

  goToConfirmScreen = () =>
    this.props.navigation.navigate(Route.ConfirmEmail, {
      address: this.props.email!,
      flowType: ConfirmAddressFlowType.ANOTHER_ACTION,
    });

  removeEmail = () => {
    this.props.deleteEmail();
    this.goToSuccessScreen();
  };

  deleteEmail = () => {
    this.props.wallets.length ? this.goToConfirmScreen() : this.removeEmail();
  };

  onAddEmailPress = () => {
    this.props.navigation.navigate(Route.AddEmail, { walletsToSubscribe: this.props.route.params.walletsToSubscribe });
  };

  renderItem = (item: Wallet) => (
    <TouchableOpacity style={styles.itemRow} onPress={() => this.goToWalletDetails(item.id)}>
      <View style={styles.row}>
        <Text style={styles.walletName}>{item.label}</Text>
        <Image source={images.backArrow} style={styles.arrow} resizeMode="contain" />
      </View>
      <Text style={styles.caption}>{item.getAddressForTransaction()}</Text>
    </TouchableOpacity>
  );

  goToWalletDetails = (id: string) => {
    this.props.navigation.navigate(Route.WalletDetails, { id });
  };

  renderFooter = () =>
    this.props.email ? (
      <>
        <Button title={i18n.notifications.change} onPress={this.onChangeEmailPress} />
        <FlatButton
          containerStyle={styles.deleteButton}
          buttonType={ButtonType.Warning}
          title={i18n.notifications.delete}
          onPress={this.onDeletePress}
        />
      </>
    ) : (
      <Button title={i18n.notifications.addEmail} onPress={this.onAddEmailPress} />
    );

  render() {
    const { wallets, email } = this.props;
    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        noScroll
        footer={this.renderFooter()}
      >
        {email ? (
          <>
            <Text style={styles.title}>{i18n.notifications.title}</Text>
            <Text style={styles.description}>{i18n.notifications.description}</Text>
            <View style={styles.amountAddress}>
              <Text style={styles.address}>{this.props.email}</Text>
            </View>
            {!!wallets.length && (
              <>
                <Text style={styles.listTitle}>{i18n.notifications.yourSubscriptions}</Text>
                <FlatList
                  data={wallets}
                  renderItem={item => this.renderItem(item.item)}
                  keyExtractor={item => item.id}
                />
              </>
            )}
          </>
        ) : (
          <View style={styles.noWalletsContainer}>
            <Text style={typography.headline4}>{i18n.notifications.addYourAddress}</Text>
            <Image source={images.bigBell} style={styles.bigBell} resizeMode="contain" />
            <Text style={styles.noWalletsDescription}>{i18n.notifications.addYourAddressDescription}</Text>
          </View>
        )}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  email: state.notifications.email,
  wallets: subscribedWallets(state),
});

const mapDispatchToProps = {
  deleteEmail: deleteNotificationEmail,
  checkSubscription,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    alignSelf: 'center',
    marginVertical: 18,
    marginTop: 40,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 12,
  },
  listTitle: {
    ...typography.overline,
    color: palette.textGrey,
    marginTop: 24,
    marginBottom: 7,
  },
  walletName: { ...typography.subtitle6 },
  caption: { ...typography.warning, color: palette.textGrey },
  arrow: {
    width: 8,
    height: 13,
    transform: [{ rotate: '180deg' }],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRow: {
    marginVertical: 8,
  },
  amountAddress: { width: '100%', borderBottomColor: palette.grey, borderBottomWidth: 1, paddingBottom: 10 },
  address: { ...typography.caption, color: palette.textGrey },
  noWalletsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bigBell: {
    width: 152,
    height: 182,
    justifyContent: 'center',
  },
  noWalletsDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
  },
});
