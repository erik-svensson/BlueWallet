import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React, { FC } from 'react';

import { Route, RootStackParams } from 'app/consts';
import {
  ActionSheet,
  ExportWalletScreen,
  ExportWalletXpubScreen,
  DeleteContactScreen,
  SendTransactionDetailsScreen,
  MessageScreen,
  EditTextScreen,
  UnlockTransaction,
  CreateWalletScreen,
  WalletDetailsScreen,
  ImportWalletScreen,
  CreateContactScreen,
  ContactDetailsScreen,
  TransactionDetailsScreen,
  ContactQRCodeScreen,
  ReceiveCoinsScreen,
  SendCoinsScreen,
  SendCoinsConfirmScreen,
  ScanQrCodeScreen,
  ContactListScreen,
  SelectLanguageScreen,
  AboutUsScreen,
  TermsConditionsSettingsScreen,
  AdvancedOptionsScreen,
  CreatePinScreen,
  CurrentPinScreen,
  ConfirmPinScreen,
  FilterTransactionsScreen,
  CreateAuthenticatorScreen,
  CreateAuthenticatorPublicKeyScreen,
  CreateAuthenticatorSuccessScreen,
  DeleteEntityScreen,
  ImportAuthenticatorScreen,
  CreateWalletSuccessScreen,
  IntegrateKeyScreen,
  RecoveryTransactionListScreen,
  RecoverySendScreen,
  RecoverySeedScreen,
  ImportWalletChooseTypeScreen,
  OptionsAuthenticatorScreen,
  ChunkedQrCode,
  NotificationScreen,
  AddEmailScreen,
  ConfirmEmailScreen,
  ChooseWalletsForNotificationScreen,
  ChangeEmailScreen,
  ReceiveNotificationsConfirmationScreen,
  CreateTransactionPassword,
  ConfirmTransactionPassword,
  ConfirmNotificationCodeScreen,
  AddNotificationEmailScreen,
} from 'app/screens';

import { MainTabNavigator } from './MainTabNavigator';

const Stack = createStackNavigator<RootStackParams>();

interface Props {
  shouldRenderOnBoarding: boolean;
  shouldRenderNotification: boolean;
}

export const RootNavigator: FC<Props> = ({ shouldRenderOnBoarding, shouldRenderNotification }) => {
  const getInitialRouteName = () => {
    if (shouldRenderOnBoarding) {
      return Route.CreatePin;
    }
    if (shouldRenderNotification) {
      return Route.AddNotificationEmail;
    }

    return Route.MainTabStackNavigator;
  };

  const initialRouteName = getInitialRouteName();

  return (
    <Stack.Navigator initialRouteName={initialRouteName} headerMode="none">
      <Stack.Screen name={Route.CreatePin} component={CreatePinScreen} />
      <Stack.Screen name={Route.ConfirmPin} component={ConfirmPinScreen} />
      <Stack.Screen name={Route.CreateTransactionPassword} component={CreateTransactionPassword} />
      <Stack.Screen name={Route.ConfirmTransactionPassword} component={ConfirmTransactionPassword} />

      <Stack.Screen
        name={Route.AddNotificationEmail}
        component={AddNotificationEmailScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={Route.ConfirmNotificationCode} component={ConfirmNotificationCodeScreen} />
      <Stack.Screen name={Route.ChooseWalletsForNotification} component={ChooseWalletsForNotificationScreen} />

      <Stack.Screen name={Route.ActionSheet} component={ActionSheet} options={modalOptions} />
      <Stack.Screen name={Route.UnlockTransaction} component={UnlockTransaction} />
      <Stack.Screen name={Route.EditText} component={EditTextScreen} />
      <Stack.Screen name={Route.Message} component={MessageScreen} options={{}} />
      <Stack.Screen name={Route.ExportWallet} component={ExportWalletScreen} />
      <Stack.Screen name={Route.ExportWalletXpub} component={ExportWalletXpubScreen} />
      <Stack.Screen name={Route.DeleteContact} component={DeleteContactScreen} />
      <Stack.Screen name={Route.SendTransactionDetails} component={SendTransactionDetailsScreen} />

      <Stack.Screen name={Route.MainTabStackNavigator} component={MainTabNavigator} />

      <Stack.Screen name={Route.CreateWallet} component={CreateWalletScreen} />
      <Stack.Screen name={Route.ImportWallet} component={ImportWalletScreen} />
      <Stack.Screen name={Route.WalletDetails} component={WalletDetailsScreen} />
      <Stack.Screen name={Route.CreateContact} component={CreateContactScreen} />
      <Stack.Screen name={Route.ContactDetails} component={ContactDetailsScreen} />
      <Stack.Screen name={Route.ContactQRCode} component={ContactQRCodeScreen} />
      <Stack.Screen name={Route.TransactionDetails} component={TransactionDetailsScreen} />
      <Stack.Screen name={Route.ReceiveCoins} component={ReceiveCoinsScreen} />
      <Stack.Screen name={Route.SendCoins} component={SendCoinsScreen} />
      <Stack.Screen name={Route.SendCoinsConfirm} component={SendCoinsConfirmScreen} />
      <Stack.Screen name={Route.ScanQrCode} component={ScanQrCodeScreen} />
      <Stack.Screen name={Route.ChooseContactList} component={ContactListScreen} />
      <Stack.Screen name={Route.SelectLanguage} component={SelectLanguageScreen} />
      <Stack.Screen name={Route.AboutUs} component={AboutUsScreen} />
      <Stack.Screen name={Route.TermsConditions} component={TermsConditionsSettingsScreen} />
      <Stack.Screen name={Route.AdvancedOptions} component={AdvancedOptionsScreen} />
      <Stack.Screen name={Route.CurrentPin} component={CurrentPinScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name={Route.FilterTransactions} component={FilterTransactionsScreen} />
      <Stack.Screen name={Route.CreateAuthenticator} component={CreateAuthenticatorScreen} />
      <Stack.Screen
        name={Route.CreateAuthenticatorPublicKey}
        component={CreateAuthenticatorPublicKeyScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={Route.CreateAuthenticatorSuccess}
        component={CreateAuthenticatorSuccessScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={Route.DeleteEntity} component={DeleteEntityScreen} />
      <Stack.Screen name={Route.ImportAuthenticator} component={ImportAuthenticatorScreen} />
      <Stack.Screen name={Route.CreateWalletSuccess} component={CreateWalletSuccessScreen} />
      <Stack.Screen name={Route.IntegrateKey} component={IntegrateKeyScreen} />
      <Stack.Screen name={Route.RecoveryTransactionList} component={RecoveryTransactionListScreen} />
      <Stack.Screen name={Route.RecoverySend} component={RecoverySendScreen} />
      <Stack.Screen name={Route.RecoverySeed} component={RecoverySeedScreen} />
      <Stack.Screen name={Route.ImportWalletChooseType} component={ImportWalletChooseTypeScreen} />
      <Stack.Screen name={Route.OptionsAuthenticator} component={OptionsAuthenticatorScreen} />
      <Stack.Screen name={Route.ChunkedQrCode} component={ChunkedQrCode} />
      <Stack.Screen name={Route.Notifications} component={NotificationScreen} />
      <Stack.Screen name={Route.AddEmail} component={AddEmailScreen} />
      <Stack.Screen name={Route.ConfirmEmail} component={ConfirmEmailScreen} />
      <Stack.Screen name={Route.ChangeEmail} component={ChangeEmailScreen} />
      <Stack.Screen name={Route.ReceiveNotificationsConfirmation} component={ReceiveNotificationsConfirmationScreen} />
    </Stack.Navigator>
  );
};

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: () => ({}),
} as StackNavigationOptions;
