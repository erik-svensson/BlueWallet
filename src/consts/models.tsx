export enum Route {
  Dashboard = 'Dashboard',
  WalletDetails = 'WalletDetails',
  AddressBook = 'AddressBook',
  Settings = 'Settings',
}

export type Wallet = {
  balance: number;
  preferredBalanceUnit: string;
};
