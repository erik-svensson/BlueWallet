import React, { PureComponent } from 'react';
import { AppState } from 'react-native';
import { Toast, ToastProps } from 'app/components/Toast';

interface Props {
  toastList: ToastProps[];
}

interface State {
  appState: string;
}

export default class ToastManager extends PureComponent<Props, State> {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleAppStateChange = (nextAppState: string) => {

  };

  render() {
    const { toastList } = this.props;
    return (
      <>
        {toastList.map(toast => {
          return <Toast secondsAfterHide={toast.secondsAfterHide} title={toast.title} description={toast.description} />
        })}
      </>
    )
  }
}
