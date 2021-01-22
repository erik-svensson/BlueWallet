import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { images } from 'app/assets';
import { Image } from 'app/components';
import { Route, RootStackParams, AirdropWalletDetails } from 'app/consts';

interface Props {
  wallet: AirdropWalletDetails;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

export const RegisteredWalletAction: FC<Props> = ({ wallet, navigation }) => {
  const goToWalletDetails = (wallet: AirdropWalletDetails) => {
    // TODO: navigate to wallet details (not finished)
    navigation.navigate(Route.AirdropFinishedWalletDetails, { balance: wallet.balance, name: wallet.name });
  };

  return (
    <TouchableOpacity style={styles.arrowContainer} testID="forward-button" onPress={() => goToWalletDetails(wallet)}>
      <Image style={styles.image} source={images.forwardArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    height: 12,
    width: 7,
  },
  image: {
    width: 7,
    height: 12,
  },
});
