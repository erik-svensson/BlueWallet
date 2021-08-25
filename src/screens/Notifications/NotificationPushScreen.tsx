import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, ListItem, EllipsisText, StyledSwitch } from 'app/components';
import { Route, RootStackParams, Wallet } from 'app/consts';
import { ApplicationState } from 'app/state';
import { updatePushnotificationsSetting as updatePushnotificationsSettingsAction } from 'app/state/appSettings/actions';
import { pushnotificationsEnabled } from 'app/state/appSettings/selectors';
import {
  CheckSubscriptionPushAction,
  checkSubscriptionPush as checkSubscriptionPushAction,
  unsubscribePushAllWallets as unsubscribePushAllWalletsAction,
  subscribePushAllWallets as subscribePushAllWalletsAction,
} from 'app/state/notifications/actions';
import { storedEmail } from 'app/state/notifications/selectors';
import { subscribedPushIds, wallets } from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.Notifications>;
  route: RouteProp<RootStackParams, Route.Notifications>;
  email: string;
  updatePushnotificationsSettings: (value: boolean) => void;
  unsubscribePushAllWallets: () => void;
  checkSubscriptionPush: (wallets: Wallet[]) => CheckSubscriptionPushAction;
  subscribedWalletsPush: string[];
  wallets: Wallet[];
  isPushnotificationsEnabled: boolean;
  subscribePushWallet: (wallet: Wallet[]) => void;
}
export class NotificationScreen extends Component<Props> {
  componentDidMount() {
    const { checkSubscriptionPush, wallets } = this.props;

    wallets.length && checkSubscriptionPush(wallets);
  }

  onSwitchPress = (item: Wallet) => {
    const { subscribedWalletsPush, subscribePushWallet, wallets } = this.props;
    //TODO:
    const selectedWallet = wallets.filter((wallet: Wallet) => wallet.id === item.id)[0];

    if (subscribedWalletsPush.includes(item.id)) {
      // TODO: unsuscribe
    } else {
      subscribePushWallet([selectedWallet]);
    }
  };

  renderItem = (item: Wallet) => {
    const { subscribedWalletsPush } = this.props;

    const isSubscribed = subscribedWalletsPush.includes(item.id);

    return (
      <View testID={`wallet-${item.label}-item`} style={styles.itemRow}>
        <View style={styles.row}>
          <View style={styles.col1}>
            <EllipsisText style={styles.walletName}>{item.label}</EllipsisText>
          </View>
          <View style={styles.col2}>
            <StyledSwitch onValueChange={() => this.onSwitchPress(item)} value={isSubscribed} disabled={false} />
          </View>
        </View>
        <Text style={styles.caption}>{item.getAddressForTransaction()}</Text>
      </View>
    );
  };

  handlePushnotificationsAllWalletChange = (value: boolean) => {
    this.props.updatePushnotificationsSettings(value);

    if (!value) {
      this.props.unsubscribePushAllWallets();
    } else {
      this.props.subscribePushWallet(this.props.wallets);
    }
  };

  handlePushnotificationsWalletChange = () => {};

  render() {
    const {
      wallets,
      isPushnotificationsEnabled = true,
      route: {
        params: { onBackArrow },
      },
    } = this.props;

    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} onBackArrow={onBackArrow} title={i18n.notifications.push.header} />}
        noScroll
        contentContainer={styles.screenTemplate}
      >
        <Text style={styles.title}>{i18n.notifications.push.title}</Text>
        <Text style={styles.description}>{i18n.notifications.push.description}</Text>
        <View style={styles.container}>
          <ListItem
            testID="pushnotification-settings-item"
            title={i18n.notifications.pushnotificationsSettings.title}
            switchTestID="pushnotification-switch"
            switchValue={isPushnotificationsEnabled}
            onSwitchValueChange={this.handlePushnotificationsAllWalletChange}
          />
          {!!wallets.length ? (
            <View style={styles.container}>
              <FlatList
                data={wallets}
                renderItem={item => this.renderItem(item.item)}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 0 }}
              />
            </View>
          ) : (
            // TODO: other text for empty wallet
            <Text style={styles.noSubscriptionDescription}>{i18n.notifications.noSubscriptionDescription}</Text>
          )}
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  email: storedEmail(state),
  subscribedWalletsPush: subscribedPushIds(state),
  wallets: wallets(state),
  isPushnotificationsEnabled: pushnotificationsEnabled(state),
});

const mapDispatchToProps = {
  checkSubscriptionPush: checkSubscriptionPushAction,
  updatePushnotificationsSettings: updatePushnotificationsSettingsAction,
  unsubscribePushAllWallets: unsubscribePushAllWalletsAction,
  subscribePushWallet: subscribePushAllWalletsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    alignSelf: 'center',
    marginVertical: 18,
    marginTop: 40,
  },
  screenTemplate: { flex: 1 },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  walletName: { ...typography.subtitle6 },
  caption: { ...typography.warning, color: palette.textGrey },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  itemRow: {
    marginVertical: 8,
  },
  noSubscriptionDescription: {
    ...typography.caption,
    color: palette.textGrey,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  container: {
    paddingTop: 40,
  },
  col1: { flexDirection: 'column', width: '60%' },
  col2: { flexDirection: 'column', width: '10%' },
});
