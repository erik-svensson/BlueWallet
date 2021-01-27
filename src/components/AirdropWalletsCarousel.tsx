import React, { FC } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Wallet } from 'app/consts';

import { AirdropWalletBalanceCard } from './AirdropWalletBalanceCard';

interface Props {
  items: Wallet[];
  styles?: ViewStyle;
  setRef?: (carouselRef: Carousel<{ balance: number; label: string }>) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const AirdropWalletsCarousel: FC<Props> = ({ items, styles, setRef }) => (
  <Carousel
    ref={setRef}
    containerCustomStyle={styles}
    data={items}
    renderItem={({ item }: { item: { balance: number; label: string } }) => <AirdropWalletBalanceCard data={item} />}
    sliderWidth={SCREEN_WIDTH}
    itemWidth={SCREEN_WIDTH * 0.56}
  />
);
