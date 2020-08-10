import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { palette, fonts } from 'app/styles';

import { Text } from './Text';

interface Props {
  value: number;
}

export class TimeCounter extends Component<Props> {
  render() {
    const { value } = this.props;
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    const middleElement = 2;
    const getStringifiedWithZero = (number: number) => (number < 10 ? `0${number}` : `${number}`);
    const time = getStringifiedWithZero(minutes) + ':' + getStringifiedWithZero(seconds);

    return (
      <View style={styles.container}>
        {[...Array(time.length)].map((el, index) => {
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
  }
}

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
