import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SocialShareFacebookButton, SocialShareTwitterButton } from 'app/components';
import { palette, typography } from 'app/styles';

const shareReward = 0.1;
const maxReward = 0.2;

const i18n = require('../../loc');

export const ShareComponent = () => {
  return (
    <View style={styles.shareComponent}>
      <Text style={styles.shareDescription}>
        {i18n.formatString(i18n.airdrop.createWalletSuccess.shareIt, { rewardValue: shareReward })}
      </Text>
      <View style={styles.socialsContainer}>
        <View style={styles.facebookButtonContainer}>
          {/* TODO: fill share buttons content */}
          <SocialShareFacebookButton
            // if valid URL is not provided, facebook throws error :|
            shareOptions={{
              url: 'http://www.medium.com',
              message: 'Waiting for Content',
              title: 'Waiting for content',
            }}
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
};

const styles = StyleSheet.create({
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
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
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
    marginTop: 5,
    marginBottom: 10,
  },
});
