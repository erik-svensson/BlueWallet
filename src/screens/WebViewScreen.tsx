import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from 'app/components';

const i18n = require('../../loc');

export class WebViewScreen extends Component {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title="https://keygenerator.cloudbestenv.com/" />,
  });
  render() {
    return <WebView source={{ uri: 'https://keygenerator.cloudbestenv.com/' }} />;
  }
}
