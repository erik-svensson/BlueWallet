import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextProps } from 'react-native';

import { typography, palette } from 'app/styles';

type LabelType = 'default';
interface Props {
  labelStyle?: StyleProp<TextProps>;
  children: string;
  type?: LabelType;
}

export const Label = ({ children, labelStyle, type = 'default' }: Props) => (
  <View style={styles.labelWrapper}>
    <Text style={[styles.label, labelStyle, styles[type]]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  labelWrapper: {
    display: 'flex',
  },
  type: {},
  label: {
    ...typography.status,
    backgroundColor: palette.mediumGrey,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    textAlign: 'center',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
});
