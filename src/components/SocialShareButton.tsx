import logger from 'app/../logger';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Share, { Options } from 'react-native-share';

import { Image } from 'app/components';

interface Props {
  source: number;
  shareOptions: Options & { social: Share.Social };
}

export const SocialShareButton: FC<Props> = ({ source, shareOptions }) => {
  const addPostToSocialMediaApp = async () => {
    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      const errorMsg = `SocialShareButton ${shareOptions.social} error: ${JSON.stringify(error)}`;

      logger.captureException(errorMsg);
    }
  };

  return (
    <TouchableOpacity style={styles.icon} onPress={addPostToSocialMediaApp}>
      <Image style={styles.icon} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
