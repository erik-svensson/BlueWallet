import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';

import { Button, ScreenTemplate, FlatButton } from 'app/components';
import { TimeCounter } from 'app/components/TimeCounter';
import { typography, palette } from 'app/styles';
import { isIos } from 'app/styles/helpers';

const i18n = require('../../loc');

interface Props {
  timestamp: number;
  onTryAgain: () => void;
}

const getTimeRemaining = (tmStamp: number) => parseInt((tmStamp - dayjs().unix()).toFixed(0));

export const TimeCounterScreen = (props: Props) => {
  const { timestamp, onTryAgain } = props;

  const [seconds, setSeconds] = useState(getTimeRemaining(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const s = getTimeRemaining(timestamp);
      if (s > 0) {
        setSeconds(s);
      } else {
        setSeconds(0);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitApp);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitApp);
    };
  });

  const exitApp = () => {
    BackHandler.exitApp();
    return true;
  };

  const onTryAgainPress = () => {
    onTryAgain();
  };

  return (
    <ScreenTemplate
      footer={
        <>
          <Button disabled={seconds !== 0} onPress={onTryAgainPress} title={i18n.timeCounter.tryAgain} />
          {!isIos() && (
            <FlatButton containerStyle={styles.flatButton} onPress={exitApp} title={i18n.timeCounter.closeTheApp} />
          )}
        </>
      }
    >
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{i18n.timeCounter.title}</Text>
        <Text style={styles.description}>{i18n.timeCounter.description}</Text>
      </View>
      <View style={styles.timerContainer}>
        <TimeCounter value={seconds} />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  flatButton: {
    marginTop: 20,
  },
  title: {
    marginTop: 110,
    marginBottom: 18,
    ...typography.headline4,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
  },
});
