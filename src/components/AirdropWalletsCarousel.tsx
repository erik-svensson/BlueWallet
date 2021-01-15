import React, { Component } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { AirdropWalletDetails } from 'app/consts';

import { AirdropWalletBalanceCard } from './AirdropWalletBalanceCard';

interface Props {
  items: AirdropWalletDetails[];
  styles?: ViewStyle;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export class AirdropWalletsCarousel extends Component<Props> {
  render() {
    return (
      <Carousel
        containerCustomStyle={this.props.styles}
        data={this.props.items}
        renderItem={({ item }: { item: AirdropWalletDetails }) => <AirdropWalletBalanceCard walletDetails={item} />}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH * 0.56}
      />
    );
  }
}
