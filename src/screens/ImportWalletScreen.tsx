import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, TextAreaItem, FlatButton } from 'components';
import { Button } from 'components/Button';
import { NavigationScreenProps } from 'react-navigation';
import { typography, palette } from 'styles';
import { en } from 'locale';
import {
  SegwitP2SHWallet,
  LegacyWallet,
  WatchOnlyWallet,
  HDSegwitP2SHWallet,
  HDLegacyP2PKHWallet,
  HDSegwitBech32Wallet,
} from '../../class';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { NavigationService } from 'services';
import { images } from 'assets';
import { Route } from 'consts';

const BlueApp = require('../../BlueApp');
const loc = require('../../loc');
const EV = require('../../events');

export const ImportWalletScreen = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [text, setText] = useState('');

  const showErrorMessageScreen = () =>
    NavigationService.navigate(Route.Message, {
      title: en.message.somethingWentWrong,
      description: en.message.somethingWentWrongWhileCreatingWallet,
      source: images.errorState,
      buttonProps: {
        title: en.message.returnToDashboard,
        onPress: () => NavigationService.navigateWithReset('MainTabNavigator'),
      },
    });

  const onImportButtonPress = async () => {
    NavigationService.navigate(Route.Message, {
      title: en.message.creatingWallet,
      description: en.message.creatingWalletDescription,
      source: images.processingState,
      imageStyle: {
        height: 180,
        width: 161,
        marginVertical: 36,
      },
      asyncTask: () => importMnemonic(text),
    });
  };

  const onChangeText = (text: string) => {
    setText(text);
    if (isButtonDisabled !== (text.length === 0)) {
      setIsButtonDisabled(!isButtonDisabled);
    }
  };

  const onScanQrCodeButtonPress = () => {
    // implement
  };

  const saveWallet = async (w: any) => {
    console.log('saveWallet');
    if (BlueApp.getWallets().some(wallet => wallet.getSecret() === w.secret)) {
      showErrorMessageScreen();
    } else {
      alert(loc.wallets.import.success);
      NavigationService.navigateWithReset('MainTabNavigator');
      ReactNativeHapticFeedback.trigger('notificationSuccess', {
        ignoreAndroidSystemSettings: false,
      });
      w.setLabel(loc.wallets.import.imported + ' ' + w.typeReadable);
      BlueApp.wallets.push(w);
      await BlueApp.saveToDisk();
      EV(EV.enum.WALLETS_COUNT_CHANGED);
      // this.props.navigation.dismiss();
    }
  };

  const importMnemonic = async (text: string) => {
    try {
      // trying other wallet types
      const segwitWallet = new SegwitP2SHWallet();
      segwitWallet.setSecret(text);
      if (segwitWallet.getAddress()) {
        // ok its a valid WIF

        const legacyWallet = new LegacyWallet();
        legacyWallet.setSecret(text);

        await legacyWallet.fetchBalance();
        if (legacyWallet.getBalance() > 0) {
          // yep, its legacy we're importing
          await legacyWallet.fetchTransactions();
          return saveWallet(legacyWallet);
        } else {
          // by default, we import wif as Segwit P2SH
          await segwitWallet.fetchBalance();
          await segwitWallet.fetchTransactions();
          return saveWallet(segwitWallet);
        }
      }

      // case - WIF is valid, just has uncompressed pubkey

      const legacyWallet = new LegacyWallet();
      legacyWallet.setSecret(text);
      if (legacyWallet.getAddress()) {
        await legacyWallet.fetchBalance();
        await legacyWallet.fetchTransactions();
        return saveWallet(legacyWallet);
      }

      // if we're here - nope, its not a valid WIF

      const hd2 = new HDSegwitP2SHWallet();
      hd2.setSecret(text);
      if (hd2.validateMnemonic()) {
        hd2.generateAddresses();
        await hd2.fetchBalance();
        if (hd2.getBalance() > 0) {
          await hd2.fetchTransactions();
          return saveWallet(hd2);
        }
      }

      const hd4 = new HDSegwitBech32Wallet();
      hd4.setSecret(text);
      if (hd4.validateMnemonic()) {
        hd4.generateAddresses();
        await hd4.fetchBalance();
        if (hd4.getBalance() > 0) {
          await hd4.fetchTransactions();
          return saveWallet(hd4);
        }
      }

      const hd3 = new HDLegacyP2PKHWallet();
      hd3.setSecret(text);
      if (hd3.validateMnemonic()) {
        hd3.generateAddresses();
        await hd3.fetchBalance();
        if (hd3.getBalance() > 0) {
          await hd3.fetchTransactions();
          return saveWallet(hd3);
        }
      }

      // no balances? how about transactions count?

      if (hd2.validateMnemonic()) {
        await hd2.fetchTransactions();
        if (hd2.getTransactions().length !== 0) {
          return saveWallet(hd2);
        }
      }
      if (hd3.validateMnemonic()) {
        await hd3.fetchTransactions();
        if (hd3.getTransactions().length !== 0) {
          return saveWallet(hd3);
        }
      }
      if (hd4.validateMnemonic()) {
        await hd4.fetchTransactions();
        if (hd4.getTransactions().length !== 0) {
          return saveWallet(hd4);
        }
      }

      // is it even valid? if yes we will import as:
      if (hd4.validateMnemonic()) {
        return saveWallet(hd4);
      }

      // not valid? maybe its a watch-only address?

      const watchOnly = new WatchOnlyWallet();
      watchOnly.setSecret(text);
      if (watchOnly.valid()) {
        await watchOnly.fetchTransactions();
        await watchOnly.fetchBalance();
        return saveWallet(watchOnly);
      }

      // nope?

      // TODO: try a raw private key
    } catch (Err) {
      console.log('error');
      showErrorMessageScreen();
    }
    showErrorMessageScreen();
    // ReactNativeHapticFeedback.trigger('notificationError', {
    //   ignoreAndroidSystemSettings: false,
    // });
    // Plan:
    // 0. check if its HDSegwitBech32Wallet (BIP84)
    // 1. check if its HDSegwitP2SHWallet (BIP49)
    // 2. check if its HDLegacyP2PKHWallet (BIP44)
    // 3. check if its HDLegacyBreadwalletWallet (no BIP, just "m/0")
    // 4. check if its Segwit WIF (P2SH)
    // 5. check if its Legacy WIF
    // 6. check if its address (watch-only wallet)
    // 7. check if its private key (segwit address P2SH) TODO
    // 7. check if its private key (legacy address) TODO
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputItemContainer}>
        <Text style={styles.title}>{en.importWallet.title}</Text>
        <Text style={styles.subtitle}>{en.importWallet.subtitle}</Text>
        <TextAreaItem onChangeText={onChangeText} placeholder={en.importWallet.placeholder} style={styles.textArea} />
      </View>
      <Button
        disabled={isButtonDisabled}
        title={en.importWallet.import}
        onPress={onImportButtonPress}
        containerStyle={styles.importButton}
      />
      <FlatButton title={en.importWallet.scanQrCode} onPress={onScanQrCodeButtonPress} />
    </View>
  );
};

ImportWalletScreen.navigationOptions = (props: NavigationScreenProps) => ({
  header: (
    <View>
      <Header navigation={props.navigation} isBackArrow={true} title="Import wallet" />
    </View>
  ),
  tabBarVisible: false,
});

const styles = StyleSheet.create({
  inputItemContainer: {
    paddingTop: 16,
    width: '100%',
  },
  title: {
    ...typography.headline4,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    color: palette.textGrey,
    paddingTop: 18,
    textAlign: 'center',
  },
  importButton: {
    justifyContent: 'flex-end',
    paddingTop: 32,
    paddingBottom: 20,
    flex: 1,
  },
  textArea: {
    marginTop: 24,
    height: 243,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
