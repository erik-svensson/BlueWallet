import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, Animated, PanResponder } from 'react-native';

import { WalletItem, GradientView } from 'app/components';
import { Wallet, RootStackParams, Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const TOP_POSITION = -SCREEN_HEIGHT / 2;
const CLOSE_POSITION = SCREEN_HEIGHT / 4;
const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ActionSheet>;
  route: RouteProp<RootStackParams, Route.ActionSheet>;
}

export const ActionSheet = (props: Props) => {
  const panResponderValue = new Animated.ValueXY();
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    open();
  });

  const springAnimation = (toYValue: number, tension?: number) =>
    Animated.spring(panResponderValue, {
      toValue: { x: 0, y: toYValue },
      tension: tension || 0,
      useNativeDriver: true,
    }).start();

  const timingAnimation = (toValue: number) =>
    Animated.timing(animatedValue, { toValue: 1, duration: toValue, useNativeDriver: false }).start();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < 0) return;
      panResponderValue.setValue({ x: 0, y: TOP_POSITION + gestureState.dy });
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > CLOSE_POSITION) {
        close();
      } else {
        springAnimation(TOP_POSITION, 100);
      }
    },
  });

  const open = () => {
    timingAnimation(1);
    springAnimation(TOP_POSITION, 30);
  };

  const close = () => {
    timingAnimation(0);
    springAnimation(0);

    props.navigation.popToTop();
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
          close();
          onPress(index);
        }}
      />
    ));
  };
  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.transparent, palette.modalTransparent],
  });

  return (
    <Animated.View style={[styles.modal, { backgroundColor: animatedBackgroundColor }]}>
      <TouchableOpacity style={styles.closeBackground} onPress={close} />
      <Animated.View
        style={[
          styles.containerStyle,
          {
            transform: [{ translateY: panResponderValue.y }],
          },
        ]}
      >
        <View {...panResponder.panHandlers}>
          <View style={styles.breakLine} />
          <Text style={styles.titleStyle}>{i18n.wallets.walletModal.wallets}</Text>
        </View>
        <ScrollView bounces={false} style={styles.walletContainer}>
          {renderWalletItems()}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  closeBackground: {
    flex: 1,
  },
  containerStyle: {
    position: 'absolute',
    width: '100%',
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT / 2 + 40,
    backgroundColor: palette.white,
    borderRadius: 8,
  },
  titleStyle: {
    ...typography.headline4,
    textAlign: 'center',
  },
  walletContainer: {
    paddingHorizontal: 20,
    marginTop: 31,
    marginBottom: 50,
    flex: 1,
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
