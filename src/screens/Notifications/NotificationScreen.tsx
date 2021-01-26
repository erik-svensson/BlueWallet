import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Button, FlatButton, ButtonType, Image } from 'app/components';
import { Route, RootStackParams, ConfirmAddressFlowType, Wallet, ActionMeta } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import {
  setNotificationEmail as setNotificationEmailAction,
  SetNotificationEmailAction,
  DeleteNotificationEmailAction,
  deleteNotificationEmail as deleteNotificationEmailAction,
  CheckSubscriptionAction,
  checkSubscription as checkSubscriptionAction,
} from 'app/state/notifications/actions';
import { storedEmail } from 'app/state/notifications/selectors';
import { subscribedWallets, wallets } from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.Notifications>;
  route: RouteProp<RootStackParams, Route.Notifications>;
  email: string;
  deleteNotificationEmail: () => DeleteNotificationEmailAction;
  checkSubscription: (wallets: Wallet[], email: string) => CheckSubscriptionAction;
  setNotificationEmail: (email: string, meta?: ActionMeta) => SetNotificationEmailAction;
  subscribedWallets: Wallet[];
  wallets: Wallet[];
}
export class NotificationScreen extends Component<Props> {
  componentDidMount() {
    const { wallets, checkSubscription, email } = this.props;
    !!email && wallets.length && checkSubscription(wallets, email);
  }

  onChangeEmailPress = () =>
    this.props.navigation.navigate(Route.ChangeEmail, {
      email: this.props.email,
    });

  renderConfirmScreenContent = () => (
    <>
      <Text style={styles.confirmTitle}>{i18n.notifications.deleteYourEmail}</Text>
      <Text
        style={styles.confirmDescription}
      >{`${i18n.wallets.deleteWallet.description1} ${i18n.notifications.deleteYourEmail}${i18n.wallets.deleteWallet.description2}`}</Text>
    </>
  );

  onDeletePress = () =>
    this.props.navigation.navigate(Route.Confirm, {
      title: i18n.notifications.deleteEmail,
      children: this.renderConfirmScreenContent(),
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
      email: this.props.email!,
      flowType: ConfirmAddressFlowType.DELETE_ADDRESS,
    });

  removeEmail = () => {
    const { email, setNotificationEmail, deleteNotificationEmail, navigation } = this.props;
    setNotificationEmail(email, {
      onSuccess: () => {
        navigation.navigate(Route.LocalConfirmNotificationCode, {
          title: i18n.notifications.deleteEmail,
          children: (
            <View style={styles.infoContainer}>
              <Text style={typography.headline4}>{i18n.notifications.confirmEmail}</Text>
              <Text style={styles.codeDescription}>{i18n.notifications.pleaseEnter}</Text>
              <Text style={typography.headline5}>{email}</Text>
            </View>
          ),
          onSuccess: () => {
            deleteNotificationEmail();
            this.goToSuccessScreen();
          },
          onResend: () => setNotificationEmail(email),
        });
      },
    });
  };

  deleteEmail = () => (!!this.props.subscribedWallets.length ? this.goToConfirmScreen() : this.removeEmail());

  onAddEmailPress = () => {
    this.props.navigation.navigate(Route.AddNotificationEmail, {
      title: i18n.notifications.notifications,
      isBackArrow: true,
      description: i18n.notifications.addYourEmailForDescription,
      onSuccess: () => {
        CreateMessage({
          title: i18n.contactCreate.successTitle,
          description: i18n.notifications.emailAddedSuccessMessage,
          type: MessageType.success,
          buttonProps: {
            title: i18n.notifications.goToNotifications,
            onPress: () => {
              this.props.navigation.navigate(Route.Notifications, {});
            },
          },
        });
      },
      onSkipSuccess: undefined,
    });
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
    const { subscribedWallets, email } = this.props;
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
              <Text style={styles.email}>{this.props.email}</Text>
            </View>
            {!!subscribedWallets.length && (
              <>
                <Text style={styles.listTitle}>{i18n.notifications.yourSubscriptions}</Text>
                <FlatList
                  data={subscribedWallets}
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
  email: storedEmail(state),
  subscribedWallets: subscribedWallets(state),
  wallets: wallets(state),
});

const mapDispatchToProps = {
  deleteNotificationEmail: deleteNotificationEmailAction,
  setNotificationEmail: setNotificationEmailAction,
  checkSubscription: checkSubscriptionAction,
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
  email: { ...typography.caption, color: palette.textGrey },
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
  confirmDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 18,
  },
  confirmTitle: { ...typography.headline4, marginTop: 16, textAlign: 'center' },
  infoContainer: {
    alignItems: 'center',
  },
  codeDescription: {
    ...typography.caption,
    color: palette.textGrey,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
});
