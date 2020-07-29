import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, PinInput, ScreenTemplate } from 'app/components';
import { TimeCounter } from 'app/components/TimeCounter';
import { Route, CONST, FlowType, MainCardStackNavigatorParams } from 'app/consts';
import { SecureStorageService } from 'app/services';
import { ApplicationState } from 'app/state';
import {
  setTimeCounter,
  SetTimeCounterAction,
  setFailedAttempts,
  SetFailedAttemptsAction,
} from 'app/state/timeCounter/actions';
import { TimeCounterState } from 'app/state/timeCounter/reducer';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.CurrentPin>;
  appSettings: {
    isPinSet: boolean;
  };
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

class CurrentPinScreen extends PureComponent<Props, State> {
  state = {
    pin: '',
    error: '',
    failedTimes: 0,
    isCount: true,
  };

  handleFailedAttempt = (increasedFailedTimes: number) => {
    if (increasedFailedTimes > 2) {
      const { attempt } = this.props.timeCounter;
      const timestamp = new Date().getTime();
      let failedAttemptTimestamp = 60 * 1000;
      if (attempt === 1) {
        failedAttemptTimestamp = failedAttemptTimestamp * 2;
      } else if (attempt > 1) {
        failedAttemptTimestamp = failedAttemptTimestamp * 10;
      }
      failedAttemptTimestamp = failedAttemptTimestamp + timestamp;
      this.props.setTimeCounter(failedAttemptTimestamp);
      this.props.setFailedAttempts(attempt + 1);
      this.setState({ isCount: true });
    }
  };

  getFailedTimesError = (increasedFailedTimes: number) => {
    const { attempt } = this.props.timeCounter;
    let blockedTime = 1;
    if (attempt === 1) {
      blockedTime = 2;
    } else if (attempt > 1) {
      blockedTime = 10;
    }
    return increasedFailedTimes !== 0 && increasedFailedTimes !== 3
      ? `\n${i18n.onboarding.failedTimesErrorInfo} ${blockedTime} ${i18n.onboarding.minutes}\n${i18n.onboarding.failedTimes} ${increasedFailedTimes}/3`
      : '';
  };

  updatePin = (pin: string) => {
    const { setFailedAttempts } = this.props;
    this.setState({ pin }, async () => {
      if (this.state.pin.length === CONST.pinCodeLength) {
        const setPin = await SecureStorageService.getSecuredValue('pin');
        if (setPin === this.state.pin) {
          setFailedAttempts(0);
          this.props.navigation.navigate(Route.CreatePin, {
            flowType: FlowType.newPin,
          });
        } else {
          const increasedFailedTimes = this.state.failedTimes + 1;
          const failedTimesError = this.getFailedTimesError(increasedFailedTimes);
          this.handleFailedAttempt(increasedFailedTimes);
          this.setState({
            error: i18n.onboarding.pinDoesNotMatch + failedTimesError,
            pin: '',
            failedTimes: increasedFailedTimes,
          });
        }
      }
    });
  };

  onCountFinish = () => {
    this.setState({ failedTimes: 0, isCount: false });
  };

  isTimeCounterVisible = () => {
    return new Date().getTime() < this.props.timeCounter.timestamp && this.state.isCount;
  };

  render() {
    const { error } = this.state;
    return (
      <ScreenTemplate
        noScroll
        header={<Header navigation={this.props.navigation} isBackArrow title={i18n.onboarding.changePin} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.currentPin}</Text>
        </View>
        <View style={styles.pinContainer}>
          <PinInput value={this.state.pin} onTextChange={this.updatePin} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
        {this.isTimeCounterVisible() && (
          <TimeCounter
            navigation={this.props.navigation}
            onCountFinish={this.onCountFinish}
            isVisible={this.isTimeCounterVisible()}
            timestamp={this.props.timeCounter.timestamp}
          />
        )}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  timeCounter: state.timeCounter,
});

const mapDispatchToProps = {
  setTimeCounter,
  setFailedAttempts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPinScreen);

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 72,
  },
  errorText: {
    marginVertical: 10,
    color: palette.textRed,
    textAlign: 'center',
    ...typography.headline6,
  },
});
