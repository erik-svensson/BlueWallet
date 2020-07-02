import React, { useState } from 'react';
import { View, StyleSheet, KeyboardType } from 'react-native';
// import { NavigationScreenProps } from 'react-navigation';
// import { useNavigationParam } from 'react-navigation-hooks';

import { Header, InputItem, Button, ScreenTemplate } from 'app/components';

const i18n = require('../../loc');

export interface EditTextProps {
  title: string;
  onSave: (value: string) => void;
  label: string;
  value?: string;
  validate?: (value: string) => string | undefined;
  keyboardType?: KeyboardType;
}

export const EditTextScreen = props => {
  const { params } = props.route;
  const label: string = params.label;
  const keyboardType: string = params.keyboardType || 'default';
  const header: React.ReactNode = params.header;
  const onSave: (value: string) => void = params.onSave;
  const validate: (value: string) => string | undefined = params.validate || null;
  const [value, setValue] = useState(params.value || '');

  const handlePressOnSaveButton = () => {
    onSave(value);
    props.navigation.pop();
  };

  return (
    <ScreenTemplate
      footer={
        <Button
          title={i18n._.save}
          onPress={handlePressOnSaveButton}
          disabled={!value || (!!validate && !!validate(value))}
        />
      }
      header={<Header navigation={props.navigation} isBackArrow={true} title={props.route.params.title} />}
    >
      {header}
      <View style={styles.inputItemContainer}>
        <InputItem
          label={label}
          value={value}
          setValue={setValue}
          autoFocus={true}
          error={value && !!validate && validate(value)}
          keyboardType={keyboardType as KeyboardType}
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
