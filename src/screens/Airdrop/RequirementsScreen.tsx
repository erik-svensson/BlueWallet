import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { BackHandler, Text, StyleSheet, NativeEventSubscription, View } from 'react-native';

import { ScreenTemplate, Button, Header } from 'app/components';
import { Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<any, Route.AirdropRequirements>;
}

export class AirdropRequirementsScreen extends Component<Props, {}> {
  onSoundsGreatTap = () => {
    // this.props.navigation.navigate(Route.Dashboard); WIP
  };

  render() {
    return (
      <ScreenTemplate
        header={<Header isBackArrow title={i18n.airdrop.title} />}
        footer={
          <Button
            testID="sounds-great"
            onPress={this.onSoundsGreatTap}
            style={styles.soundsGreatButton}
            title={i18n.airdrop.requirements.soundsGreat}
          />
        }
      >
        <Text style={styles.subtitle}>{i18n.airdrop.requirements.subtitle}</Text>
        <Text style={styles.description}>{i18n.airdrop.requirements.description}</Text>
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
  soundsGreatButton: { paddingLeft: 10, width: '100%' },
});
