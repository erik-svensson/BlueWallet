import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { icons } from 'app/assets';
import { ScreenTemplate, Header, Image } from 'app/components';
import { Route, MainCardStackNavigatorParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { updateSelectedLanguage } from 'app/state/appSettings/actions';
import { typography } from 'app/styles';

import { GlobalContext } from '../../../App';

const i18n = require('../../../loc');

interface Language {
  label: string;
  value: string;
}

interface LanguageItemProps {
  selectedLanguage: Language;
  selectedLanguageValue: string;
  onLanguageSelect: (value: string) => void;
}

interface SelectLanguageScreenProps {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.SelectLanguage>;
}

const LanguageItem = ({ selectedLanguage, selectedLanguageValue, onLanguageSelect }: LanguageItemProps) => {
  const handleLanguageSelect = () => onLanguageSelect(selectedLanguage.value);
  return (
    <TouchableOpacity key={selectedLanguage.value} onPress={handleLanguageSelect} style={styles.langaugeItemContainer}>
      <Text style={styles.languageItem}>{selectedLanguage.label}</Text>
      {selectedLanguage.value === selectedLanguageValue && (
        <View style={styles.successImageContainer}>
          <Image source={icons.success} style={styles.successImage} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export const SelectLanguageScreen = (props: SelectLanguageScreenProps) => {
  const { language } = useSelector((state: ApplicationState) => ({
    language: state.appSettings.language,
  }));
  const dispatch = useDispatch();

  const availableLanguages: Language[] = [
    { label: 'English (EN)', value: 'en' },
    { label: '中文 (ZH)', value: 'zh' },
    { label: 'Español (ES)', value: 'es' },
    { label: 'Indonesian (ID)', value: 'id' },
    { label: '日本語 (JP)', value: 'ja' },
    { label: '한국어 (KO)', value: 'ko' },
    { label: 'Português (PT)', value: 'pt' },
    { label: 'Tiếng (Việt)', value: 'vi' },
    { label: 'Türkçe (TR)', value: 'tr' },
  ];

  const onLanguageSelect = (value: string, changeLanguage: Function) => {
    Alert.alert(
      i18n.selectLanguage.confirmation,
      i18n.selectLanguage.alertDescription,
      [
        {
          text: i18n.selectLanguage.confirm,
          onPress: async () => {
            await i18n.saveLanguage(value);
            dispatch(updateSelectedLanguage(value));
            changeLanguage(value);
          },
        },
        {
          text: i18n.selectLanguage.cancel,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <GlobalContext.Consumer>
      {({ changeLanguage, lang }) => (
        <ScreenTemplate
          header={<Header isBackArrow={true} navigation={props.navigation} title={i18n.selectLanguage.header} />}
        >
          {availableLanguages.map(item => (
            <LanguageItem
              selectedLanguage={item}
              selectedLanguageValue={language}
              onLanguageSelect={(val: string) => onLanguageSelect(val, changeLanguage)}
              key={item.value}
            />
          ))}
        </ScreenTemplate>
      )}
    </GlobalContext.Consumer>
  );
};

const styles = StyleSheet.create({
  languageItem: {
    ...typography.caption,
    width: '100%',
  },
  langaugeItemContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  successImageContainer: {
    width: 21,
    height: 21,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  successImage: {
    width: 15,
    height: 11,
  },
});
