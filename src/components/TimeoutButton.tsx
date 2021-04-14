import React, { useState, useEffect, FC } from 'react';
import { StyleSheet, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import { CONST } from 'app/consts';
import { typography } from 'app/styles';

import { FlatButton } from './FlatButton';

interface Props {
  timeoutSeconds?: number;
  title: string;
  testID?: string;
  onPress: (e?: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  timeInBackground?: number;
}

export const TimeoutButton: FC<Props> = ({
  title,
  testID,
  timeoutSeconds = CONST.buttonTimeoutSeconds,
  onPress,
  containerStyle,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds(secs => {
        return secs > 0 ? secs - 1 : 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  const getTimeout = () => {
    if (seconds <= 0) {
      return '';
    }

    return ` (${seconds})`;
  };

  const onButtonPress = (e: GestureResponderEvent) => {
    setSeconds(timeoutSeconds);
    setTimerOn(true);
    onPress(e);
  };

  return (
    <FlatButton
      testID={testID}
      disabled={seconds > 0}
      titleStyle={styles.titleStyle}
      title={`${title}${getTimeout()}`}
      onPress={onButtonPress}
      containerStyle={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    ...typography.headline6,
  },
});
