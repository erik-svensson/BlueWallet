import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox as CheckBoxNative, CheckBoxProps, Text } from 'react-native-elements';

import { palette, typography } from 'app/styles';

interface Props<T> {
  title: string;
  subtitle: string;
  value: T;
  selectedValue: T;
  onPress?: (value: T) => void;
  testID?: string;
}

export const RadioButton = <T extends string>(props: Props<T>) => {
  const [value] = useState(props.value);

  const onPressHandler = () => {
    props.onPress && props.onPress(value);
  };

  const isValueSelected = (value: T, selectedValue: T) => value === selectedValue;

  const renderTitle = (title: string, subtitle: string) => (
    <View style={styles.radioButtonContent}>
      <Text style={styles.radioButtonTitle}>{title}</Text>
      <Text style={styles.radioButtonSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <CheckBoxNative
      title={renderTitle(props.title, props.subtitle)}
      checked={isValueSelected(value, props.selectedValue)}
      containerStyle={styles.containerStyle}
      wrapperStyle={styles.wrapperStyle}
      iconType="material"
      checkedIcon="radio-button-checked"
      checkedColor={palette.secondary}
      uncheckedIcon="radio-button-unchecked"
      uncheckedColor={palette.secondary}
      onPress={onPressHandler}
      // @ts-ignore - It works but testID is missing in type definitions of CheckBoxNative component
      testID={props.testID}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: palette.white,
    borderWidth: 0,
    alignContent: 'center',
    marginLeft: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
  },
  wrapperStyle: {
    alignItems: 'flex-start',
  },
  radioButtonContent: {
    paddingStart: 10,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
    fontSize: 13,
  },
});

export default RadioButton;
