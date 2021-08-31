import { PureComponent } from 'react';
import { AppState } from 'react-native';

interface Props {
  handleAppComesToForeground?: () => void;
  handleAppComesToBackground?: () => void;
}

interface State {
  appState: string;
}

export default class AppStateManager extends PureComponent<Props, State> {
  state = {
    appState: AppState.currentState,
  };

  backgroundTimer: any;

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState: string) => {
    const { handleAppComesToForeground, handleAppComesToBackground } = this.props;
    const { appState } = this.state;

    if (this.backgroundTimer) {
      clearTimeout(this.backgroundTimer);
    }

    // TODO: inactive state always invoked by biometric scan, so we can't use inactive state to show lock screen, so only background state valid option. It may be changed or fixed later
    if (appState === 'background' && nextAppState === 'active') {
      !!handleAppComesToForeground && handleAppComesToForeground();
    }

    if (nextAppState === 'background') {
      this.backgroundTimer = setTimeout(() => {
        !!handleAppComesToBackground && handleAppComesToBackground();
      }, 15000); // Show lock screen after 15 sec inactive app
    }

    this.setState({ appState: nextAppState });
  };

  render() {
    return null;
  }
}
