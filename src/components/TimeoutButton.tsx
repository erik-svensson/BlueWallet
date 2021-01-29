import React, { useState, FC } from 'react';
import { StyleSheet, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native';

import { useInterval } from 'app/helpers/useInterval';
import { typography } from 'app/styles';

import { FlatButton } from './FlatButton';

interface Props {
  timeoutSeconds: number;
  title: string;
  testID?: string;
  onPress: (e?: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TimeoutButton: FC<Props> = ({ title, testID, timeoutSeconds, onPress, containerStyle }) => {
  const [seconds, setSeconds] = useState(0);
  useInterval(
    () => {
      setSeconds(seconds - 1);
    },
    seconds > 0 ? 1000 : null,
  );

  const getTimeout = () => {
    if (seconds <= 0) {
      return '';
    }

    return ` (${seconds})`;
  };

  const onButtonPress = (e: GestureResponderEvent) => {
    setSeconds(timeoutSeconds);
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
