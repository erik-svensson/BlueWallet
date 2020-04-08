import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Image } from './Image';
import { images } from 'assets';
import { typography, palette } from 'styles';

import { en } from 'locale';

interface Props {
  variant: string;
  onPress: () => void;
}

export const ListEmptyState = ({ variant, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{en.dashboard.noWallets}</Text>
      <Image source={images.dashboardNoWallet} style={styles.image} resizeMode="contain" />
      <Text style={styles.description}>
        {en.dashboard.noWalletsDesc1}
        <Text style={styles.link} onPress={onPress}>
          Click
        </Text>
        {en.dashboard.noWalletsDesc2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  title: { ...typography.headline4 },
  image: {
    height: 172,
    width: '100%',
    marginTop: 40,
    marginBottom: 32,
  },
  description: {
    ...typography.caption,
    textAlign: 'center',
    lineHeight: 19,
  },
  link: {
    ...typography.headline5,
    color: palette.textSecondary,
  },
});
