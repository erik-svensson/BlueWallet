/* global alert */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity, StatusBar, View, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { images } from 'app/assets';
import { getStatusBarHeight } from 'app/styles';

const { width } = Dimensions.get('window');
const SCAN_CODE_AFTER_MS = 2 * 1000; // in miliseconds

export class ScanQrAddressScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  cameraRef = null;

  onBarCodeScanned = async ret => {
    const onAddressRead = this.props.navigation.getParam('onAddressRead');
    if (RNCamera.Constants.CameraStatus === RNCamera.Constants.CameraStatus.READY) this.cameraRef.pausePreview();
    if (+new Date() - this.lastTimeIveBeenHere < SCAN_CODE_AFTER_MS) {
      this.lastTimeIveBeenHere = +new Date();
      return;
    }
    this.lastTimeIveBeenHere = +new Date();
    const address = await ret.data;
    onAddressRead(address);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <StatusBar hidden />
        <RNCamera
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          style={{ flex: 1, justifyContent: 'space-between' }}
          onBarCodeRead={this.onBarCodeScanned}
          ref={ref => (this.cameraRef = ref)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
        <View style={styles.crosshairContainer}>
          <Image style={styles.crosshair} source={images.scanQRcrosshair} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => this.props.navigation.goBack()}>
          <Image source={images.close} />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  crosshairContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crosshair: {
    width: width * 0.58,
    height: width * 0.58,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: getStatusBarHeight(),
    right: 20,
  },
});
