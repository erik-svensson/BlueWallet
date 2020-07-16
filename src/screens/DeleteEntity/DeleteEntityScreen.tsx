import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { useNavigationParam } from 'react-navigation-hooks';

import { Button, Header, ScreenTemplate } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

type Props = NavigationInjectedProps;

export const DeleteEntityScreen: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const onConfirm = useNavigationParam('onConfirm');
  const name = useNavigationParam('name');
  const subtitle = useNavigationParam('subtitle');

  return (
    <ScreenTemplate
      footer={
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.wallets.deleteWallet.no}
            onPress={() => navigation.goBack()}
            type="outline"
            containerStyle={styles.noButton}
          />
          <Button title={i18n.wallets.deleteWallet.yes} onPress={() => onConfirm()} containerStyle={styles.yesButton} />
        </View>
      }
    >
      <Text style={styles.title}>{subtitle}</Text>
      <Text style={styles.description}>
        {i18n.wallets.deleteWallet.description1} {name}
        {i18n.wallets.deleteWallet.description2}
      </Text>
    </ScreenTemplate>
  );
};

// @ts-ignore
DeleteEntityScreen.navigationOptions = (props: NavigationScreenProps) => {
  const { navigation } = props;
  const title = navigation.getParam('title');
  return {
    header: <Header title={title} />,
  };
};

export default DeleteEntityScreen;

const styles = StyleSheet.create({
  title: { ...typography.headline4, marginTop: 16, textAlign: 'center' },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    marginTop: 18,
  },
  buttonContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
