import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { icons } from 'app/assets';
import { Image } from 'app/components';
import { Route } from 'app/consts';
import { NavigationService } from 'app/services';

type Props = {
  thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  // TODO: airdropFinished: boolean;
};

export const AirdropFloatingButton: FC<Props> = ({ thankYouSeen, thankYouFlowCompleted }: Props) => {
  useEffect(() => {
    if (!thankYouSeen) {
      NavigationService.navigate(Route.AirdropThankYou);
    }
  }, [thankYouSeen]);

  const onButtonPress = () => {
    if (!thankYouFlowCompleted) {
      NavigationService.navigate(Route.AirdropThankYou);
    }
    if (thankYouFlowCompleted) {
      // TODO: airdrop dashboard
      // NavigationService.navigate(Route.AirdropDashboard)
    }
    // if (airdropFinished) {
    // TODO: redirect to airdrop finished screen or dashboard if we decide to implement finished state there
    // }
  };

  return (
    <TouchableOpacity style={styles.clearButton} onPress={onButtonPress}>
      <Image source={icons.airdropFloating} style={styles.airdropIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    height: 66,
    width: 66,
    position: 'absolute',
    bottom: -10,
    right: 2,
  },
  airdropIcon: {
    width: 66,
    height: 66,
  },
});
