import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { typography, palette } from 'app/styles';

import { RegisteredWalletAction } from './';

const i18n = require('../../../../loc');

type Props = {
  onActionClick: () => void;
};

export const CommunitySection: FC<Props> = ({ onActionClick }) => {
  return (
    <>
      <Text style={styles.header}>{i18n.airdrop.community.header}</Text>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{i18n.airdrop.community.name}</Text>
          <Text style={styles.description}>{i18n.airdrop.community.description}</Text>
        </View>
        <RegisteredWalletAction onActionClick={onActionClick} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    ...typography.overline,
    color: palette.textGrey,
    textAlign: 'left',
    marginBottom: 16,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 5,
  },
  name: {
    ...typography.headline5,
    marginBottom: 3,
  },
  description: {
    ...typography.overline,
    color: palette.textGrey,
    lineHeight: 14,
  },
});
