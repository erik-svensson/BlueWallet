import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { dimensions } from 'app/consts';
import { palette } from 'app/styles';

export const Separator = ({ style }: { style?: StyleProp<ViewStyle> }) => <View style={[styles.seprator, style]} />;

const styles = StyleSheet.create({
  seprator: {
    width: dimensions.width,
    alignSelf: 'center',
    marginVertical: 20,
    borderTopWidth: 1,
    borderColor: palette.lightGrey,
  },
});
