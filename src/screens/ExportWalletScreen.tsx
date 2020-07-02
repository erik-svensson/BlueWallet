import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Header, Chip, ScreenTemplate } from 'app/components';
import { Wallet } from 'app/consts';
import { NavigationService } from 'app/services';
import { typography } from 'app/styles';

const i18n = require('../../loc');

export const ExportWalletScreen = ({ route }) => {
  const { wallet } = route.params;
  const secret = wallet.getSecret();

  return (
    <ScreenTemplate
      header={<Header title={i18n.wallets.exportWallet.header} isCancelButton={true} navigation={NavigationService} />}
    >
      <Text style={styles.title}>{i18n.wallets.exportWallet.title}</Text>
      <View style={styles.qrCodeContainer}>
        {secret && <QRCode quietZone={10} value={secret} size={140} ecl={'H'} />}
      </View>
      <View style={styles.mnemonicPhraseContainer}>
        {secret.split(' ').map((secret, index) => (
          <Chip key={index.toString()} label={`${index + 1}. ${secret}`} />
        ))}
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: { ...typography.headline4, textAlign: 'center' },
  mnemonicPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
