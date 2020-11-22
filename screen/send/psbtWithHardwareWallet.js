/* global alert */
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  Linking,
  Platform,
  PermissionsAndroid,
  Text,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Clipboard from '@react-native-community/clipboard';
import {
  SecondButton,
  BlueText,
  SafeBlueArea,
  BlueCard,
  BlueNavigationStyle,
  BlueSpacing20,
  BlueCopyToClipboardButton,
  DynamicQRCode,
} from '../../BlueComponents';
import Share from 'react-native-share';
import { getSystemName } from 'react-native-device-info';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import loc from '../../loc';
import ScanQRCode from './ScanQRCode';
import { BlueStorageContext } from '../../blue_modules/storage-context';
import Notifications from '../../blue_modules/notifications';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
const BlueElectrum = require('../../blue_modules/BlueElectrum');
/** @type {AppStorage} */
const bitcoin = require('bitcoinjs-lib');
const LocalQRCode = require('@remobile/react-native-qrcode-local-image');
const isDesktop = getSystemName() === 'Mac OS X';

const PsbtWithHardwareWallet = () => {
  const { txMetadata, fetchAndSaveWalletTransactions } = useContext(BlueStorageContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { fromWallet, memo, psbt, deepLinkPSBT } = route.params;
  const routeParamsPSBT = useRef(route.params.psbt);
  const routeParamsTXHex = route.params.txhex;
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [txHex, setTxHex] = useState(route.params.txhex);

  const stylesHook = StyleSheet.create({
    root: {
      backgroundColor: colors.elevated,
    },
    rootPadding: {
      backgroundColor: colors.elevated,
    },
    hexWrap: {
      backgroundColor: colors.elevated,
    },
    hexLabel: {
      color: colors.foregroundColor,
    },
    hexInput: {
      borderColor: colors.formBorder,
      backgroundColor: colors.inputBackgroundColor,
      color: colors.foregroundColor,
    },
    hexText: {
      color: colors.foregroundColor,
    },
  });

  const _combinePSBT = receivedPSBT => {
    return fromWallet.combinePsbt(psbt, receivedPSBT);
  };

  const onBarScanned = ret => {
    if (ret && !ret.data) ret = { data: ret };
    if (ret.data.toUpperCase().startsWith('UR')) {
      alert('BC-UR not decoded. This should never happen');
    }
    if (ret.data.indexOf('+') === -1 && ret.data.indexOf('=') === -1 && ret.data.indexOf('=') === -1) {
      // this looks like NOT base64, so maybe its transaction's hex
      setTxHex(ret.data);
      return;
    }
    try {
      const Tx = _combinePSBT(ret.data);
      setTxHex(Tx.toHex());
    } catch (Err) {
      alert(Err);
    }
  };

  useEffect(() => {
    if (!psbt && !route.params.txhex) {
      alert(loc.send.no_tx_signing_in_progress);
    }

    if (deepLinkPSBT) {
      const psbt = bitcoin.Psbt.fromBase64(deepLinkPSBT);
      try {
        const Tx = fromWallet.combinePsbt(routeParamsPSBT.current, psbt);
        setTxHex(Tx.toHex());
      } catch (Err) {
        alert(Err);
      }
    } else if (routeParamsTXHex) {
      setTxHex(routeParamsTXHex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLinkPSBT, routeParamsTXHex]);

  const broadcast = async () => {
    setIsLoading(true);
    try {
      await BlueElectrum.ping();
      await BlueElectrum.waitTillConnected();
      const result = await fromWallet.broadcastTx(txHex);
      if (result) {
        setIsLoading(false);
        const txDecoded = bitcoin.Transaction.fromHex(txHex);
        const txid = txDecoded.getId();
        Notifications.majorTomToGroundControl([], [], [txid]);
        if (memo) {
          txMetadata[txid] = { memo };
        }
        fetchAndSaveWalletTransactions(fromWallet.getID());
        navigation.navigate('Success', { amount: undefined });
      } else {
        ReactNativeHapticFeedback.trigger('notificationError', { ignoreAndroidSystemSettings: false });
        setIsLoading(false);
        alert(loc.errors.broadcast);
      }
    } catch (error) {
      ReactNativeHapticFeedback.trigger('notificationError', { ignoreAndroidSystemSettings: false });
      setIsLoading(false);
      alert(error.message);
    }
  };

  const handleOnVerifyPressed = () => {
    Linking.openURL('https://coinb.in/?verify=' + txHex);
  };

  const copyHexToClipboard = () => {
    Clipboard.setString(txHex);
  };

  const _renderBroadcastHex = () => {
    return (
      <View style={[styles.rootPadding, stylesHook.rootPadding]}>
        <BlueCard style={[styles.hexWrap, stylesHook.hexWrap]}>
          <BlueText style={[styles.hexLabel, stylesHook.hexLabel]}>{loc.send.create_this_is_hex}</BlueText>
          <TextInput style={[styles.hexInput, stylesHook.hexInput]} height={112} multiline editable value={txHex} />

          <TouchableOpacity style={styles.hexTouch} onPress={copyHexToClipboard}>
            <Text style={[styles.hexText, stylesHook.hexText]}>{loc.send.create_copy}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hexTouch} onPress={handleOnVerifyPressed}>
            <Text style={[styles.hexText, stylesHook.hexText]}>{loc.send.create_verify}</Text>
          </TouchableOpacity>
          <BlueSpacing20 />
          <SecondButton onPress={broadcast} title={loc.send.confirm_sendNow} testID="PsbtWithHardwareWalletBroadcastTransactionButton" />
        </BlueCard>
      </View>
    );
  };

  const exportPSBT = async () => {
    const fileName = `${Date.now()}.psbt`;
    if (Platform.OS === 'ios') {
      const filePath = RNFS.TemporaryDirectoryPath + `/${fileName}`;
      await RNFS.writeFile(filePath, typeof psbt === 'string' ? psbt : psbt.toBase64());
      Share.open({
        url: 'file://' + filePath,
        saveToFiles: isDesktop,
      })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          RNFS.unlink(filePath);
        });
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: loc.send.permission_storage_title,
        message: loc.send.permission_storage_message,
        buttonNeutral: loc.send.permission_storage_later,
        buttonNegative: loc._.cancel,
        buttonPositive: loc._.ok,
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission: Granted');
        const filePath = RNFS.DownloadDirectoryPath + `/${fileName}`;
        await RNFS.writeFile(filePath, typeof psbt === 'string' ? psbt : psbt.toBase64());
        alert(loc.formatString(loc.send.txSaved, { filePath: fileName }));
      } else {
        console.log('Storage Permission: Denied');
      }
    }
  };

  const openSignedTransaction = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: Platform.OS === 'ios' ? ['io.bluewallet.psbt', 'io.bluewallt.psbt.txn'] : [DocumentPicker.types.allFiles],
      });
      const file = await RNFS.readFile(res.uri);
      if (file) {
        onBarScanned({ data: file });
      } else {
        throw new Error();
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        alert(loc.send.details_no_signed_tx);
      }
    }
  };

  const openScanner = () => {
    if (isDesktop) {
      ImagePicker.launchCamera(
        {
          title: null,
          mediaType: 'photo',
          takePhotoButtonTitle: null,
        },
        response => {
          if (response.uri) {
            const uri = Platform.OS === 'ios' ? response.uri.toString().replace('file://', '') : response.path.toString();
            LocalQRCode.decode(uri, (error, result) => {
              if (!error) {
                onBarScanned(result);
              } else {
                alert(loc.send.qr_error_no_qrcode);
              }
            });
          } else if (response.error) {
            ScanQRCode.presentCameraNotAuthorizedAlert(response.error);
          }
        },
      );
    } else {
      navigation.navigate('ScanQRCodeRoot', {
        screen: 'ScanQRCode',
        params: {
          launchedBy: route.name,
          showFileImportButton: false,
          onBarScanned,
        },
      });
    }
  };

  if (txHex) return _renderBroadcastHex();

  return isLoading ? (
    <View style={[styles.rootPadding, stylesHook.rootPadding]}>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeBlueArea style={[styles.root, stylesHook.root]}>
      <ScrollView centerContent contentContainerStyle={styles.scrollViewContent} testID="PsbtWithHardwareScrollView">
        <View style={styles.container}>
          <BlueCard>
            <BlueText testID="TextHelperForPSBT">{loc.send.psbt_this_is_psbt}</BlueText>
            <BlueSpacing20 />
            <DynamicQRCode value={psbt.toHex()} capacity={200} />
            <BlueSpacing20 />
            <SecondButton
              testID="PsbtTxScanButton"
              icon={{
                name: 'qrcode',
                type: 'font-awesome',
                color: colors.buttonTextColor,
              }}
              onPress={openScanner}
              title={loc.send.psbt_tx_scan}
            />
            <BlueSpacing20 />
            <SecondButton
              icon={{
                name: 'file-import',
                type: 'material-community',
                color: colors.buttonTextColor,
              }}
              onPress={openSignedTransaction}
              title={loc.send.psbt_tx_open}
            />
            <BlueSpacing20 />
            <SecondButton
              icon={{
                name: 'share-alternative',
                type: 'entypo',
                color: colors.buttonTextColor,
              }}
              onPress={exportPSBT}
              title={loc.send.psbt_tx_export}
            />
            <BlueSpacing20 />
            <View style={styles.copyToClipboard}>
              <BlueCopyToClipboardButton
                stringToCopy={typeof psbt === 'string' ? psbt : psbt.toBase64()}
                displayText={loc.send.psbt_clipboard}
              />
            </View>
          </BlueCard>
        </View>
      </ScrollView>
    </SafeBlueArea>
  );
};

export default PsbtWithHardwareWallet;

PsbtWithHardwareWallet.navigationOptions = () => ({
  ...BlueNavigationStyle(null, false),
  title: loc.send.header,
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  rootPadding: {
    flex: 1,
    paddingTop: 20,
  },
  hexWrap: {
    alignItems: 'center',
    flex: 1,
  },
  hexLabel: {
    fontWeight: '500',
  },
  hexInput: {
    borderRadius: 4,
    marginTop: 20,
    fontWeight: '500',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  hexTouch: {
    marginVertical: 24,
  },
  hexText: {
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
  },
  copyToClipboard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});