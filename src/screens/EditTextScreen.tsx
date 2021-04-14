import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header, InputItem, Button, ScreenTemplate } from 'app/components';
import { defaultKeyboardType, RootStackParams, Route } from 'app/consts';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.EditText>;
  route: RouteProp<RootStackParams, Route.EditText>;
}

export const EditTextScreen = (props: Props) => {
  const {
    label,
    header,
    onSave,
    title,
    inputTestID,
    submitButtonTestID,
    maxLength,
    checkZero,
    keyboardType = defaultKeyboardType,
    validate,
    validateName,
    validateOnSave = null,
    emptyValueAllowed = false,
    value: paramsValue,
  } = props.route.params;

  const [value, setValue] = useState(paramsValue || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [value]);

  const handlePressOnSaveButton = () => {
    if (validateOnSave) {
      try {
        validateOnSave(value);
      } catch (err) {
        if (validateName) {
          setError(i18n.contactCreate.nameCannotContainSpecialCharactersError);
        } else {
          setError(i18n.send.details.address_field_is_not_valid);
        }

        return;
      }
    }
    onSave(value);
    props.navigation.pop();
  };

  const canSubmit = () => {
    if (!value.trim()) {
      return emptyValueAllowed;
    }

    if (validate === undefined) {
      return true;
    }
    return !!!validate(value);
  };

  return (
    <ScreenTemplate
      footer={
        <Button
          testID={submitButtonTestID}
          title={i18n._.save}
          onPress={handlePressOnSaveButton}
          disabled={!canSubmit()}
        />
      }
      header={<Header isBackArrow={true} title={title} />}
    >
      {header}
      <View style={styles.inputItemContainer}>
        <InputItem
          testID={inputTestID}
          label={label}
          value={checkZero ? checkZero(value) : value}
          setValue={setValue}
          autoFocus={true}
          error={error || (value && !!validate && validate(value)) || ''}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  inputItemContainer: {
    paddingTop: 20,
    width: '100%',
  },
});
