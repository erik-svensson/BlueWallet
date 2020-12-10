import NavigationBar from './common/NavigationBar';
import AddressBook from './pages/AddressBook';
import Authenticators from './pages/Authenticators';
import BetaVersionScreen from './pages/BetaVersionScreen';
import Onboarding from './pages/Onboarding';
import Wallets from './pages/Wallets';
import TermsConditionsScreen from './pages/termsConditionsScreen';

const app = {
  betaVersionScreen: BetaVersionScreen(),
  onboarding: Onboarding(),
  wallets: Wallets(),
  authenticators: Authenticators(),
  addressBook: AddressBook(),
  navigationBar: NavigationBar(),
  termsConditionsScreen: TermsConditionsScreen(),
};

export default app;
