import React from 'react';
import { KeyboardType, StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from 'react-native-elements';

import { FastImageSource } from 'app/components';
import { AppSettingsState } from 'app/state/appSettings/reducer';
import { WalletsActionType } from 'app/state/wallets/actions';

export const CONST = {
  pinCodeLength: 4,
  transactionMinPasswordLength: 8,
  allWallets: 'All wallets',
  receive: 'receive',
  send: 'send',
};

export enum FlowType {
  password = 'password',
  newPin = 'newPin',
}

export enum Route {
  EditTextNavigator = 'EditTextNavigator',
  UnlockTransactionNavaigator = 'UnlockTransactionNavaigator',
  PasswordNavigator = 'PasswordNavigator',
  Dashboard = 'Dashboard',
  WalletDetails = 'WalletDetails',
  ContactList = 'ContactList',
  ContactDetails = 'ContactDetails',
  CreateContact = 'CreateContact',
  DeleteContact = 'DeleteContact',
  ContactQRCode = 'ContactQRCode',
  Settings = 'Settings',
  Message = 'Message',
  CreateWallet = 'CreateWallet',
  ImportWallet = 'ImportWallet',
  ExportWallet = 'ExportWallet',
  ImportWalletQRCode = 'ImportWalletQRCode',
  DeleteWallet = 'DeleteWallet',
  ExportWalletXpub = 'ExportWalletXub',
  TransactionDetails = 'TransactionDetails',
  ReceiveCoins = 'ReceiveCoins',
  SendCoins = 'SendCoins',
  SendCoinsConfirm = 'SendCoinsConfirm',
  EditText = 'EditText',
  ElectrumServer = 'ElectrumServer',
  AboutUs = 'AboutUs',
  SelectLanguage = 'SelectLanguage',
  ReleaseNotes = 'ReleaseNotes',
  ActionSheet = 'ActionSheet',
  SendTransactionDetails = 'SendTransactionDetailsScreen',
  ScanQrCode = 'ScanQrCode',
  ChooseContactList = 'ChooseContactList',
  MainCardStackNavigator = 'MainCardStackNavigator',
  CurrentPin = 'CurrentPin',
  CreatePin = 'CreatePin',
  ConfirmPin = 'ConfirmPin',
  UnlockScreen = 'UnlockScreen',
  CreateTransactionPassword = 'CreateTransactionPassword',
  ConfirmTransactionPassword = 'ConfirmTransactionPassword',
  AdvancedOptions = 'AdvancedOptions',
  UnlockTransaction = 'UnlockTransaction',
  FilterTransactions = 'FilterTransactions',
}

export interface Wallet {
  balance: number;
  hideBalance: boolean;
  preferredBalanceUnit: string;
  label: string;
  chain: string;
  num_addresses: number;
  transactions: Transaction[];
  getBalance: () => void;
  getLatestTransactionTime: () => void;
  getLabel: () => string;
  setLabel: (label: string) => void;
  getAddress: () => string;
  getSecret: () => string;
  getXpub: () => string;
  address: string;
  secret: string;
  type: string;
  typeReadable: string;
  unconfirmed_balance: number;
  unconfirmed_transactions: Transaction[];
  utxo: any[];
  _xpub: string;
  getID: () => string;
  weOwnAddress: (clipboard: string) => void;
  isInvoiceGeneratedByWallet: (clipboard: string) => void;
  getPreferredBalanceUnit: () => string;
}

export interface Contact {
  id: string;
  name: string;
  address: string;
}

export interface Transaction {
  hash: string;
  txid: string;
  value: number;
  time?: number; // not present right after transaction is done
  received: string; // date string, same value as 'time' field but human readable
  walletLabel: string;
  confirmations: number;
  inputs: any[];
  outputs: any[];
  note?: string;
  walletPreferredBalanceUnit: string;
}

export interface AppSettings {
  isPinSetup: boolean;
}

export interface Filters {
  isFilteringOn: boolean;
  dateKey?: number;
  isCalendarVisible?: boolean;
  address?: string;
  fromDate?: string;
  toDate?: string;
  fromAmount?: number;
  toAmount?: number;
  transactionType?: string;
}

export type MainTabNavigatorParamList = {
  [Route.Dashboard]: undefined;
  [Route.ContactList]: undefined;
  [Route.Settings]: undefined;
};

export type RootStackParamList = {
  [Route.MainCardStackNavigator]: undefined;
  [Route.ImportWalletQRCode]: undefined;
  [Route.ActionSheet]: { wallets: Wallet[]; selectedIndex: number; onPress: (index: number) => void };
  [Route.UnlockTransactionNavaigator]: undefined;
  [Route.PasswordNavigator]: undefined;
  [Route.EditTextNavigator]: {
    title: string;
    onSave: (value: string) => void;
    label: string;
    header?: React.ReactNode;
    value?: string;
    validate?: (value: string) => string | undefined;
    keyboardType?: KeyboardType;
  };
  [Route.Message]: {
    title: string;
    source: FastImageSource;
    description: string;
    buttonProps?: ButtonProps;
    imageStyle?: StyleProp<ViewStyle>;
    asyncTask?: () => void;
  };
  [Route.ExportWallet]: { wallet: Wallet };
  [Route.ExportWalletXpub]: { wallet: Wallet };
  [Route.DeleteWallet]: { wallet: Wallet };
  [Route.DeleteContact]: { contact: Contact };
  [Route.MainCardStackNavigator]: undefined;
  [Route.SendTransactionDetails]: {
    fee: number;
    recipients: any;
    tx: any;
    satoshiPerByte: any;
    wallet: Wallet;
  };
};

export type UnlockTransactionNavigatorParamList = {
  [Route.UnlockTransaction]: { onSuccess: () => void };
};

export type PasswordNavigatorParamList = {
  [Route.CreateTransactionPassword]: undefined;
  [Route.ConfirmTransactionPassword]: { setPassword: string };
};

export type EditTextNavigatorParamList = {
  [Route.EditText]: {
    title: string;
    onSave: (value: string) => void;
    label: string;
    header?: React.ReactNode;
    value?: string;
    validate?: (value: string) => string | undefined;
    keyboardType?: KeyboardType;
  };
};

export type MainCardStackNavigatorParamList = {
  [Route.MainCardStackNavigator]: undefined;
  [Route.CreateWallet]: undefined;
  [Route.ImportWallet]: { appSettings: AppSettingsState; loadWallets: () => Promise<WalletsActionType> };
  [Route.WalletDetails]: { wallet: Wallet };
  [Route.CreateContact]: undefined;
  [Route.ContactDetails]: { contact: Contact };
  [Route.ContactQRCode]: { contact: Contact };
  [Route.TransactionDetails]: { transaction: Transaction };
  [Route.ReceiveCoins]: { secret?: string };
  [Route.SendCoins]: { fromSecret: string; fromAddress: string; fromWallet: any; toAddress?: string };
  [Route.SendCoinsConfirm]: {
    fee: number;
    feeSatoshi?: number;
    memo: string;
    recipients: any;
    size?: number;
    tx: any;
    satoshiPerByte: any;
    fromWallet: any;
  };
  [Route.ScanQrCode]: { onBarCodeScan: (code: string) => void };
  [Route.ChooseContactList]: {
    onContactPress?: (data: string) => void;
    title?: string;
  };
  [Route.Settings]: undefined;
  [Route.SelectLanguage]: undefined;
  [Route.AboutUs]: undefined;
  [Route.AdvancedOptions]: undefined;
  [Route.ElectrumServer]: undefined;
  [Route.CreatePin]: {
    flowType: string;
  };
  [Route.CurrentPin]: undefined;
  [Route.ConfirmPin]: {
    flowType: string;
    pin: string;
  };
  [Route.FilterTransactions]: { onFilterPress: ({}) => void };
};
