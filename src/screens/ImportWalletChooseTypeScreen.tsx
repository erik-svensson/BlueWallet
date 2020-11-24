import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenTemplate, Text, Header, Button, RadioButton } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.ImportWalletChooseType>
  >;
}

export type ImportWalletType = '3-Key Vault' | '2-Key Vault' | 'Standard';

interface State {
  label: string;
  isLoading: boolean;
  selectedWallet: ImportWalletType;
}

export class ImportWalletChooseTypeScreen extends React.PureComponent<Props, State> {
  state: State = {
    label: '',
    isLoading: false,
    selectedWallet: '2-Key Vault',
  };

  navigateToImportWallet = () => {
    this.props.navigation.navigate(Route.ImportWallet, {
      walletType: this.state.selectedWallet,
    });
  };

  onSelect = (selectedWallet: ImportWalletType) => this.setState({ selectedWallet });

  render() {
    return (
      <ScreenTemplate
        footer={
          <>
            {this.state.isLoading && (
              <Text style={styles.isLoadingDescription}>{i18n.message.creatingWalletDescription}</Text>
            )}
            <Button loading={this.state.isLoading} onPress={this.navigateToImportWallet} title={i18n._.next} />
          </>
        }
        header={<Header isBackArrow title={i18n.wallets.importWallet.header} />}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{i18n.wallets.importWallet.title}</Text>
          <Text style={styles.subtitle}>{i18n.wallets.importWallet.chooseTypeDescription}</Text>
        </View>
        <>
          <RadioButton
            title={HDSegwitP2SHArWallet.typeReadable}
            subtitle={i18n.wallets.add.ar}
            value={'2-Key Vault'}
            checked={this.state.selectedWallet === '2-Key Vault'}
            onPress={this.onSelect}
          />
          <RadioButton
            title={HDSegwitP2SHAirWallet.typeReadable}
            subtitle={i18n.wallets.add.air}
            value={'3-Key Vault'}
            checked={this.state.selectedWallet === '3-Key Vault'}
            onPress={this.onSelect}
          />
          <RadioButton
            title={i18n.wallets.add.legacyTitle}
            subtitle={i18n.wallets.add.legacy}
            value={'Standard'}
            checked={this.state.selectedWallet === 'Standard'}
            onPress={this.onSelect}
          />
        </>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    ...typography.caption,
    color: palette.textGrey,
    paddingTop: 18,
    textAlign: 'center',
  },
  title: {
    ...typography.headline4,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 50,
  },
  isLoadingDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
    marginVertical: 10,
  },
  radioButton: {
    paddingStart: 0,
    paddingVertical: 8,
  },
  radioButtonContent: {
    paddingStart: 10,
    top: -3,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
  },
});
