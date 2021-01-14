import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { CONST } from 'app/consts';
import { typography, palette } from 'app/styles';

import { AirdropWalletBalance } from './AirdropWalletBalance';

// move to models
interface AirdropWalletDetails {
  balance: number;
  name: string;
}

interface AirdropGoal {
  name: string;
  threshold: number;
}

// move to some config and add translations
const airdropGoals: AirdropGoal[] = [
  { threshold: 5, name: 'Shrimp' },
  { threshold: 25, name: 'Crab' },
  { threshold: 100, name: 'Shark' },
  { threshold: 1000, name: 'Whale' },
];

const readableOrder = ['first', 'second', 'third', 'fourth'];

interface Props {
  items: AirdropWalletDetails[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export class AirdropWalletsCarousel extends Component<Props> {
  carouselRef = React.createRef<any>();

  renderItem = ({ item }: { item: AirdropWalletDetails }) => {
    const unreachedGoals = airdropGoals.filter(goal => goal.threshold > item.balance);
    const nearestGoal = unreachedGoals.length > 0 ? unreachedGoals[0] : airdropGoals[airdropGoals.length - 1];
    const goalIndex = airdropGoals.findIndex(goal => goal.threshold === nearestGoal.threshold);

    const renderFooter = (nextGoal: AirdropGoal) => (
      <>
        <Text style={[typography.headline5, { textAlign: 'center' }]}>{`Your ${readableOrder[goalIndex]} goal:`}</Text>
        <Text
          style={[typography.body, { color: palette.textGrey, lineHeight: 19 }]}
        >{`Become a ${nextGoal.name}: ${nextGoal.threshold} ${CONST.preferredBalanceUnit}`}</Text>
      </>
    );

    return (
      <View style={styles.walletCard}>
        <AirdropWalletBalance
          balance={item.balance}
          walletName={item.name}
          threshold={nearestGoal.threshold}
          footer={renderFooter(nearestGoal)}
        />
      </View>
    );
  };

  snap = (index: number) => {
    this.carouselRef.current!.snapToItem(index, true);
  };

  render() {
    return (
      <View>
        <Carousel
          data={this.props.items}
          ref={this.carouselRef}
          renderItem={this.renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.82}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  walletCard: { alignItems: 'center' },
});
