import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { compose, range, map, reverse } from 'lodash/fp';
import React, { Component, GetDerivedStateFromProps } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';

import { Header, ScreenTemplate, Button, FlatButton, InputItem } from 'app/components';
import { Route, RootStackParams, CONST } from 'app/consts';
import { preventScreenshots, allowScreenshots } from 'app/services/ScreenshotsService';
import { palette, typography } from 'app/styles';

import { mnemonicToKeyPair, privateKeyToKeyPair } from '../../../utils/crypto';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.RecoverySeed>;
  route: RouteProp<RootStackParams, Route.RecoverySeed>;
}

interface State {
  mnemonic: string[];
  isLoading: boolean;
}

export class RecoverySeedScreen extends Component<Props, State> {
  state: State = {
    mnemonic: compose(
      map(() => ''),
      range(CONST.mnemonicWordsAmount),
    )(0),
    isLoading: false,
  };

  componentDidMount() {
    preventScreenshots();
  }

  componentWillUnmount() {
    allowScreenshots();
  }

  setWordInMnemonic = (word: string, index: number) => {
    const { mnemonic } = this.state;
    const newMnemonic = [...mnemonic];

    newMnemonic[index - 1] = word.trim().toLocaleLowerCase();
    this.setState({ mnemonic: newMnemonic });
  };

  static getDerivedStateFromProps: GetDerivedStateFromProps<Props, State> = (props: Props, state: State) => {
    if (props.route.params.mnemonic && !state.mnemonic[0]) {
      return { mnemonic: props.route.params?.mnemonic };
    }

    return null;
  };

  renderInputs = () => {
    const { mnemonic } = this.state;

    return compose(
      map((index: number) => (
        <InputItem
          testID={`cancel-seed-phrase-${index}-input`}
          key={index.toString()}
          label={`${index}.`}
          value={mnemonic[index - 1]}
          setValue={word => this.setWordInMnemonic(word, index)}
        />
      )),
      reverse,
      range(CONST.mnemonicWordsAmount),
    )(0);
  };

  canSubmit = () => {
    const { mnemonic, isLoading } = this.state;

    return mnemonic.every(word => word !== '') && !isLoading;
  };

  scanQRCode = () => {
    const {
      navigation,
      route: {
        params: { onSubmit },
      },
    } = this.props;

    return navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (privateKey: string) => {
        try {
          const keyPair = privateKeyToKeyPair(privateKey);

          onSubmit(keyPair);
        } catch (_) {
          Alert.alert(i18n.wallets.errors.invalidPrivateKey);
        }
      },
    });
  };

  submit = () => {
    const { mnemonic } = this.state;
    const { onSubmit } = this.props.route.params;

    this.setState(
      {
        isLoading: true,
      },
      () => {
        setTimeout(async () => {
          try {
            const keyPair = await mnemonicToKeyPair(mnemonic.join(' '));

            this.setState({ isLoading: false }, () => {
              onSubmit(keyPair, mnemonic);
            });
          } catch (e) {
            this.setState({ isLoading: false });

            if (e instanceof Error) {
              Alert.alert(e.message);
            }
          }
        });
      },
    );
  };

  render() {
    const { subtitle, buttonText, description, onBackArrow } = this.props.route.params;

    const { isLoading } = this.state;

    return (
      <ScreenTemplate
        testID="cancel-seed-phrase-screen"
        header={<Header onBackArrow={onBackArrow} isBackArrow title={i18n.send.recovery.recover} />}
        footer={
          <>
            <Button
              testID={'seed-phrase-cancel-button'}
              loading={isLoading}
              disabled={!this.canSubmit()}
              title={buttonText}
              onPress={this.submit}
            />
            <FlatButton
              containerStyle={styles.scanQRCodeButtonContainer}
              title={i18n.wallets.importWallet.scanQrCode}
              onPress={this.scanQRCode}
            />
          </>
        }
      >
        <View style={styles.inputItemContainer}>
          <Text style={styles.title}>{subtitle}</Text>
          <Text style={styles.subtitle}>{description}</Text>
          {this.renderInputs()}
        </View>
      </ScreenTemplate>
    );
  }
}

export default RecoverySeedScreen;

const styles = StyleSheet.create({
  scanQRCodeButtonContainer: {
    marginTop: 12,
  },
  inputItemContainer: {
    paddingTop: 16,
    width: '100%',
    flexGrow: 1,
  },
  title: {
    ...typography.headline4,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    color: palette.textGrey,
    paddingTop: 14,
    textAlign: 'center',
  },
});
