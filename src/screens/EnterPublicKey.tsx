import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';

import { ScreenTemplate, Text, InputItem, Button, Header, FlatButton } from 'app/components';
import { Route } from 'app/consts';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

export class EnterPublicKey extends Component<NavigationInjectedProps> {
  state = {
    label: '',
  };

  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.wallets.publicKey.title} />,
  });

  setLabel = (label: string) => this.setState({ label });

  render() {
    return (
      <ScreenTemplate
        footer={
          <>
            <Button disabled={!this.state.label} loading={false} onPress={() => {}} title={i18n._.confirm} />
            <FlatButton
              onPress={() => this.props.navigation.navigate(Route.WebView)}
              containerStyle={styles.importButtonContainer}
              title={i18n.wallets.publicKey.generatePDF}
            />
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.wallets.publicKey.title}</Text>
        <Text style={styles.description}>{i18n.wallets.publicKey.description}</Text>
        <InputItem setValue={this.setLabel} label={i18n.wallets.publicKey.publicKey} />
      </ScreenTemplate>
    );
  }
}

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
  importButtonContainer: {
    marginTop: 12,
  },
});
