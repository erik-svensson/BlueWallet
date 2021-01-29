import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { icons } from 'app/assets';
import { ScreenTemplate, Button, Header } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { CONST } from 'app/consts/models';
import { getFormattedAirdropDate } from 'app/helpers/airdrop';
import { actions } from 'app/state/airdrop';
import { CompleteThankYouFlowActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface ActionProps {
  completeThankYouFlow: CompleteThankYouFlowActionCreator;
}

type Props = {
  navigation: StackNavigationProp<RootStackParams, Route.AirdropRequirements>;
} & ActionProps;

class AirdropOnboardingScreen extends Component<Props> {
  onYesPress = () => {
    // register wallet to airdrop
    // navigate to success screen and pass SOURCE
    // this.props.navigation.navigate(Route.AirdropDashboard);
  };

  onNoPress = () => {
    this.props.navigation.navigate(Route.AirdropDashboard);
  };

  render() {
    return (
      <ScreenTemplate
        header={<Header isBackArrow title={i18n.airdrop.title} />}
        footer={
          <View style={styles.buttonsContainer}>
            <Button
              testID="airdrop-register-no"
              type="outline"
              style={styles.noButton}
              onPress={this.onNoPress}
              title={i18n._.no}
            />
            <Button
              testID="airdrop-register-yes"
              onPress={this.onYesPress}
              style={styles.yesButton}
              title={i18n._.yes}
            />
          </View>
        }
      >
        <Text style={styles.description}>{i18n.formatString(i18n.airdrop.onboarding.doYouWantToTakePart)}</Text>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps: ActionProps = {
  completeThankYouFlow: actions.completeThankYouFlow,
};

export default connect(null, mapDispatchToProps)(AirdropOnboardingScreen);

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    textAlign: 'center',
    color: palette.textGrey,
  },
  buttonsContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
