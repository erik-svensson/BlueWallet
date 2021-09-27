import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { SocialShareFacebookButton, SocialShareTwitterButton } from 'app/components';
import { CONST } from 'app/consts';
import { selectors } from 'app/state/airdrop';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

export const AirdropStayTuned: FC = () => {
  const socialLinks = useSelector(selectors.socialLinks);

  return (
    <View style={styles.container}>
      <Text style={styles.firstLine}>
        {i18n.formatString(i18n.airdrop.finished.stayTuned, {
          period: CONST.nextAirdropPeriod,
        })}
      </Text>
      <Text style={styles.secondLine}>{i18n.airdrop.finished.shareIt}</Text>
      <View style={styles.socialsContainer}>
        <View style={styles.facebookButtonContainer}>
          {/* TODO: fill share buttons content */}
          <SocialShareFacebookButton
            // if valid URL is not provided at all, facebook throws error :|. If it s empty string, facebook asks for URL during sharing process :| [2]
            shareOptions={{
              url: socialLinks.facebook,
              message: 'Waiting for Content',
              title: 'Waiting for content',
            }}
          />
        </View>
        <SocialShareTwitterButton
          // TODO: provide URL or leave as is. If url param is missing, '(null)' gets inserted at the end of message
          shareOptions={{ url: socialLinks.twitter, message: 'Waiting for Content', title: 'Waiting for content' }}
        />
      </View>
    </View>
  );
};

export default AirdropStayTuned;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
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
