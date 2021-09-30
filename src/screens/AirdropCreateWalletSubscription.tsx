import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, Button, Header, Loader, ShareComponent } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import { subscribeWallet, SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import * as airdropSelectors from 'app/state/airdrop/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

type Props = {
  route: RouteProp<RootStackParams, Route.AirdropCreateWalletSubscription>;
  navigation: StackNavigationProp<RootStackParams, Route.AirdropCreateWalletSubscription>;
  isLoading: boolean;
  subscribeWallet: SubscribeWalletActionCreator;
};

class AirdropCreateWalletSubscription extends Component<Props> {
  onYesPress = () => {
    const { navigation, route, subscribeWallet } = this.props;
    const { notificationsTurnedOn, parentRouteName, wallet } = route.params;
    const description = notificationsTurnedOn
      ? i18n.airdrop.createWalletSuccess.successWithNotifications
      : i18n.airdrop.createWalletSuccess.success;

    subscribeWallet(wallet, {
      onSuccess: () =>
        CreateMessage({
          title: i18n.contactDelete.success,
          description,
          type: MessageType.success,
          buttonProps: {
            title: i18n.formatString(i18n.airdrop.createWalletSuccess.successCompletedButton, {
              routeName: parentRouteName === Route.AirdropDashboard ? i18n.airdrop.title : i18n.wallets.dashboard.title,
            }),
            onPress: () =>
              parentRouteName === Route.AirdropDashboard
                ? navigation.navigate(Route.AirdropDashboard)
                : navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard }),
          },
          footerComponent: <ShareComponent />,
        }),
    });
  };

  onNoPress = () => {
    const { parentRouteName } = this.props.route.params;

    parentRouteName === Route.AirdropDashboard
      ? this.props.navigation.navigate(Route.AirdropDashboard)
      : this.props.navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
  };

  render() {
    const { isLoading } = this.props;

    return (
      <ScreenTemplate
        header={<Header title={i18n.airdrop.title} />}
        footer={
          <View style={styles.buttonsContainer}>
            <View style={styles.noButtonContainer}>
              <Button
                testID="airdrop-register-no"
                type="outline"
                onPress={this.onNoPress}
                title={i18n._.no}
                disabled={isLoading}
              />
            </View>
            <View style={styles.yesButtonContainer}>
              <Button testID="airdrop-register-yes" onPress={this.onYesPress} title={i18n._.yes} disabled={isLoading} />
            </View>
          </View>
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loader size={87} />
          </View>
        ) : (
          <>
            <Text style={styles.title} testID="airdrop-register-title">
              {i18n.airdrop.createWallet.title}
            </Text>
            <Text style={styles.description}>{i18n.airdrop.createWallet.doYouWantToTakePart}</Text>
          </>
        )}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: airdropSelectors.isLoading(state),
});

const mapDispatchToProps = {
  subscribeWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirdropCreateWalletSubscription);

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    textAlign: 'center',
    color: palette.textGrey,
    display: 'flex',
    flex: 1,
  },
  title: { ...typography.headline4, textAlign: 'center', marginBottom: 20 },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer: { display: 'flex', flexDirection: 'row', width: '100%' },
  noButtonContainer: { flex: 1, paddingRight: 25 },
  yesButtonContainer: { flex: 1, paddingLeft: 25 },
});
