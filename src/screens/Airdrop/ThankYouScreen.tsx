import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { BackHandler, Text, StyleSheet, NativeEventSubscription, View } from 'react-native';

import { ScreenTemplate, Button, Header } from 'app/components';
import { Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<any, Route.AirdropThankYou>;
}

export class AirdropThankYouScreen extends Component<Props, {}> {
  backHandler?: NativeEventSubscription;

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  navigateBack = () => this.props.navigation.navigate(Route.Dashboard);

  goToLearnMore = () => {
    this.props.navigation.navigate(Route.AirdropRequirements);
  };

  render() {
    return (
      <ScreenTemplate
        header={<Header isBackArrow title={i18n.airdrop.title} />}
        footer={
          <View style={styles.buttonsContainer}>
            <Button
              testID="cancel-button"
              type="outline"
              style={styles.iDontCareButton}
              onPress={this.navigateBack}
              title={i18n.airdrop.itIsAlive.iDontCare}
            />
            <Button
              testID="learn-more"
              onPress={this.goToLearnMore}
              style={styles.learnMoreButton}
              title={i18n.airdrop.itIsAlive.learnMore}
            />
          </View>
        }
      >
        <Text style={styles.subtitle}>{i18n.airdrop.itIsAlive.subtitle}</Text>
        <Text style={styles.description}>{i18n.airdrop.itIsAlive.description}</Text>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: palette.textGrey,
  },
  buttonsContainer: { flexDirection: 'row', width: '50%' },
  iDontCareButton: { paddingRight: 10, width: '100%' },
  learnMoreButton: { paddingLeft: 10, width: '100%' },
});
