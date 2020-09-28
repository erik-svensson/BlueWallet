import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, Animated, PanResponder } from 'react-native';

import { WalletItem, GradientView } from 'app/components';
import { Wallet, RootStackParams, Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ActionSheet>;
  route: RouteProp<RootStackParams, Route.ActionSheet>;
}

const ANIMATED = {
  HIDDEN: -350,
  FULL_OPEN: -100,
  VISIBLE: -300,
};

export const ActionSheet = (props: Props) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const animationValue = new Animated.Value(0);

  // useEffect(() => {
  //   Animated.timing(animation, {
  //     toValue: 1,
  //     duration: 100,
  //     useNativeDriver: false,
  //   }).start();

  //   return () => {
  //     Animated.timing(animation, {
  //       toValue: 0,
  //       duration: 5,
  //       useNativeDriver: false,
  //     }).start();
  //   };
  // }, []);

  const pan = useRef(new Animated.ValueXY()).current;

  const animateMovement = toValue => {
    Animated.spring(animationValue, {
      toValue,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (_, gestureState) => {
        console.log('gestureState: ', gestureState.moveY);
        if (gestureState.moveY > 600) {
          animateMovement(0);
        } else {
          animateMovement(800);
        }
        pan.flattenOffset();
      },
    }),
  ).current;

  const backgorundColorIntrpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.transparent, palette.modalTransparent],
  });

  const onScroll = event => {
    console.log(event.nativeEvent.contentOffset.y);
  };

  const renderWalletItems = () => {
    const { wallets, selectedIndex, onPress } = props.route.params;

    return wallets.map((wallet: Wallet, index: number) => (
      <WalletItem
        key={`${wallet.secret}${wallet.label}`}
        variant={wallet.label === 'All wallets' ? GradientView.Variant.Secondary : GradientView.Variant.Primary}
        value={wallet.balance}
        unit="BTCV"
        name={wallet.label === 'All wallets' ? i18n.wallets.dashboard.allWallets : wallet.label}
        title={wallet.label === 'All wallets' ? 'AW' : wallet.label[0]}
        selected={index == selectedIndex}
        index={index}
        onPress={() => {
          props.navigation.goBack();
          onPress(index);
        }}
      />
    ));
  };
  console.log('pan', pan.getLayout());
  return (
    //{ backgroundColor: backgorundColorIntrpolation }]
    <ScrollView style={styles.modal} bounces={false}>
      <View style={styles.containerStyle}>
        <Animated.View style={[styles.breakLine, { bottom: animationValue }]} {...panResponder.panHandlers} />
        <Text style={styles.titleStyle}>{i18n.wallets.walletModal.wallets}</Text>
        <View style={styles.walletContainer}>{renderWalletItems()}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: { flex: 1, flexDirection: 'column-reverse' },
  containerStyle: {
    paddingHorizontal: 20,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: palette.white,
    borderRadius: 8,
  },
  titleStyle: {
    ...typography.headline4,
    textAlign: 'center',
  },
  walletContainer: {
    marginTop: 31,
  },
  breakLine: {
    marginBottom: 13,
    marginTop: 16,
    height: 3,
    width: 36,
    backgroundColor: palette.grey,
    alignSelf: 'center',
  },
});
