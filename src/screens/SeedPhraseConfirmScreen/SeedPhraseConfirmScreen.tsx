import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenTemplate, Header, Button, Text } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { preventScreenshots, allowScreenshots } from 'app/services/ScreenshotsService';
import { palette, typography } from 'app/styles';

import { SeedPhraseConfirmView } from './SeedPhraseConfirmView';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.CreateWalletSuccess>;
  route: RouteProp<RootStackParams, Route.CreateWalletSuccess>;
  secret: string[];
}

class SeedPhraseConfirmScreen extends Component<Props> {
  state = {
    unorderedSeed: this.props.route.params.secret,
  };
  componentDidMount() {
    preventScreenshots();
  }

  componentWillUnmount() {
    allowScreenshots();
  }
  get canSubmit(): boolean {
    return false;
  }

  handleConfirm = () => {
    const { navigation } = this.props;

    navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
  };

  render() {
    const {
      route: {
        params: { secret },
      },
    } = this.props;

    return (
      <ScreenTemplate
        keyboardShouldPersistTaps={'always'}
        footer={
          <>
            <Button
              disabled={!this.canSubmit}
              onPress={this.handleConfirm}
              title={i18n.wallets.confirmSeed.button}
              testID="creates-wallet-button"
            />
          </>
        }
        header={<Header isBackArrow title={i18n.wallets.confirmSeed.header} />}
      >
        <Text style={styles.subtitle}>{i18n.wallets.confirmSeed.title}</Text>
        <Text style={styles.description}>{i18n.wallets.confirmSeed.description}</Text>
        <SeedPhraseConfirmView secret={secret} />
      </ScreenTemplate>
    );
  }
}

export default SeedPhraseConfirmScreen;

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
});
