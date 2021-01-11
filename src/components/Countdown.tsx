import React, { FC, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { formatDate, getTimeDiff } from 'app/helpers/date';
import { useInterval } from 'app/helpers/useInterval';
import { typography, palette } from 'app/styles';

import { GradientVariant, GradientView } from './GradientView';

interface Props {
  dataEnd: Date;
}

export const Countdown: FC<Props> = ({ dataEnd }) => {
  const [time, setTime] = useState(getTimeDiff(new Date(), dataEnd));

  //   useInterval(
  //     () => {
  //       setTime(getTimeDiff(new Date(), dataEnd));
  //     },
  //     time > 0 ? 1000 : null,
  //   );

  console.log('time1', time);
  return (
    <View>
      <Text>{formatDate(new Date(), 'DD/MM/YY HH:mm:ss')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 33, height: 33, borderRadius: 20, justifyContent: 'center' },
  title: { ...typography.headline6, color: palette.white, textAlign: 'center' },
});
