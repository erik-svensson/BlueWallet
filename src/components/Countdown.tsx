import React, { FC, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { DateType } from 'app/consts';
import { getTimeDiff, getTimeDuration } from 'app/helpers/date';
import { useInterval } from 'app/helpers/useInterval';
import { palette, fonts } from 'app/styles';

const Cells = ({ text, title }: { text: string; title: string }) => (
  <View style={styles.cellsWrapper}>
    <View style={styles.lettersWrapper}>
      {text.split('').map((letter, index) => (
        <View key={index} style={styles.cell}>
          <Text style={styles.cellText}>{letter}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.cellsTitle}>{title}</Text>
  </View>
);
interface Props {
  dataEnd: DateType;
}

const numberToCellString = (n: number) => n.toString().padStart(2, '0');

export const Countdown: FC<Props> = ({ dataEnd }) => {
  const getCurrentTime = () => getTimeDiff(new Date(), dataEnd);

  const [time, setTime] = useState(getCurrentTime());

  useInterval(
    () => {
      setTime(getCurrentTime());
    },
    time > 0 ? 1000 : null,
  );

  const { days, hours, minutes } = getTimeDuration(time);

  return (
    <View style={styles.wrapper}>
      <Cells text={numberToCellString(days)} title="Days" />
      <View style={styles.commaWrapper} />
      <Cells text={numberToCellString(hours)} title="Hours" />
      <View style={styles.commaWrapper}>
        <Text style={styles.cellText}>:</Text>
      </View>
      <Cells text={numberToCellString(minutes)} title="Minutes" />
    </View>
  );
};

const styles = StyleSheet.create({
  commaWrapper: { marginTop: 4, width: 12 },
  wrapper: { display: 'flex', flexDirection: 'row' },
  cellsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cellsTitle: {
    textAlign: 'center',
    fontFamily: fonts.ubuntu.medium,
    fontSize: 14,
  },
  lettersWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    borderBottomWidth: 1,
    borderColor: palette.border,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  cellText: {
    fontFamily: fonts.ubuntu.light,
    fontSize: 24,
    textAlign: 'center',
  },
});
