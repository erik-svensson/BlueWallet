import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated, Easing, View } from 'react-native';

import { images } from 'app/assets';
import { ScreenTemplate } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

export const NoInternetConnectionScreen = () => {
  const animatedCircle = new Animated.Value(0);
  const transform = [{ rotate: animatedCircle.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }];

  useEffect(() => {
    animate();
  });

  const animate = () => {
    Animated.loop(
      Animated.timing(animatedCircle, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.connectionIssue.noInternetTitle}</Text>
        <Animated.Image source={images.loader} style={[styles.logo, { transform }]} resizeMode="contain" />
        <Text style={styles.description}>{i18n.connectionIssue.noInternetDescription}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default NoInternetConnectionScreen;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  logo: {
    height: 137,
    width: 137,
    textAlign: 'center',
  },
  title: { ...typography.headline4, textAlign: 'center', paddingBottom: 66 },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: palette.textGrey,
    paddingTop: 61,
  },
});
