import { by, element } from 'detox';

import actions from '../../actions';

const Header = () => ({
  backButton: element(by.id('back-button')),

  async tapOnBackButton() {
    await actions.tap(this.backButton);
  },
});

export default Header;
