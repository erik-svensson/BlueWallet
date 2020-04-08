import React, { Component } from 'react';
import { StyleSheet, TextInput as BaseTextInput, View, Text } from 'react-native';

import { palette, typography } from 'styles';

interface Props {
  label: string;
  suffix?: string;
  error?: string;
}

interface State {
  isFocused: boolean;
  value: string;
}

export class InputItem extends Component<Props, State> {
  state = {
    isFocused: false,
    value: '',
  };

  onFocus = () => this.setState({ isFocused: true });
  onBlur = () => this.setState({ isFocused: false });
  onChangeText = (text: string) => {
    this.setState({ value: text });
  };

  render() {
    const { isFocused, value } = this.state;
    const { label, suffix, error } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.label, isFocused || !!value ? styles.labelActive : styles.labelInActive]}>{label}</Text>
        {!!suffix && <Text style={styles.suffix}>{suffix}</Text>}
        <BaseTextInput
          {...this.props}
          style={[styles.input, !!suffix && styles.isSuffix, !!error && styles.isError]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 53,
  },
  label: {
    position: 'absolute',
    left: 0,
    color: palette.textGrey,
  },
  labelActive: {
    ...typography.overline,
    top: -8,
  },
  labelInActive: {
    ...typography.caption,
    lineHeight: 19,
    top: 12,
  },
  input: {
    paddingRight: 50,
    height: 43,
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
    ...typography.caption,
  },
  isSuffix: {
    paddingRight: 50,
  },
  isError: {
    borderBottomColor: palette.error,
  },
  suffix: {
    position: 'absolute',
    right: 0,
    top: 12,
    ...typography.caption,
    lineHeight: 19,
  },
  error: {
    marginTop: 3,
    ...typography.subtitle2,
    color: palette.error,
  },
});
