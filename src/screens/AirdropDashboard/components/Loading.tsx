import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Loader } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

export const Loading: FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <Loader size={137} />
      <Text style={styles.boldDescription}>{i18n.airdrop.dashboard.loading1}</Text>
      <Text style={styles.description}>{i18n.airdrop.dashboard.loading2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    ...typography.caption,
    textAlign: 'center',
    color: palette.textGrey,
    lineHeight: 19,
  },
  boldDescription: {
    ...typography.caption,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 19,
    fontWeight: 'bold',
  },
});
