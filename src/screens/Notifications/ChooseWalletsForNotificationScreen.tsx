import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Header, ScreenTemplate, Button, FlatButton, CheckBox } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams, PasswordNavigatorParams } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

type Item = any; // TODO will be changed to proper type when implementing logic

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    CompositeNavigationProp<
      StackNavigationProp<PasswordNavigatorParams, Route.ConfirmNotificationCode>,
      StackNavigationProp<MainCardStackNavigatorParams, Route.ChooseWalletsForNotification>
    >
  >;
  wallets: Item;
  route: RouteProp<MainCardStackNavigatorParams, Route.ChooseWalletsForNotification>;
}

interface State {
  wallets: any[];
}

export class ChooseWalletsForNotificationScreen extends PureComponent<Props, State> {
  state = {
    wallets: [],
  };

  onConfirm = () => {
    this.proceed();
  };
  onSkip = () => {
    this.proceed();
  };

  addWallet = (wallet: Item) => this.setState((state: State) => ({ wallets: [...state.wallets, wallet] }));

  removeWallet = (selectingWallet: Item) =>
    this.setState((state: State) => ({
      wallets: state.wallets.filter(wallet => wallet.id !== selectingWallet.id),
    }));

  checkWallet = (wallet: Item) => (this.isWalletChecked(wallet) ? this.removeWallet(wallet) : this.addWallet(wallet));

  checkAll = () => this.setState({ wallets: this.areAllWalletsChecked() ? [] : this.props.wallets });

  areAllWalletsChecked = () => this.props.wallets.length === this.state.wallets.length;

  isWalletChecked = (selectedWallet: any) => this.state.wallets.some((wallet: Item) => wallet.id === selectedWallet.id);

  renderItem = (item: any) => {
    return (
      <View style={styles.itemRow}>
        <View style={styles.row}>
          <CheckBox
            checked={this.isWalletChecked(item)}
            onPress={() => this.checkWallet(item)}
            containerStyle={styles.checkBox}
          />
          <View>
            <Text style={styles.walletName}>{item.name}</Text>
            <Text style={styles.caption}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}> {i18n.tabNavigator.wallets}</Text>
      <CheckBox checked={this.areAllWalletsChecked()} onPress={this.checkAll} containerStyle={styles.checkBox} />
    </View>
  );

  proceed = () => {
    const { address } = this.props.route.params;
    if (this.props?.route.params.onboarding) {
      this.props.navigation.navigate(Route.ConfirmNotificationCode, { email: address });
    } else {
      CreateMessage({
        title: i18n.message.success,
        description: i18n.notifications.emailAddedSuccessMessage,
        type: MessageType.success,
        buttonProps: {
          title: i18n.notifications.goToNotifications,
          onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
        },
      });
    }
  };
  render() {
    const { address } = this.props.route.params;
    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={
          <>
            <Button title={i18n._.confirm} onPress={this.onConfirm} />
            <FlatButton containerStyle={styles.skipButton} title={i18n._.skip} onPress={this.onSkip} />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.getNotification}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.chooseWalletsDescription}</Text>
        </View>
        <View style={styles.amountInput}>
          <Text style={styles.amount}>{address}</Text>
        </View>

        <FlatList
          data={this.props.wallets}
          renderItem={item => this.renderItem(item.item)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderListHeader()}
        />
      </ScreenTemplate>
    );
  }
}

// @ts-ignore TODO will be changed to proper type when implementing logic
ChooseWalletsForNotificationScreen.defaultProps = {
  wallets: [
    { id: '1', name: 'ex1@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '2', name: 'ex2@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '3', name: 'ex3@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '4', name: 'ex4@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '5', name: 'ex5@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '6', name: 'ex6@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '7', name: 'ex7@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '8', name: 'ex8@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '9', name: 'ex9@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '10', name: 'ex10@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '11', name: 'ex11@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '12', name: 'ex12@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
    { id: '13', name: 'ex13@example.com.pl', description: 'xxxxxxxxxxxxxxxxxx' },
  ],
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  infoDescription: {
    ...typography.caption,
    color: palette.textGrey,
    margin: 20,
    textAlign: 'center',
  },
  amountInput: { width: '100%', borderBottomColor: palette.grey, borderBottomWidth: 1, paddingBottom: 10 },
  amount: { ...typography.caption, color: palette.textGrey },
  skipButton: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  itemRow: {
    marginVertical: 8,
  },
  checkBox: {
    justifyContent: 'flex-start',
    padding: 0,
  },
  walletName: { ...typography.subtitle6 },
  caption: { ...typography.warning, color: palette.textGrey },
  listHeader: {
    marginTop: 24,
  },
  listHeaderTitle: {
    ...typography.overline,
    color: palette.textGrey,
    marginLeft: 7,
    marginBottom: 5,
  },
});
