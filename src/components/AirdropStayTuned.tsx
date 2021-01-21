import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { SocialShareFacebookButton, SocialShareTwitterButton } from 'app/components';
import { CONST } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

export const AirdropStayTuned: FC = () => (
  <View>
    <Text style={styles.firstLine}>
      {i18n.formatString(i18n.airdrop.finished.stayTuned, {
        period: CONST.nextAirdropPeriod,
      })}
    </Text>
    <Text style={styles.secondLine}>{i18n.airdrop.finished.shareIt}</Text>
    <View style={styles.socialsContainer}>
      <View style={styles.facebookButtonContainer}>
        {/* TODO: fill share buttons content */}
        <SocialShareFacebookButton shareOptions={{ message: 'Waiting for Content', title: 'Waiting for content' }} />
      </View>
      <SocialShareTwitterButton shareOptions={{ message: 'Waiting for Content', title: 'Waiting for content' }} />
    </View>
  </View>
);

export default AirdropStayTuned;

const styles = StyleSheet.create({
  firstLine: {
    ...typography.headline5,
    textAlign: 'center',
  },
  secondLine: {
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
});
