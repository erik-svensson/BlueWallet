import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from 'app/components';

const i18n = require('../../loc');

export class WebViewScreen extends Component {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title="https://reactnative.dev/" />,
  });
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}
