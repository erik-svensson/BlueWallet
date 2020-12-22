/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/no-unescaped-entities */
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import {
  Button,
  CheckBox,
  EllipsisText,
  InputItem,
  LinearGradient,
  RadioButton,
  ScreenTemplate,
  Text,
} from 'app/components';
import { HEADER_HEIGHT } from 'app/components/Header';
import { RootStackParams, Route, MainCardStackNavigatorParams, ImportWalletType, Wallet } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';
import { createPin, createTxPassword, setIsTcAccepted } from 'app/state/authentication/actions';
import { importWallet } from 'app/state/wallets/actions';
import { getStatusBarHeight, typography, palette } from 'app/styles';

const i18n = require('../../loc');

const darkSlytherinColor = '#1a472a';
const lightSlytherinColor = '#2a623d';

const bloodColor = '#8A0303';

const chamberOfSecretsGradient = {
  colors: [darkSlytherinColor, lightSlytherinColor],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
};

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.ConfirmPin>
  >;
  createPin: (value: string, { onSuccess }: { onSuccess: () => void }) => void;
  createTxPassword: (value: string, { onSuccess }: { onSuccess: () => void }) => void;
  setIsTcAccepted: (value: boolean) => void;
  importWallet: (wallet: Wallet, { onSuccess }: { onSuccess: () => void }) => void;
  onButtonPress: () => void;
}

const ChamberOfSecrets = (props: Props) => {
  const { navigation, createPin, createTxPassword, setIsTcAccepted, onButtonPress } = props;

  const [addWallet, setAddWallet] = useState(false);
  const [walletOptions, setWalletOptions] = useState({
    type: 'Standard',
    name: 'BAD MOTHER FUCKER',
    seedPhrase:
      'innocent surge canoe iron nasty dinner aspect bar brand couch input embrace piano example panic champion aerobic debris search fly repeat sand nuclear tuition',
  });

  const defaultPin = '1234';
  const defaultTransactionPassword = 'qwertyui';

  const buttonLinearGradientProps = { colors: [...chamberOfSecretsGradient.colors].reverse() };

  const handleButtonPress = () => {
    // TODO: To implement an import feature here the whole logic must be extracted from ImportWalletScreen first.
    // addWallet && importWallet({})

    onButtonPress();
  };

  const onPressSkipTermsConditionsButton = () => {
    setIsTcAccepted(true);

    handleButtonPress();
  };

  const onPressSkipOnboardingButton = () => {
    setIsTcAccepted(true);

    createPin(defaultPin, {
      onSuccess: () => {
        return;
      },
    });

    createTxPassword(defaultTransactionPassword, {
      onSuccess: () => {
        navigation.navigate(Route.Dashboard);
      },
    });

    handleButtonPress();
  };

  const onWalletTypeSelect = (type: ImportWalletType) => setWalletOptions({ ...walletOptions, type });

  const onWalletNameChange = (name: string) => setWalletOptions({ ...walletOptions, name });

  const onSeedPhraseChange = (seedPhrase: string) => setWalletOptions({ ...walletOptions, seedPhrase });

  const renderHeader = () => (
    <LinearGradient {...chamberOfSecretsGradient} style={styles.headerContainer}>
      <EllipsisText style={styles.title}>🔥 Chamber Of Secrets 🔥</EllipsisText>
    </LinearGradient>
  );

  return (
    <ScreenTemplate noScroll header={renderHeader()}>
      <View style={styles.infoContainer}>
        <Text style={styles.quoteHeading}>
          "The Chamber of Secrets has been opened. Enemies of the heir... beware."
        </Text>
        <Text style={styles.disclaimerHeading}>
          No worries though, it's just a joke, you're not in danger. It's a secret developer room created for testing
          purposes. If you see it when you're not supposed to, please report it on GitHub or Telegram.
        </Text>
      </View>

      <Button
        testID="skip-terms-conditions-button"
        title="Skip Terms & Conditions"
        onPress={onPressSkipTermsConditionsButton}
        linearGradientProps={buttonLinearGradientProps}
        style={styles.buttonStyle}
      ></Button>

      <Button
        testID="skip-onboarding-button"
        title="Skip Onboarding"
        onPress={onPressSkipOnboardingButton}
        linearGradientProps={buttonLinearGradientProps}
        style={styles.buttonStyle}
      ></Button>

      <Button
        testID="close-chamber-button"
        title="Do nothing, just close it"
        onPress={() => handleButtonPress()}
        linearGradientProps={buttonLinearGradientProps}
        style={styles.buttonStyle}
      ></Button>

      <CheckBox
        containerStyle={styles.checkboxContainer}
        checked={addWallet}
        title="Create wallet?"
        onPress={() => setAddWallet(!addWallet)}
      />

      {addWallet && (
        <>
          <RadioButton
            testID="import-2-key-vault-radio"
            title={HDSegwitP2SHArWallet.typeReadable}
            value="2-Key Vault"
            checked={walletOptions.type === '2-Key Vault'}
            onPress={onWalletTypeSelect}
          />
          <RadioButton
            testID="import-3-key-vault-radio"
            title={HDSegwitP2SHAirWallet.typeReadable}
            value="3-Key Vault"
            checked={walletOptions.type === '3-Key Vault'}
            onPress={onWalletTypeSelect}
          />
          <RadioButton
            testID="import-standard-wallet-radio"
            title={i18n.wallets.add.legacyTitle}
            value="Standard"
            checked={walletOptions.type === 'Standard'}
            onPress={onWalletTypeSelect}
          />

          <InputItem
            testID="add-wallet-name-input"
            value={walletOptions.name}
            setValue={onWalletNameChange}
            label="Wallet name"
          />
          <InputItem
            testID="add-wallet-seed-phrase-input"
            multiline
            value={walletOptions.seedPhrase}
            setValue={onSeedPhraseChange}
            label="Seed phrase"
          />
        </>
      )}
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: getStatusBarHeight(),
    height: HEADER_HEIGHT + getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    ...typography.headline4,
    color: palette.white,
    paddingHorizontal: 40,
  },
  infoContainer: {
    alignItems: 'center',
  },
  quoteHeading: {
    ...typography.headline4,
    color: bloodColor,
    textAlign: 'center',
    paddingBottom: 10,
  },
  disclaimerHeading: {
    ...typography.headline7,
    textAlign: 'center',
    paddingBottom: 20,
  },
  buttonStyle: {
    height: 43,
    marginBottom: 15,
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: palette.background,
    marginLeft: 0,
    paddingLeft: 0,
  },
});

export default connect(null, { createPin, createTxPassword, setIsTcAccepted, importWallet })(ChamberOfSecrets);
