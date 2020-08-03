import React from 'react';
import { View, Text, StyleSheet, TextProps } from 'react-native';

import { typography } from 'app/styles';

interface Props {
  additionalLabelStyle: TextProps;
  children: string;
}

export const Label = ({ children, additionalLabelStyle }: Props) => (
  <View style={styles.labelWrapper}>
    <Text style={[styles.label, additionalLabelStyle]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  labelWrapper: {
    display: 'flex',
  },
  label: {
    ...typography.status,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    textAlign: 'center',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
});
