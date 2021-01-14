import React, { FC } from 'react';
import Share, { Options } from 'react-native-share';

import { icons } from 'app/assets';
import { SocialShareButton } from 'app/components';

interface Props {
  shareOptions: Options;
}

export const SocialShareTwitterButton: FC<Props> = ({ shareOptions }) => {
  return <SocialShareButton source={icons.twitter} shareOptions={{ ...shareOptions, social: Share.Social.TWITTER }} />;
};
