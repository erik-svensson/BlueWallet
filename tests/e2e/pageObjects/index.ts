import Header from './common/Header';
import NavigationBar from './common/NavigationBar';
import AddressBook from './pages/AddressBook';
import Authenticators from './pages/Authenticators';
import BetaVersionScreen from './pages/BetaVersionScreen';
import Dashboard from './pages/Dashboard';
import DeveloperRoom from './pages/DeveloperRoom';
import Onboarding from './pages/Onboarding';
import TermsConditionsScreen from './pages/TermsConditionsScreen';
import TransactionsReceive from './pages/Transactions/Receive';
import TransactionsSend from './pages/Transactions/Send';
import UnlockScreen from './pages/UnlockScreen';
import WalletDetails from './pages/WalletDetails';
import Wallets from './pages/Wallets';
import AboutUsScreen from './pages/settings/AboutUsScreen';
import AdvancedOptionsScreen from './pages/settings/AdvancedOptionsScreen';
import ChangePin from './pages/settings/ChangePin';
import LanguageScreen from './pages/settings/LanguageScreen';
import SettingsScreen from './pages/settings/SettingsScreen';

const app = {
  betaVersionScreen: BetaVersionScreen(),
  developerRoom: DeveloperRoom(),
  onboarding: Onboarding(),
  dashboard: Dashboard(),
  wallets: Wallets(),
  authenticators: Authenticators(),
  addressBook: AddressBook(),
  settings: {
    settingsScreen: SettingsScreen(),
    advancedOptionsScreen: AdvancedOptionsScreen(),
    languageScreen: LanguageScreen(),
    changePin: ChangePin(),
    aboutUsScreen: AboutUsScreen(),
  },
  navigationBar: NavigationBar(),
  header: Header(),
  termsConditionsScreen: TermsConditionsScreen(),
  unlockScreen: UnlockScreen(),
  transactionsSend: TransactionsSend(),
  transactionsReceive: TransactionsReceive(),
  walletDetails: WalletDetails(),
};

export default app;
