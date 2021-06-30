import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { AirdropGoal } from 'app/consts';
import { airdropCommunityGoals } from 'app/helpers/airdrop';

import { CommunityGoalsListItem } from './';

interface CommunityAchievementsListProps {
  usersQuantity: number;
}

export const CommunityAchievementsList: FC<CommunityAchievementsListProps> = ({ usersQuantity }) => {
  const getListGoals = (usersQuantity: number): AirdropGoal[] => {
    const currentGoal =
      airdropCommunityGoals.find(goal => goal.threshold > usersQuantity) ||
      airdropCommunityGoals[airdropCommunityGoals.length - 1];
    const currentGoalIndex = airdropCommunityGoals.map(goal => goal.threshold).indexOf(currentGoal.threshold);
    const futureGoals = airdropCommunityGoals.filter((goal, index) => index > currentGoalIndex);
    const wrappedNextGoal = futureGoals.length > 0 ? [futureGoals[0]] : [];
    const reachedGoals = airdropCommunityGoals.filter((goal, index) => index < currentGoalIndex);

    return [...reachedGoals, currentGoal, ...wrappedNextGoal];
  };

  const communityGoals = getListGoals(usersQuantity);

  return (
    <View style={styles.achievementsListContainer}>
      {communityGoals.map((goal, index) => (
        <CommunityGoalsListItem
          key={goal.threshold}
          threshold={goal.threshold}
          reward={goal.value}
          previousThreshold={index === 0 ? 0 : communityGoals[index - 1].threshold}
          currentUsersQuantity={usersQuantity || 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  achievementsListContainer: {
    flex: 1,
    width: '100%',
    marginTop: 16,
    marginBottom: 18,
  },
});
