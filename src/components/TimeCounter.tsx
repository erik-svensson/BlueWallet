import React from 'react';
import { View, StyleSheet } from 'react-native';

import { palette, fonts } from 'app/styles';
import { secondsToFormat } from 'app/utils/date';

import { Text } from './Text';

interface Props {
  value: number;
}

export const TimeCounter = ({ value }: Props) => {
  const middleElement = 2;
  const time = secondsToFormat(value, 'mm:ss');
  return (
    <View style={styles.container}>
      {time.split('').map((el, index) => {
        const number = time[index];
        if (index === middleElement) {
          return (
            <View key={index} style={styles.breakContainer}>
              <Text style={styles.number}>{number}</Text>
            </View>
          );
        }
        return (
          <View key={index} style={styles.valueContainer}>
            <Text style={styles.number}>{number}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  valueContainer: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGrey,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  breakContainer: {
    width: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: fonts.ubuntu.light,
    fontSize: 24,
  },
});
