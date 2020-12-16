import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Header, ScreenTemplate, Button } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

export const ReceiveNotificationsConfirmationScreen = () => {
  const handleNoPress = () => null;
  const handleYesPress = () => null;

  return (
    <ScreenTemplate
      footer={
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.receiveNotificationsConfirmation.no}
            onPress={handleNoPress}
            type="outline"
            containerStyle={styles.noButton}
          />
          <Button
            title={i18n.receiveNotificationsConfirmation.yes}
            onPress={handleYesPress}
            containerStyle={styles.yesButton}
          />
        </View>
      }
      header={<Header isBackArrow title={i18n.receiveNotificationsConfirmation.header} />}
    >
      <Text style={styles.title}>{i18n.receiveNotificationsConfirmation.title}</Text>
      <Text style={styles.description}>
        {i18n.receiveNotificationsConfirmation.description}
        <Text style={styles.boldedText}>verylongname@email.com</Text>
      </Text>
      <Text style={[styles.description, styles.note]}>
        <Text style={styles.boldedText}>{i18n.receiveNotificationsConfirmation.noteFirst}</Text>
        {i18n.receiveNotificationsConfirmation.noteSecond}
      </Text>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.headline4, marginTop: 20, textAlign: 'center' },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 18,
  },
  note: {
    marginTop: 42,
  },
  boldedText: {
    ...typography.headline9,
    color: palette.textBlack,
  },
  buttonContainer: { flexDirection: 'row', width: '50%', marginBottom: 20 },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
