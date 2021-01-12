import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, Button, Header } from 'app/components';
import { Route, MainCardStackNavigatorParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { actions, selectors } from 'app/state/airdrop';
import { ThankYouSeenAction } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface MapStateProps {
  thankYouSeen: boolean;
}

interface ActionProps {
  markThankYouSeen: () => ThankYouSeenAction;
}

type Props = {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.AirdropThankYou>;
} & MapStateProps &
  ActionProps;

class AirdropThankYouScreen extends Component<Props> {
  componentDidMount() {
    const { thankYouSeen, markThankYouSeen } = this.props;

    if (!thankYouSeen) {
      markThankYouSeen();
    }
  }

  navigateBack = () => this.props.navigation.pop();

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

const mapStateToProps = (state: ApplicationState): MapStateProps => ({
  thankYouSeen: selectors.thankYouSeen(state),
});

const mapDispatchToProps: ActionProps = {
  markThankYouSeen: actions.markThankYouSeen,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirdropThankYouScreen);

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
