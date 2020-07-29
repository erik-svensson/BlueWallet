import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Overlay } from 'react-native-elements';

import { MainCardStackNavigatorParams, Route } from 'app/consts';
import { useInterval } from 'app/helpers/useInterval';
import { typography } from 'app/styles';

import { Button } from './Button';

const i18n = require('../../loc');

interface Props {
  timestamp: number;
  isVisible: boolean;
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.CurrentPin>;
  onCountFinish?: () => void;
}

export const TimeCounter = ({ timestamp, onCountFinish, isVisible, navigation }: Props) => {
  const currentTimestamp = new Date().getTime();
  const secondsToCount = ((timestamp - currentTimestamp) / 1000).toFixed(0);
  const [seconds, setSeconds] = useState(parseInt(secondsToCount));

  const isTimeUp = (): boolean => seconds === 0;

  useInterval(
    () => {
      setSeconds(seconds - 1);
    },
    seconds > 0 ? 1000 : null,
  );

  useEffect(() => {
    if (isTimeUp()) {
      onFinish();
    }
  });

  const onFinish = () => {
    if (onCountFinish) {
      onCountFinish();
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <Overlay isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.numberOfAttemptsExceeded}</Text>
          <Text style={typography.headline4}>
            {i18n.onboarding.tryAgain} {seconds} {i18n.onboarding.seconds}
          </Text>
        </View>
        <KeyboardAvoidingView style={styles.footer} keyboardVerticalOffset={20}>
          <Button onPress={goBack} title={i18n.onboarding.goBack} />
        </KeyboardAvoidingView>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  footer: {
    marginBottom: 12,
  },
});
