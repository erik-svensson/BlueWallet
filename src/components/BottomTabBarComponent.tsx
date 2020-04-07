import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { StyleSheet } from 'react-native';

import { palette } from 'styles';
import { GradientView, GradientVariants } from './GradientView';

export const BottomTabBarComponent = (props: any) => {
  return (
    <GradientView variant={GradientVariants.main}>
      <BottomTabBar {...props} style={styles.tabBar} />
    </GradientView>
  );
};

const styles = StyleSheet.create({
  tabBar: { backgroundColor: palette.transparent },
});
