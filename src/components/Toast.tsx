import React, { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Animated } from 'react-native';

import { images, icons } from 'app/assets';
import { Image } from 'app/components';
import { useInterval } from 'app/helpers/useInterval';
import { typography, palette } from 'app/styles';

export interface ToastProps {
  title: string;
  description: string;
  secondsAfterHide: number;
}

export const Toast = ({ title, description, secondsAfterHide }: ToastProps) => {
  const [seconds, setSeconds] = useState(secondsAfterHide);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (seconds === secondsAfterHide) {
      fadeIn();
    } else if (seconds === 0) {
      fadeOut();
    }
  });

  useInterval(
    () => {
      setSeconds(seconds - 1);
    },
    seconds > 0 ? 1000 : null,
  );

  const fadeIn = () => {
    // @ts-ignore
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  const fadeOut = () => {
    // @ts-ignore
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  const onClose = () => {
    fadeOut();
  };

  return (
    <Animated.View style={[{ opacity: fadeAnim }, styles.outerContainer]}>
      <View style={styles.container}>
        <Image source={icons.warningIcon} style={styles.warningIcon} />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableHighlight onPress={onClose} style={styles.closeImage}>
          <Image source={images.closeInverted} style={styles.closeImage} />
        </TouchableHighlight>
      </View>
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
  outerContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
  },
});
