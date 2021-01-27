import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Loader } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

export const Loading: FC = () => {
  return (
    <>
      <Loader size={137} />
      <Text style={styles.boldDescription}>{i18n.airdrop.dashboard.loading1}</Text>
      <Text style={styles.description}>{i18n.airdrop.dashboard.loading2}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    ...typography.caption,
    textAlign: 'center',
    color: palette.textGrey,
    lineHeight: 19,
  },
  boldDescription: {
    ...typography.caption,
    textAlign: 'center',
    lineHeight: 19,
    fontWeight: 'bold',
  },
  airdropImage: {
    width: 189,
    height: 193,
    marginTop: 27.5,
    marginBottom: 20,
  },
});
