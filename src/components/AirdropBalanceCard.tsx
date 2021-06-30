import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { AirdropCarouselCardData } from 'app/consts';
import { typography, palette } from 'app/styles';

interface Props {
  data: AirdropCarouselCardData;
}

export const AirdropBalanceCard: FC<Props> = ({ data }) => (
  <View>
    <Text style={styles.header}>{data.header}</Text>
    <AnimatedCircularProgress
      size={155}
      width={8}
      fill={data.circleFillPercentage}
      tintColor={palette.textSecondary}
      backgroundColor={palette.lightGrey}
      lineCap="round"
      style={styles.circle}
    >
      {() => (
        <View>
          <Text style={styles.airdropBTCVBalance}>{data.circleInnerFirstLine}</Text>
          <Text style={styles.yourBalanceText}>{data.circleInnerSecondLine}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
    <View style={styles.footerContainer}>
      <Text style={styles.footerFirstLine}>{data.footerFirstLine}</Text>
      <Text style={styles.footerSecondLine}>{data.footerSecondLine}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  circle: {
    alignSelf: 'center',
  },
  airdropBTCVBalance: {
    ...typography.headline5,
    textAlign: 'center',
    color: palette.textSecondary,
    paddingRight: 10,
    paddingLeft: 10,
  },
  yourBalanceText: {
    fontSize: 11,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  header: {
    ...typography.headline10,
    textAlign: 'center',
    marginBottom: 13,
  },
  footerContainer: {
    marginTop: 11,
  },
  footerFirstLine: {
    ...typography.headline5,
    textAlign: 'center',
  },
  footerSecondLine: {
    ...typography.body,
    color: palette.textGrey,
    lineHeight: 19,
    textAlign: 'center',
  },
});
