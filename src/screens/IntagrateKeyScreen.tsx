import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';

import { ScreenTemplate, Text, Header, Button } from 'app/components';
import { Route } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { BlueApp } from 'app/legacy';
import { NavigationService } from 'app/services';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type Props = NavigationInjectedProps;

interface State {
  isLoading: boolean;
}

export class IntagrateKeyScreen extends React.PureComponent<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.wallets.add.title} />,
  });

  state: State = {
    isLoading: false,
  };

  scanKey = () => {
    const { navigation } = this.props;

    const onBarCodeScan = navigation.getParam('onBarCodeScan');

    return navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan,
    });
  };

  render() {
    return (
      <ScreenTemplate
        footer={<Button loading={this.state.isLoading} onPress={this.scanKey} title={i18n.wallets.publicKey.scan} />}
      >
        <Text style={styles.subtitle}>{i18n.wallets.publicKey.subtitle}</Text>
        <Text style={styles.description}>{i18n.wallets.publicKey.description}</Text>
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
});
