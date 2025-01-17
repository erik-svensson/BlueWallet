import React, { PureComponent } from 'react';
import { StyleSheet, TextInput as BaseTextInput, StyleProp, ViewStyle, Text, Keyboard } from 'react-native';

import { defaultKeyboardType } from 'app/consts';
import { palette, typography } from 'app/styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  value?: string;
  editable?: boolean;
  autoCapitalize?: 'none';
  testID?: string;
}

interface State {
  isActive: boolean;
}
export class TextAreaItem extends PureComponent<Props, State> {
  state = {
    isActive: false,
  };
  onFocus = () => this.setState({ isActive: true });

  onBlur = () => this.setState({ isActive: false });

  render() {
    const { style, placeholder, onChangeText, error, value, editable, autoCapitalize, testID } = this.props;
    const { isActive } = this.state;

    return (
      <>
        <BaseTextInput
          style={[styles.input, isActive && styles.inputActive, style, !!error && styles.isError]}
          placeholder={placeholder}
          placeholderTextColor={palette.textGrey}
          numberOfLines={100}
          autoCorrect={false}
          keyboardType={defaultKeyboardType}
          selectionColor={palette.textSecondary}
          value={value}
          editable={editable}
          multiline={true}
          testID={testID}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={onChangeText}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          autoCapitalize={autoCapitalize}
        />
        {!!error && (
          <Text testID={`${testID}-validation-error`} style={styles.error}>
            {error}
          </Text>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    ...typography.caption,
    color: palette.textBlack,
    height: 100,
    padding: 16,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
  },
  inputActive: {
    borderColor: palette.textSecondary,
  },
  isError: {
    borderColor: palette.error,
  },
  error: {
    marginTop: 3,
    ...typography.subtitle2,
    color: palette.error,
  },
});
