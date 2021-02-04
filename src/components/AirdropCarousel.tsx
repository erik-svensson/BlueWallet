import React, { FC } from 'react';
import { Dimensions, ViewStyle, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { AirdropCarouselCardData } from 'app/consts';

import { AirdropBalanceCard } from './AirdropBalanceCard';

interface Props {
  items: AirdropCarouselCardData[];
  styles?: ViewStyle;
  setRef?: (carouselRef: Carousel<AirdropCarouselCardData>) => void;
  onItemSnap: (index: number) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const AirdropCarousel: FC<Props> = ({ items, styles, setRef, onItemSnap }) => (
  <Carousel
    ref={setRef}
    containerCustomStyle={styles}
    data={items}
    renderItem={({ item }: { item: AirdropCarouselCardData }) => (
      <View style={_styles.walletCard}>
        <AirdropBalanceCard data={item} />
      </View>
    )}
    sliderWidth={SCREEN_WIDTH}
    itemWidth={SCREEN_WIDTH * 0.56}
    onSnapToItem={onItemSnap}
  />
);

const _styles = StyleSheet.create({
  walletCard: { alignItems: 'center' },
});
