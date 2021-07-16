import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Header, ScreenTemplate, Text, Mnemonic } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { preventScreenshots, allowScreenshots } from 'app/services/ScreenshotsService';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.CreateWalletSuccess>;
  route: RouteProp<RootStackParams, Route.CreateWalletSuccess>;
  secret: string[];
  isP2SH: boolean;
}

export class CreateWalletSuccessScreen extends React.PureComponent<Props> {
  componentDidMount() {
    preventScreenshots();
  }

  componentWillUnmount() {
    allowScreenshots();
  }

  handleOnButtonPress = () => {
    const {
      navigation,
      route: {
        params: { secret, handleNavigationSubscription, isP2SH },
      },
    } = this.props;

    //TODO: till we don't know what we have to do with seed phrase for P2SH
    if (isP2SH) {
      navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
    } else {
      navigation.navigate(Route.SeedPhraseConfirm, { secret, handleNavigationSubscription });
    }
  };

  render() {
    const {
      route: {
        params: { secret },
      },
    } = this.props;

    return (
      <ScreenTemplate
        footer={
          <Button
            onPress={this.handleOnButtonPress}
            title={i18n.wallets.addSuccess.okButton}
            testID="create-wallet-close-button"
          />
        }
        header={<Header isBackArrow={false} title={i18n.wallets.add.title} />}
      >
        <Text style={styles.subtitle}>{i18n.wallets.addSuccess.subtitle}</Text>
        <Text style={styles.description}>{i18n.wallets.addSuccess.description}</Text>
        <View style={styles.mnemonicPhraseContainer}>
          <Mnemonic testID="create-wallet-mnemonic" mnemonic={secret} />
        </View>
      </ScreenTemplate>
    );
  }
}

export default CreateWalletSuccessScreen;

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
  mnemonicPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
