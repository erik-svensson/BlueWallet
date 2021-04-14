import { by, element } from 'detox';

const UnlockScreen = () => ({
  logo: element(by.id('unlock-screen-logo')),
});

export default UnlockScreen;
