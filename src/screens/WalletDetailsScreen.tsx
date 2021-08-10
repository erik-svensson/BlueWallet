import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { cloneDeep } from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Button, FlatButton, Header, ScreenTemplate, WalletCard, ButtonType, Text } from 'app/components';
import { Wallet, Route, RootStackParams, ActionMeta, CONST, ConfirmAddressFlowType } from 'app/consts';
import { maxWalletNameLength } from 'app/consts/text';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import { selectors as electrumXSelectors } from 'app/state/electrumX';
import { reducer as notificationReducer } from 'app/state/notifications';
import {
  checkSubscription,
  CheckSubscriptionAction,
  subscribeWallet as subscribeWalletAction,
  unsubscribeWallet as unsubscribeWalletAction,
  subscribeDeviceToken as subscribeDeviceTokenAction,
  SubscribeWalletActionCreator,
  UnsubscribeWalletActionCreator,
} from 'app/state/notifications/actions';
import { isWalletSubscribed, storedEmail, isLoading, readableError } from 'app/state/notifications/selectors';
import { reducer as walletReducer } from 'app/state/wallets';
import {
  updateWallet as updateWalletAction,
  UpdateWalletAction,
  deleteWallet as deleteWalletAction,
  DeleteWalletAction,
} from 'app/state/wallets/actions';
import { getById, getWalletsLabels } from 'app/state/wallets/selectors';
import { palette, typography } from 'app/styles';

import { WatchOnlyWallet } from '../../class';

const i18n = require('../../loc');

interface Props {
  updateWallet: (wallet: Wallet) => UpdateWalletAction;
  navigation: StackNavigationProp<RootStackParams, Route.WalletDetails>;
  wallet?: Wallet;
  error: string;
  deleteWallet: (id: string, meta?: ActionMeta) => DeleteWalletAction;
  checkSubscription: (wallets: Wallet[], email: string) => CheckSubscriptionAction;
  subscribe: SubscribeWalletActionCreator;
  subscribeFcmToken: (wallet: Wallet[]) => void;
  unsubscribe: UnsubscribeWalletActionCreator;
  route: RouteProp<RootStackParams, Route.WalletDetails>;
  walletsLabels: string[];
  email: string;
  isSubscribed: boolean;
  isLoading: boolean;
  isInternetReachable: boolean;
}

export class WalletDetailsScreen extends React.PureComponent<Props> {
  componentDidMount() {
    this.checkSubscription();
  }

  checkSubscription = () => {
    const { wallet, email, checkSubscription } = this.props;

    if (wallet) {
      checkSubscription([wallet], email);
    }
  };

  validationError = (value: string): string | undefined => {
    const trimmedValue = value.trim();
    const checkAllWallets =
      value.toLowerCase() === i18n.wallets.dashboard.allWallets.toLowerCase() || value === CONST.allWallets;
    const { walletsLabels, wallet } = this.props;

    if (!wallet) {
      return;
    }
    const allOtherWalletLabels = walletsLabels.filter((label: string) => label !== wallet.label);

    if (allOtherWalletLabels.includes(trimmedValue)) {
      return i18n.wallets.importWallet.walletInUseValidationError;
    }
    if (checkAllWallets) {
      return i18n.wallets.importWallet.allWalletsValidationError;
    }
  };

  navigateToWalletExport = () => this.navigateWithWallet(Route.ExportWallet);

  navigateToWalletXpub = () => this.navigateWithWallet(Route.ExportWalletXpub);

  renderConfirmScreenContent = () => (
    <>
      <Text style={styles.confirmTitle}>{i18n.wallets.deleteWallet.title}</Text>
      <Text
        style={styles.confirmDescription}
      >{`${i18n.wallets.deleteWallet.description1} ${this.props.wallet?.label}${i18n.wallets.deleteWallet.description2}`}</Text>
    </>
  );

  navigateToDeleteWallet = () => {
    const { deleteWallet, navigation, wallet } = this.props;

    if (!wallet) {
      return;
    }
    navigation.navigate(Route.Confirm, {
      title: i18n.wallets.deleteWallet.header,
      children: this.renderConfirmScreenContent(),
      onConfirm: () => {
        deleteWallet(wallet.id, {
          onSuccess: () => {
            CreateMessage({
              title: i18n.message.success,
              description: i18n.message.successfullWalletDelete,
              type: MessageType.success,
              buttonProps: {
                title: i18n.message.returnToDashboard,
                onPress: this.goToDashboard,
              },
            });
          },
        });
      },
    });
  };

  goToDashboard = () => this.props.navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });

  navigateWithWallet = (route: Route.ExportWalletXpub | Route.ExportWallet) => {
    const { navigation, wallet } = this.props;

    if (!wallet) {
      return;
    }
    navigation.navigate(route, {
      wallet,
    });
  };

  setLabel = (label: string) => {
    const trimmedlabel = label.trim();
    const { wallet, updateWallet } = this.props;

    if (!wallet) {
      return;
    }
    const updatedWallet = cloneDeep(wallet);

    updatedWallet.setLabel(trimmedlabel);
    updateWallet(updatedWallet);
  };

  editAmount = () => {
    const { wallet, navigation } = this.props;

    if (!wallet) {
      return;
    }
    navigation.navigate(Route.EditText, {
      inputTestID: 'wallet-name-input',
      submitButtonTestID: 'submit-wallet-name-button',
      title: i18n.wallets.details.nameEdit,
      label: i18n.wallets.details.nameLabel,
      onSave: this.setLabel,
      value: wallet.label,
      validate: this.validationError,
      maxLength: maxWalletNameLength,
    });
  };

  confirmEmail = (flowType: ConfirmAddressFlowType, onResend: () => void) => {
    const { email, navigation, wallet } = this.props;

    wallet &&
      navigation.navigate(Route.ConfirmEmail, {
        email,
        flowType,
        wallets: [wallet],
        onSuccess: () => {
          CreateMessage({
            title: i18n.message.success,
            description: i18n.notifications.updateNotificationPreferences,
            type: MessageType.success,
            buttonProps: {
              title: i18n.message.goToWalletDetails,
              onPress: () => {
                this.navigateBackToScreen();
                this.checkSubscription();
                flowType === ConfirmAddressFlowType.SUBSCRIBE && this.props.subscribeFcmToken([wallet]);
              },
            },
          });
        },
        onResend,
      });
  };

  navigateBackToScreen = () => {
    const { navigation, wallet } = this.props;

    wallet && navigation.navigate(Route.WalletDetails, { id: wallet.id });
  };

  subscribe = (wallet: Wallet, email: string) => {
    this.props.subscribe([wallet], email);

    this.confirmEmail(ConfirmAddressFlowType.SUBSCRIBE, () => this.props.subscribe([wallet], email));
  };

  unSubscribe = (wallet: Wallet, email: string) => {
    this.props.unsubscribe([wallet], email);
    this.confirmEmail(ConfirmAddressFlowType.UNSUBSCRIBE, () => this.props.unsubscribe([wallet], email));
  };

  onSubscribeButtonPress = () => {
    const { email, navigation, wallet, isSubscribed } = this.props;

    if (!wallet) return;
    if (!email) {
      return navigation.navigate(Route.Notifications, {
        onBackArrow: () => this.navigateBackToScreen(),
        wallet,
      });
    }

    if (!isSubscribed) {
      return this.subscribe(wallet, email);
    }

    return this.unSubscribe(wallet, email);
  };

  render() {
    const { wallet, isSubscribed, isLoading } = this.props;

    if (!wallet) {
      return null;
    }
    const isWatchOnly = wallet.type === WatchOnlyWallet.type;

    return (
      <ScreenTemplate
        footer={
          <>
            {!isWatchOnly && (
              <Button
                testID="export-wallet-button"
                onPress={this.navigateToWalletExport}
                title={i18n.wallets.details.exportWallet}
              />
            )}
            <Button
              testID="show-xpub-button"
              onPress={this.navigateToWalletXpub}
              title={i18n.wallets.details.showWalletXPUB}
              containerStyle={styles.button}
            />
            <Button
              testID="manage-email-notifications-subscription-button"
              onPress={this.onSubscribeButtonPress}
              title={isSubscribed ? i18n.wallets.details.unsubscribeWallet : i18n.wallets.details.subscribeWallet}
              containerStyle={styles.button}
              loading={isLoading}
              disabled={!this.props.isInternetReachable}
            />
            <FlatButton
              testID="delete-wallet-button"
              onPress={this.navigateToDeleteWallet}
              title={i18n.wallets.details.deleteWallet}
              containerStyle={styles.deleteWalletButtonContainer}
              buttonType={ButtonType.Warning}
            />
          </>
        }
        header={<Header isBackArrow title={wallet.label} onBackArrow={this.goToDashboard} />}
      >
        <View style={styles.walletContainer}>
          <WalletCard wallet={wallet} containerStyle={styles.walletContainerInner} />
        </View>
        <View style={styles.nameInputContainer}>
          <View style={styles.labelInput}>
            <Text style={styles.typeLabel}>{i18n.wallets.details.nameLabel}</Text>
            <Text testID="wallet-name-text" style={styles.label} onPress={this.editAmount}>
              {wallet.label}
            </Text>
          </View>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>{i18n.wallets.details.typeLabel}</Text>
          <Text testID="wallet-type-text" style={styles.typeValue}>
            {wallet.typeReadable}
          </Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (
  state: ApplicationState & walletReducer.WalletsState & notificationReducer.NotificationState,
  props: Props,
) => {
  const { id } = props.route.params;

  return {
    wallet: getById(state, id),
    walletsLabels: getWalletsLabels(state),
    email: storedEmail(state),
    isLoading: isLoading(state),
    isSubscribed: isWalletSubscribed(state, id),
    error: readableError(state),
    isInternetReachable: electrumXSelectors.isInternetReachable(state),
  };
};

const mapDispatchToProps = {
  updateWallet: updateWalletAction,
  deleteWallet: deleteWalletAction,
  subscribe: subscribeWalletAction,
  unsubscribe: unsubscribeWalletAction,
  subscribeFcmToken: subscribeDeviceTokenAction,
  checkSubscription,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailsScreen);

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  deleteWalletButtonContainer: {
    marginTop: 12,
  },
  walletContainer: {
    alignItems: 'center',
  },
  walletContainerInner: {
    height: undefined,
    width: '80%',
  },
  nameInputContainer: {
    marginTop: 32,
  },
  typeContainer: {
    marginTop: 4,
  },
  typeLabel: {
    color: palette.textGrey,
    ...typography.overline,
  },
  labelInput: {
    width: '100%',
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  label: { ...typography.caption, color: palette.textBlack, marginTop: 6, marginBottom: 4 },
  typeValue: {
    marginTop: 4,
    ...typography.caption,
  },
  confirmDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 18,
  },
  confirmTitle: { ...typography.headline4, marginTop: 16, textAlign: 'center' },
});
