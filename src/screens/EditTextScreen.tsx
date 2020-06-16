import React, { useState } from 'react';
import { View, StyleSheet, KeyboardType } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { useNavigationParam } from 'react-navigation-hooks';

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

export const EditTextScreen = (props: NavigationScreenProps) => {
  const label: string = useNavigationParam('label');
  const keyboardType: string = useNavigationParam('keyboardType') || 'default';
  const header: React.ReactNode = useNavigationParam('header');
  const onSave: (value: string) => void = useNavigationParam('onSave');
  const validate: (value: string) => string | undefined = useNavigationParam('validate') || null;
  const [value, setValue] = useState(useNavigationParam('value') || '');

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

EditTextScreen.navigationOptions = (props: NavigationScreenProps) => ({
  header: (
    <View>
      <Header navigation={props.navigation} isBackArrow={true} title={props.navigation.getParam('title')} />
    </View>
  ),
});

const styles = StyleSheet.create({
  inputItemContainer: {
    paddingTop: 20,
    width: '100%',
  },
});
