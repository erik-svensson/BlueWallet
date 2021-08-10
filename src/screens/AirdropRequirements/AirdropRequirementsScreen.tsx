import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { icons } from 'app/assets';
import { ScreenTemplate, Button, Header } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { CONST, DateType } from 'app/consts/models';
import { ApplicationState } from 'app/state';
import { actions, selectors } from 'app/state/airdrop';
import { CompleteThankYouFlowActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface ActionProps {
  completeThankYouFlow: CompleteThankYouFlowActionCreator;
}

type Props = {
  navigation: StackNavigationProp<RootStackParams, Route.AirdropRequirements>;
  getFormattedAirdropDate: string | DateType;
} & ActionProps;

class AirdropRequirementsScreen extends Component<Props> {
  onSoundsGreatPress = () => {
    this.props.completeThankYouFlow();

    this.props.navigation.navigate(Route.AirdropDashboard);
  };

  onTermsConditionsPress = () => {
    this.props.navigation.navigate(Route.AirdropTermsAndConditions);
  };

  render() {
    const { getFormattedAirdropDate } = this.props;

    return (
      <ScreenTemplate
        header={<Header isBackArrow title={i18n.airdrop.title} />}
        footer={
          <>
            <View style={styles.soundsGreatButtonContainer}>
              <Button
                testID="sounds-great"
                onPress={this.onSoundsGreatPress}
                title={i18n.airdrop.requirements.soundsGreat}
              />
            </View>
            <View style={styles.termsAndConditions}>
              <Text style={styles.description}>{i18n.airdrop.requirements.termsAndConditions.read}&nbsp;</Text>
              <TouchableOpacity onPress={this.onTermsConditionsPress}>
                <Text style={styles.termsText}>{i18n.airdrop.requirements.termsAndConditions.termsAndConditions}</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.airdrop.requirements.subtitle}</Text>
        <Text style={styles.description}>
          {i18n.formatString(i18n.airdrop.requirements.description, {
            airdropTotalDollarsToShare: CONST.airdropTotalDollarsToShare,
          })}
        </Text>
        <View>
          <Text style={styles.listHeader}>{i18n.airdrop.requirements.listHeader}</Text>
          <View style={styles.listItem}>
            <Image source={icons.roundTick} style={styles.image} />
            <Text style={styles.listText}>{i18n.airdrop.requirements.points[0]}</Text>
          </View>
          <View style={styles.listItem}>
            <Image source={icons.roundTick} style={styles.image} />
            <Text style={styles.listText}>
              {i18n.formatString(i18n.airdrop.requirements.points[1], {
                airdropMinimumBTCVRequired: CONST.airdropMinimumBTCVRequired,
              })}
            </Text>
          </View>
        </View>
        <View style={styles.dateInfoContainer}>
          <Text style={styles.description}>{i18n.airdrop.dateOfAirdrop}&nbsp;</Text>
          <Text style={styles.date}>{getFormattedAirdropDate}</Text>
        </View>
        <Text style={styles.explanation}>{i18n.airdrop.requirements.rewardExplanation}</Text>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  getFormattedAirdropDate: selectors.getFormattedAirdropDate(state),
});

const mapDispatchToProps: ActionProps = {
  completeThankYouFlow: actions.completeThankYouFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirdropRequirementsScreen);

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
  listHeader: {
    marginTop: 35,
    marginBottom: 12,
    ...typography.headline5,
    textAlign: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
    paddingLeft: 8.5,
  },
  listText: {
    ...typography.body,
    color: palette.textGrey,
  },
  image: {
    width: 19,
    height: 19,
    marginRight: 6,
  },
  dateInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  date: {
    color: palette.textGrey,
    ...typography.headline5,
  },
  explanation: {
    fontSize: 11,
    color: palette.textGrey,
    marginBottom: 23,
    textAlign: 'center',
    width: '100%',
    lineHeight: 16,
  },
  soundsGreatButtonContainer: { paddingLeft: 10, width: '100%', marginBottom: 12 },
  termsAndConditions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  termsText: {
    ...typography.headline5,
    color: palette.secondary,
    marginLeft: 1,
  },
});
