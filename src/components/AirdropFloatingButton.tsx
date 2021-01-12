import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { icons } from 'app/assets';
import { Image } from 'app/components';
import { Route } from 'app/consts';

type Props = {
  // thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  navigation: StackNavigationProp<any, Route.Dashboard>;
  // TODO: airdropFinished: boolean;
};

export const AirdropFloatingButton: FC<Props> = ({ thankYouFlowCompleted, navigation }: Props) => {
  // useEffect(() => {
  //   if (navigation && !thankYouSeen) {
  //     navigation.navigate(Route.AirdropThankYou);
  //   }
  // }, [navigation, thankYouSeen]);

  const onButtonPress = () => {
    // if (airdropFinished) {
    //    navigation.navigate(Route.AirdropDashboard);
    // }
    if (!thankYouFlowCompleted) {
      navigation.navigate(Route.AirdropThankYou);
    }
    if (thankYouFlowCompleted) {
      navigation.navigate(Route.AirdropDashboard);
    }
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
