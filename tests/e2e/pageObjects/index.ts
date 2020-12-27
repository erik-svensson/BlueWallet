<<<<<<< HEAD
import betaVersionScreen from './pages/beta-version-screen';
import confirmPassword from './pages/confirmPassword';
import confirmPin from './pages/confirmPin';
import createPassword from './pages/createPassword';
import createPin from './pages/createPin';
import successScreen from './pages/successScreen';
import termsConditionScreen from './pages/terms-conditions-screen';

const app = {
  betaVersionScreen,
  createPin,
  confirmPin,
  createPassword,
  confirmPassword,
  successScreen,
  termsConditionScreen,
=======
import Header from './common/Header';
import NavigationBar from './common/NavigationBar';
import AddressBook from './pages/AddressBook';
import Authenticators from './pages/Authenticators';
import BetaVersionScreen from './pages/BetaVersionScreen';
import DeveloperRoom from './pages/DeveloperRoom';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import TermsConditionsScreen from './pages/TermsConditionsScreen';
import Wallets from './pages/Wallets';

const app = {
  betaVersionScreen: BetaVersionScreen(),
  developerRoom: DeveloperRoom(),
  onboarding: Onboarding(),
  wallets: Wallets(),
  authenticators: Authenticators(),
  addressBook: AddressBook(),
  settings: Settings(),
  navigationBar: NavigationBar(),
  header: Header(),
  termsConditionsScreen: TermsConditionsScreen(),
>>>>>>> develop
};

export default app;
