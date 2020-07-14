import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { Header, ScreenTemplate, Button } from 'app/components';
import { Route } from 'app/consts';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

type Props = NavigationInjectedProps;

class EnterPINScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.authenticators.add.title} />,
  });

  navigateToExport = () => {
    const { navigation } = this.props;
    console.log('NAVIGATING EXPORT');
  };

  render() {
    const { navigation } = this.props;
    const authenticator = navigation.getParam('authenticator');

    return (
      <ScreenTemplate
        footer={
          <>
            <Button onPress={this.navigateToExport} title={i18n.send.details.next} />
          </>
        }
      >
        <Text>{authenticator.pin}</Text>
        <Text style={styles.subtitle}>{i18n.authenticators.enterPIN.subtitle}</Text>
      </ScreenTemplate>
    );
  }
}

export default EnterPINScreen;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    marginBottom: 52,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
  isLoadingDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
    marginVertical: 10,
  },
  advancedOptionsLabel: {
    color: palette.textGrey,
    marginBottom: 12,
  },
  radioButton: {
    paddingStart: 0,
    paddingVertical: 8,
  },
  radioButtonContent: {
    paddingStart: 10,
    top: -3,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
  },
  importButtonContainer: {
    marginTop: 12,
  },
});
