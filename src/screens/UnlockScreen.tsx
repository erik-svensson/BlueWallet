import dayjs from 'dayjs';
import React, { PureComponent } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Image, PinView, PinInputView } from 'app/components';
import { CONST, Route } from 'app/consts';
import { BiometricService, SecureStorageService, NavigationService } from 'app/services';
import { ApplicationState } from 'app/state';
import {
  setTimeCounter,
  SetTimeCounterAction,
  setFailedAttempts,
  SetFailedAttemptsAction,
} from 'app/state/timeCounter/actions';
import { TimeCounterState } from 'app/state/timeCounter/reducer';
import { getStatusBarHeight, palette, typography } from 'app/styles';

const BlueApp = require('../../BlueApp');
const i18n = require('../../loc');

interface Props {
  onSuccessfullyAuthenticated?: () => void;
  isBiometricEnabledByUser: boolean;
  setTimeCounter: (timestamp: number) => SetTimeCounterAction;
  setFailedAttempts: (attempt: number) => SetFailedAttemptsAction;
  timeCounter: TimeCounterState;
}

interface State {
  pin: string;
  error: string;
  failedTimes: number;
  isCount: boolean;
}

class UnlockScreen extends PureComponent<Props, State> {
  state: State = {
    pin: '',
    error: '',
    failedTimes: 0,
    isCount: true,
  };

  async componentDidMount() {
    await BlueApp.startAndDecrypt();
    if (this.props.isBiometricEnabledByUser) {
      await this.unlockWithBiometrics();
    }
  }

  unlockWithBiometrics = async () => {
    if (!!BiometricService.biometryType) {
      const result = await BiometricService.unlockWithBiometrics();
      if (result) {
        this.props.onSuccessfullyAuthenticated && this.props.onSuccessfullyAuthenticated();
      }
    }
  };

  handleFailedAttempt = (increasedFailedTimes: number) => {
    const { attempt } = this.props.timeCounter;
    const isFinalAttempt = increasedFailedTimes > 2;
    const finalAttempt = 3;
    const firstAttempt = 0;
    let currentDate = dayjs();
    let blockedTimeInMinutes = 1;

    if (attempt === 0) {
      currentDate = currentDate.add(1, 'minute');
      blockedTimeInMinutes = 1;
    } else if (attempt === 1) {
      currentDate = currentDate.add(2, 'minute');
      blockedTimeInMinutes = 2;
    } else if (attempt > 1) {
      currentDate = currentDate.add(10, 'minute');
      blockedTimeInMinutes = 10;
    }

    if (isFinalAttempt) {
      this.props.setTimeCounter(currentDate.unix());
      this.props.setFailedAttempts(attempt + 1);
      this.setState({ isCount: true });
    }

    return increasedFailedTimes !== firstAttempt && increasedFailedTimes !== finalAttempt
      ? `\n${i18n.onboarding.failedTimesErrorInfo} ${blockedTimeInMinutes} ${i18n.onboarding.minutes}\n${i18n.onboarding.failedTimes} ${increasedFailedTimes}/${finalAttempt}`
      : '';
  };

  updatePin = (pin: string) => {
    this.setState({ pin: this.state.pin + pin }, async () => {
      if (this.state.pin.length === CONST.pinCodeLength) {
        const setPin = await SecureStorageService.getSecuredValue('pin');
        if (setPin === this.state.pin) {
          this.props.setFailedAttempts(0);
          this.props.onSuccessfullyAuthenticated && this.props.onSuccessfullyAuthenticated();
        } else {
          const increasedFailedTimes = this.state.failedTimes + 1;
          const failedTimesError = this.handleFailedAttempt(increasedFailedTimes);
          this.setState({
            error: i18n.onboarding.pinDoesNotMatch + failedTimesError,
            pin: '',
            failedTimes: increasedFailedTimes,
          });
        }
      }
    });
  };

  onClearPress = () => {
    this.setState({
      pin: this.state.pin.slice(0, -1),
    });
  };

  onCountFinish = () => {
    this.setState({ failedTimes: 0, isCount: false });
  };

  isTimeCounterVisible = () => {
    return dayjs().unix() < this.props.timeCounter.timestamp && this.state.isCount;
  };

  render() {
    const { error, pin } = this.state;
    if (this.isTimeCounterVisible()) {
      NavigationService.navigate(Route.TimeCounter, {
        onCountFinish: this.onCountFinish,
        timestamp: this.props.timeCounter.timestamp,
      });
    }
    if (!this.isTimeCounterVisible()) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.imageContainer}>
            <Image source={images.portraitLogo} style={styles.logo} resizeMode="contain" />
          </View>
          <PinView value={pin} length={CONST.pinCodeLength as number} />
          <Text style={styles.errorText}>{error}</Text>
          <PinInputView value={pin} onTextChange={this.updatePin} onClearPress={this.onClearPress} />
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  timeCounter: state.timeCounter,
});

const mapDispatchToProps = {
  setTimeCounter,
  setFailedAttempts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnlockScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    paddingTop: getStatusBarHeight(),
    zIndex: 1000,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 235,
  },
  errorText: {
    marginVertical: 20,
    color: palette.textRed,
    marginHorizontal: 20,
    textAlign: 'center',
    ...typography.headline6,
  },
});
