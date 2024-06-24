import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Header, Mnemonic, ScreenTemplate, TextAreaItem } from 'app/components';
import { RootStackParams, Route } from 'app/consts';
import { preventScreenshots, allowScreenshots } from 'app/services/ScreenshotsService';
import { typography } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  route: RouteProp<RootStackParams, Route.ExportWallet>;
}

export const ExportWalletScreen = ({ route }: Props) => {
  const { wallet } = route.params;
  const secret = wallet.getSecret();

  useEffect(() => {
    preventScreenshots();

    return () => {
      allowScreenshots();
    };
  }, []);

  return (
    <ScreenTemplate header={<Header title={i18n.wallets.exportWallet.header} isBackArrow />}>
      <Text style={styles.title}>{i18n.wallets.exportWallet.title}</Text>
      <View testID="export-wallet-qr-code" style={styles.qrCodeContainer}>
        {secret ? <QRCode quietZone={10} value={secret} size={140} ecl={'H'} /> : null}
      </View>
      <Mnemonic testID="export-wallet-seed-phrase" mnemonic={secret} />

      {wallet.password && (
        <View>
          <Text style={[styles.title, styles.customWords]}>{i18n.wallets.importWallet.customWords}</Text>
          <TextAreaItem value={wallet.password} editable={false} />
        </View>
      )}
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  customWords: {
    paddingVertical: 16,
  },
  title: { ...typography.headline4, textAlign: 'center' },
});
