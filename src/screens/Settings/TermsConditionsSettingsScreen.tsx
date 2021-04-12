import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import { en, zh, es, id, pt, jp, ko, tr, vi } from 'app/assets/tc/';
import { Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { typography } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  language: string;
  route: RouteProp<RootStackParams, Route.TermsConditions>;
}

export class TermsConditionsSettingsScreen extends React.PureComponent<Props> {
  state = {
    height: 500,
  };

  get langVersion() {
    const { language } = this.props.route.params;

    switch (language) {
      case 'zh':
        return zh;
      case 'es':
        return es;
      case 'pt':
        return pt;
      case 'ja':
        return jp;
      case 'id':
        return id;
      case 'tr':
        return tr;
      case 'vi':
        return vi;
      case 'ko':
        return ko;
      default:
        return en;
    }
  }

  render() {
    const termsAndConditionsMarginBottom = 32;

    return (
      <ScreenTemplate
        testID={'terms-conditions-settings-screen'}
        header={<Header isBackArrow={true} title={i18n.termsConditions.header} />}
      >
        <Text style={styles.title}>{i18n.termsConditions.title}</Text>
        <WebView
          source={{ html: `${this.langVersion}` }}
          style={[styles.text, { height: this.state.height | 0 }]}
          originWhitelist={['*']}
          bounces={false}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          contentInset={{ top: 0, left: 0 }}
          onNavigationStateChange={event => {
            if (event.title !== undefined) {
              this.setState({
                height: parseInt(event.title) + termsAndConditionsMarginBottom,
              });
            }
          }}
          onShouldStartLoadWithRequest={event => {
            if (!/^[data:text, about:blank]/.test(event.url)) {
              Linking.openURL(event.url);
              return false;
            }
            return true;
          }}
        />
      </ScreenTemplate>
    );
  }
}

export default TermsConditionsSettingsScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    marginTop: 16,
    textAlign: 'center',
  },
  text: {
    marginTop: 25,
    paddingBottom: 10,
  },
});
