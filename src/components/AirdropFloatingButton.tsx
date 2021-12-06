import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { icons } from 'app/assets';
import { Image } from 'app/components';
import { Route, RootStackParams, MainTabNavigatorParams } from 'app/consts';
import { selectors } from 'app/state/airdrop';

type Props = {
  thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  position: boolean;
  navigation: CompositeNavigationProp<
    StackNavigationProp<MainTabNavigatorParams, Route.Settings>,
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>
  >;
};

export const AirdropFloatingButton: FC<Props> = ({ navigation, position }: Props) => {
  const isAfterAirdrop = useSelector(selectors.isAfterAirdrop);

  const onButtonPress = () => {
    if (isAfterAirdrop) {
      return navigation.navigate(Route.AirdropDashboard);
    } else {
      return navigation.navigate(Route.AirdropDashboard);
    }
  };

  return (
    <TouchableOpacity style={[styles.clearButton, { bottom: position ? 120 : 0 }]} onPress={onButtonPress}>
      <Image source={icons.airdropFloating} style={styles.airdropIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    height: 66,
    width: 66,
    position: 'absolute',
    right: 2,
    zIndex: 10,
  },
  airdropIcon: {
    width: 66,
    height: 66,
  },
});
