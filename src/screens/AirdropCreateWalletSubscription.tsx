import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import {
  ScreenTemplate,
  Button,
  Header,
  SocialShareFacebookButton,
  SocialShareTwitterButton,
  Loader,
} from 'app/components';
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

const shareReward = 0.01;
const maxReward = 0.02;

const ShareComponent = () => (
  <View style={styles.shareComponent}>
    <Text style={styles.shareDescription}>
      {i18n.formatString(i18n.airdrop.createWalletSuccess.shareIt, { rewardValue: shareReward })}
    </Text>
    <View style={styles.socialsContainer}>
      <View style={styles.facebookButtonContainer}>
        {/* TODO: fill share buttons content */}
        <SocialShareFacebookButton
          // if valid URL is not provided, facebook throws error :|
          shareOptions={{ url: 'http://www.medium.com', message: 'Waiting for Content', title: 'Waiting for content' }}
        />
      </View>
      <SocialShareTwitterButton
        // TODO: provide URL or leave as is. Otherwise (null) gets inserted at the end of message on twitter
        shareOptions={{ url: '', message: 'Waiting for Content', title: 'Waiting for content' }}
      />
    </View>
    <Text style={styles.maximumReward}>
      {i18n.formatString(i18n.airdrop.createWalletSuccess.maxReward, { rewardValue: maxReward })}
    </Text>
  </View>
);

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
            <Button
              testID="airdrop-register-no"
              type="outline"
              style={styles.noButton}
              onPress={this.onNoPress}
              title={i18n._.no}
              disabled={isLoading}
            />
            <Button
              testID="airdrop-register-yes"
              onPress={this.onYesPress}
              style={styles.yesButton}
              title={i18n._.yes}
              disabled={isLoading}
            />
          </View>
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loader size={87} />
          </View>
        ) : (
          <Text style={styles.description}>{i18n.airdrop.createWallet.doYouWantToTakePart}</Text>
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
  loadingContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
  shareComponent: {
    display: 'flex',
    flex: 1,
  },
  shareDescription: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  socialsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 8,
  },
  facebookButtonContainer: {
    marginRight: 23,
  },
  maximumReward: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 19,
    display: 'flex',
    flex: 1,
    marginTop: 19,
    marginBottom: 10,
  },
});
