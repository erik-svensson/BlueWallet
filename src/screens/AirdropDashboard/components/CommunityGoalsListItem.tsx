import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import { icons } from 'app/assets';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

interface CommunityGoalsListItemProps {
  threshold: number;
  reward: string;
  currentUsersQuantity: number;
  previousThreshold: number;
}

export const CommunityGoalsListItem: FC<CommunityGoalsListItemProps> = props => {
  const { threshold, reward, currentUsersQuantity, previousThreshold } = props;

  const localUsersQuantity = currentUsersQuantity - previousThreshold;
  const localThreshold = threshold - previousThreshold;
  const locked = localUsersQuantity < 0;
  const progress = locked ? 0 : localUsersQuantity / localThreshold;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {locked && <icons.LockIconGrey width={10} height={13} style={styles.lockImage} />}
        <Text style={[styles.header, ...[locked ? [styles.lockedText] : []]]}>
          {i18n.formatString(i18n.airdrop.community.unlockToIncrease, {
            reward,
          })}
        </Text>
      </View>
      <ProgressBar
        borderWidth={0}
        unfilledColor={palette.lightGrey}
        color={palette.textSecondaryLight}
        progress={progress}
        width={null}
        height={10}
        borderRadius={20}
      />
      <Text style={styles.threshold}>
        {i18n.formatString(i18n.airdrop.community.thresholdUsers, {
          threshold,
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...typography.headline10,
  },
  lockImage: {
    height: 13,
    width: 10,
    marginRight: 7,
  },
  lockedText: {
    opacity: 0.5,
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    padding: 10,
    flexDirection: 'column',
  },
  threshold: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'right',
    marginTop: 5,
  },
});
