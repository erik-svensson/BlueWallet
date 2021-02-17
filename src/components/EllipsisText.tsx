import React from 'react';
import { TextStyle, StyleProp, Text } from 'react-native';

type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

interface Props {
  children: React.ReactNode | string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  testID?: string;
  ellipsizeMode?: EllipsizeMode;
}

export const EllipsisText = ({ children, style, testID, numberOfLines = 1, ellipsizeMode = 'tail' }: Props) => (
  <Text testID={testID} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={style}>
    {children}
  </Text>
);
