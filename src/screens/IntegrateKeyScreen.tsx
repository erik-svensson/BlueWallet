import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';

import { ScreenTemplate, Text, Header, Button } from 'app/components';
import { Route, CONST } from 'app/consts';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type Props = NavigationInjectedProps;

export class IntegrateKeyScreen extends React.PureComponent<Props> {
  static navigationOptions = (props: NavigationScreenProps) => {
    const { navigation } = props;
    const onBackArrow = navigation.getParam('onBackArrow');

    return {
      header: <Header navigation={navigation} onBackArrow={onBackArrow} isBackArrow title={i18n.wallets.add.title} />,
    };
  };

  scanKey = () => {
    const { navigation } = this.props;

    const onBarCodeScan = navigation.getParam('onBarCodeScan');

    return navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan,
    });
  };

  render() {
    const { navigation } = this.props;

    const title = navigation.getParam('title');
    const description = navigation.getParam('description');
    return (
      <ScreenTemplate footer={<Button onPress={this.scanKey} title={i18n.wallets.publicKey.scan} />}>
        <Text style={styles.subtitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.webGeneratorUrlWrapper}>
          <Text style={styles.webGeneratorUrl}>{CONST.webGeneratorUrl}</Text>
        </View>
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
  webGeneratorUrl: {
    ...typography.headline5,
    textAlign: 'center',
  },
  webGeneratorUrlWrapper: {
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
});
