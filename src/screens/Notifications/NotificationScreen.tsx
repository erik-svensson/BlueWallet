import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, ListItem, ScreenTemplate, InputItem } from 'app/components';
import { MainCardStackNavigatorParams, Route } from 'app/consts';
import { ApplicationState } from 'app/state';
import { updateAdvancedOptions, UpdateAdvancedOptionsAction } from 'app/state/appSettings/actions';
import { AppSettingsState } from 'app/state/appSettings/reducer';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

export class NotificationScreen extends Component {
  render() {
    return (
      <ScreenTemplate header={<Header isBackArrow={true} title={i18n.settings.notifications} />}>
        <Text style={styles.title}>{i18n.notifications.title}</Text>
        <Text style={styles.description}>{i18n.notifications.description}</Text>
        <InputItem value="kamil2912@gmail.com" editable={false} />
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    alignSelf: 'center',
    marginVertical: 18,
    marginTop: 40,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  listItemContainer: { paddingRight: 15 },
  divider: { width: '100%', height: 1, backgroundColor: palette.lightGrey, marginVertical: 20 },
});
