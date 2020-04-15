import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, ScrollViewProps } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import { Image, GradientView, StyledText } from 'components';
import { typography, palette } from 'styles';
import { en } from 'locale';
import { images } from 'assets';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.82;
const ITEM_HEIGHT = ITEM_WIDTH * 0.63;
export class WalletsCarousel extends Component {
  carouselRef = React.createRef<Carousel<any> & CarouselStatic<any> & ScrollViewProps>();

  renderItem({ item, index }) {
    console.log('item', item);
    return (
      <GradientView style={styles.itemContainer} variant={GradientView.Variant.Primary}>
        <>
          <Image source={images.coinLogoInCircle} style={styles.iconInCircle} resizeMode="contain" />
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.walletType}>{item.label}</Text>
              <StyledText title="Edit" onPress={() => {}} />
            </View>

            <Text style={styles.balance}>{`2.12542532 ${item.preferredBalanceUnit}`}</Text>
            <View>
              <Text style={styles.latestTransactionTitle}>{en.wallet.latest}</Text>
              <Text style={styles.latestTransaction}>{item.transactions[0] || en.wallet.none}</Text>
            </View>
          </View>
        </>
      </GradientView>
    );
  }

  render() {
    return (
      <Carousel
        ref={this.carouselRef as any}
        removeClippedSubviews={false}
        data={this.props.data}
        renderItem={this.renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH * 0.82}
        onSnapToItem={item => this.props.onSnapItem(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT,
    borderRadius: 10,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletType: {
    ...typography.headline7,
    color: palette.white,
  },
  balance: {
    ...typography.headline3,
    color: palette.white,
  },
  latestTransactionTitle: {
    ...typography.subtitle3,
    color: palette.white,
  },
  latestTransaction: {
    ...typography.headline5,
    color: palette.white,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconInCircle: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
});
