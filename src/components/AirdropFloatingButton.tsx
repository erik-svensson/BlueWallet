import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { icons } from 'app/assets';
import { Image } from 'app/components';
import { Route, RootStackParams, MainCardStackNavigatorParams } from 'app/consts';
import { isAfterAirdrop } from 'app/helpers/airdrop';

type Props = {
  thankYouFlowCompleted: boolean;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.Dashboard>
  >;
};

export const AirdropFloatingButton: FC<Props> = ({ thankYouFlowCompleted, navigation }: Props) => {
  // TODO: this implementation doesn't work.
  // As discussed with Paweł, We have to merge PasswordNavigator with MainStackNavigator, otherwise it fails miserably.
  // useEffect(() => {
  //   if (navigation && !thankYouSeen) {
  //     navigation.navigate(Route.AirdropThankYou);
  //   }
  // }, [navigation, thankYouSeen]);

  const onButtonPress = () => {
    if (isAfterAirdrop()) {
      return navigation.navigate(Route.AirdropDashboard);
    }
    if (!thankYouFlowCompleted) {
      return navigation.navigate(Route.AirdropThankYou);
    } else {
      return navigation.navigate(Route.AirdropDashboard);
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