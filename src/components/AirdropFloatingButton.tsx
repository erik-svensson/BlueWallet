import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
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

export const AirdropFloatingButton: FC<Props> = ({
  thankYouFlowCompleted,
  thankYouSeen,
  navigation,
  position,
}: Props) => {
  const isAfterAirdrop = useSelector(selectors.isAfterAirdrop);

  // TODO: this implementation doesn't work.
  // As discussed with Paweł, We have to merge PasswordNavigator with MainStackNavigator, otherwise it fails miserably.
  useEffect(() => {
    if (navigation && !thankYouSeen) {
      navigation.navigate(Route.AirdropThankYou);
    }
  }, [navigation, thankYouSeen]);

  const onButtonPress = () => {
    if (isAfterAirdrop) {
      return navigation.navigate(Route.AirdropDashboard);
    }
    if (!thankYouFlowCompleted) {
      return navigation.navigate(Route.AirdropThankYou);
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
