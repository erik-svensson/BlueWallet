import React, { FC } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { AirdropWalletDetails } from 'app/consts';

import { AirdropWalletBalanceCard } from './AirdropWalletBalanceCard';

interface Props {
  items: AirdropWalletDetails[];
  styles?: ViewStyle;
  setRef?: (carouselRef: Carousel<AirdropWalletDetails>) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const AirdropWalletsCarousel: FC<Props> = ({ items, styles, setRef }) => (
  <Carousel
    ref={setRef}
    containerCustomStyle={styles}
    data={items}
    renderItem={({ item }: { item: AirdropWalletDetails }) => <AirdropWalletBalanceCard walletDetails={item} />}
    sliderWidth={SCREEN_WIDTH}
    itemWidth={SCREEN_WIDTH * 0.56}
  />
);
