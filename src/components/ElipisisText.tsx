import React from 'react';
import { TextStyle, StyleProp, Text } from 'react-native';

type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

interface Props extends Text {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;
}

export const ElipisisText = ({ children, style, numberOfLines = 1, ellipsizeMode = 'tail' }: Props) => (
  <Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={style}>
    {children}
  </Text>
);
