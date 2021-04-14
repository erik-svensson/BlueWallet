import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { CONST } from 'app/consts';
import { palette } from 'app/styles';

interface Props {
  value: string;
  testID?: string;
  onTextChange: (pin: string) => void;
  isError?: boolean;
}

export const CodeInput: FC<Props> = ({ value, onTextChange, testID, isError = false }) => {
  const setCodeValue = (code: string) => {
    if (CONST.notificationCodeInputRegex.test(code)) {
      onTextChange(code);
    }
  };

  const ref = useBlurOnFulfill({ value, cellCount: CONST.pinCodeLength });
  const [propsInput, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: setCodeValue,
  });

  return (
    <CodeField
      ref={ref}
      {...propsInput}
      autoFocus
      autoCapitalize="none"
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
          style={[styles.cell, isFocused && styles.cellFocused, isError && styles.error]}
        >
          <Text style={styles.cellText}>{symbol}</Text>
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
  error: {
    borderColor: palette.error,
  },
});
