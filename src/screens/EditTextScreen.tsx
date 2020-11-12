import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header, InputItem, Button, ScreenTemplate } from 'app/components';
import { defaultKeyboardType, RootStackParams, Route } from 'app/consts';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.EditText>;
  route: RouteProp<RootStackParams, Route.EditText>;
}

export const EditTextScreen = (props: Props) => {
  const { params } = props.route;
  const { label, header, onSave, title, maxLength } = params;
  const keyboardType = params.keyboardType || defaultKeyboardType;
  const validate = params.validate || null;
  const validateOnSave = params.validateOnSave || null;
  const emptyValueAllowed = params.emptyValueAllowed || false;

  const [value, setValue] = useState(params.value || '');
  const [error, setError] = useState('');

  const handlePressOnSaveButton = () => {
    if (validateOnSave) {
      try {
        validateOnSave(value);
      } catch (err) {
        setError(i18n.send.details.address_field_is_not_valid);
        return;
      }
    }
    onSave(value);
    props.navigation.pop();
  };

  return (
    <ScreenTemplate
      footer={
        <Button
          title={i18n._.save}
          onPress={handlePressOnSaveButton}
          disabled={emptyValueAllowed || !value || (!!validate && !!validate(value))}
        />
      }
      header={<Header navigation={props.navigation} isBackArrow={true} title={title} />}
    >
      {header}
      <View style={styles.inputItemContainer}>
        <InputItem
          label={label}
          value={value}
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
