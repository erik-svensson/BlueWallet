import React, { Component } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { AirdropWalletDetails } from 'app/consts';

import { AirdropWalletsCarouselItem } from './AirdropWalletsCarouselItem';

interface Props {
  items: AirdropWalletDetails[];
  styles?: ViewStyle;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export class AirdropWalletsCarousel extends Component<Props> {
  carouselRef = React.createRef<any>();

  snap = (index: number) => {
    this.carouselRef.current!.snapToItem(index, true);
  };

  render() {
    return (
      <Carousel
        containerCustomStyle={this.props.styles}
        data={this.props.items}
        ref={this.carouselRef}
        renderItem={({ item }: { item: AirdropWalletDetails }) => <AirdropWalletsCarouselItem walletDetails={item} />}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH * 0.56}
      />
    );
  }
}
