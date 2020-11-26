import React, { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Animated } from 'react-native';

import { images, icons } from 'app/assets';
import { Image } from 'app/components';
import { Toast as IToast } from 'app/consts';
import { useInterval } from 'app/helpers/useInterval';
import { typography, palette } from 'app/styles';

export const Toast = ({ title, description, milisecondsAfterHide }: IToast) => {
  const [seconds, setSeconds] = useState(milisecondsAfterHide);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (seconds === milisecondsAfterHide) {
      fadeIn();
    } else if (seconds === 0) {
      fadeOut();
    }
  });

  useInterval(
    () => {
      setSeconds(seconds - 1000);
    },
    seconds > 0 ? 1000 : null,
  );

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onClose = () => {
    fadeOut();
  };

  return (
    <Animated.View style={[{ opacity: fadeAnim }, styles.container]}>
      <Image source={icons.warning} style={styles.warningIcon} />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableHighlight onPress={onClose} style={styles.closeImage}>
        <Image source={images.closeInverted} style={styles.closeImage} />
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  closeImage: {
    height: 24,
    width: 24,
  },
  warningIcon: {
    width: 32,
    height: 32,
  },
  title: { ...typography.headline4, marginBottom: 4 },
  description: {
    ...typography.body,
    color: palette.textGrey,
    marginBottom: 15,
  },
  container: {
    backgroundColor: palette.background,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 13,
    marginHorizontal: 8,
    elevation: 5,
    padding: 10,
  },
});
