import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams } from 'app/consts';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.Confirm>;
  route: RouteProp<RootStackParams, Route.Confirm>;
}

export const ConfirmScreen = ({
  navigation,
  route: {
    params: { onConfirm, title, onBack, children },
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
      {children}
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
