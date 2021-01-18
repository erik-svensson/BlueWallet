import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button, Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.Entity>;
  route: RouteProp<MainCardStackNavigatorParams, Route.Entity>;
}
export const EntityScreen = ({
  navigation,
  route: {
    params: { onConfirm, description, subtitle, title, note, onBack },
  },
}: Props) => {
  const [clicked, setClicked] = useState(false);

  const onYesPress = (callback: () => void) => {
    setClicked(true);
    callback();
  };

  const onNoPress = () => {
    onBack ? onBack() : navigation.goBack();
  };

  return (
    <ScreenTemplate
      footer={
        <View style={styles.buttonContainer}>
          <Button
            testID="cancel-button"
            title={i18n.wallets.deleteWallet.no}
            onPress={onNoPress}
            disabled={clicked}
            type="outline"
            containerStyle={styles.noButton}
          />
          <Button
            testID="confirm-button"
            title={i18n.wallets.deleteWallet.yes}
            disabled={clicked}
            onPress={() => onYesPress(onConfirm)}
            containerStyle={styles.yesButton}
          />
        </View>
      }
      header={<Header isBackArrow title={title} />}
    >
      <Text style={styles.title}>{subtitle}</Text>
      {typeof description === 'string' ? <Text style={styles.description}>{description}</Text> : description}
      {!!note && (
        <Text style={[styles.description, styles.note]}>
          <Text style={styles.boldedText}>{i18n.notifications.noteFirst}</Text>
          {note}
        </Text>
      )}
    </ScreenTemplate>
  );
};

export default EntityScreen;

const styles = StyleSheet.create({
  title: { ...typography.headline4, marginTop: 16, textAlign: 'center' },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    marginTop: 18,
  },
  note: {
    marginTop: 42,
  },
  boldedText: {
    ...typography.headline9,
    color: palette.textBlack,
  },
  buttonContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
