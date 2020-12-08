import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { CONST } from 'app/consts';
import { palette } from 'app/styles';

interface Props {
  value: string;
  testID?: string;
  onTextChange: (pin: string) => void;
}

export const CodeInput = ({ value, onTextChange, testID }: Props) => {
  const [_, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CONST.pinCodeLength });
  const [propsInput, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const setCodeValue = (code: string) => {
    setValue(code);
    onTextChange(code);
  };

  return (
    <CodeField
      ref={ref}
      {...propsInput}
      autoFocus
      testID={testID}
      value={value}
      rootStyle={styles.container}
      onChangeText={setCodeValue}
      cellCount={CONST.pinCodeLength}
      keyboardType="default"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cell, isFocused && styles.cellFocused]}
        >
          <Text style={styles.cellText}>{symbol || (isFocused && null)}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cell: {
    borderBottomWidth: 1,
    borderColor: palette.textGrey,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  cellFocused: {
    borderColor: palette.secondary,
  },
  cellText: {
    color: palette.textBlack,
    fontSize: 36,
    textAlign: 'center',
  },
});
