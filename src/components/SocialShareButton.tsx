import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Share from 'react-native-share';

import { icons } from 'app/assets';
import { Image } from 'app/components';

const shareOptions = {
  title: 'Share via',
  message: 'some message',
  url: 'https://www.google.com/',
  social: Share.Social.FACEBOOK,
};

export const SocialShareButton = () => {
  const share = () => {
    console.log('Clicked');
    Share.shareSingle(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <TouchableOpacity onPress={() => share()}>
      <Image style={styles.icon} source={icons.facebook} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
