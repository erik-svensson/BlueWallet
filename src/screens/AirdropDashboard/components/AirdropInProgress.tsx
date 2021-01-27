import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { images } from 'app/assets';
import { Image, Countdown, AirdropWalletsList, AirdropWalletsCarousel } from 'app/components';
import { CONST, Route, RootStackParams, Wallet } from 'app/consts';
import { getFormattedAirdropDate } from 'app/helpers/airdrop';
import { typography, palette } from 'app/styles';

import { Footer, AvailableWalletAction, RegisteredWalletAction } from './';

const i18n = require('../../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
  availableWallets: Wallet[];
  subscribedWallets: Wallet[];
  subscribeWallet: (wallet: Wallet) => Promise<void>;
}

export const AirdropInProgress: FC<Props> = ({ navigation, subscribedWallets, availableWallets, subscribeWallet }) => {
  let _carouselRef: Carousel<{ balance: number; label: string }>;

  const setRef = (carouselRef: Carousel<{ balance: number; label: string }>) => {
    _carouselRef = carouselRef;
  };

  const setCarouselActiveElement = (wallet: Wallet) => {
    const snapIndex = subscribedWallets.findIndex(w => w.label === wallet.label && w.balance === wallet.balance);

    _carouselRef.snapToItem(snapIndex || 0, true);
  };

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
        <Text style={[styles.description, styles.spaceTop]}>{i18n.airdrop.dashboard.desc1}</Text>
        <Text style={styles.description}>
          {i18n.airdrop.dateOfAirdrop}&nbsp;
          {getFormattedAirdropDate()}
        </Text>
      </View>
      <Countdown dataEnd={CONST.airdropDate} />
      {subscribedWallets?.length > 0 ? (
        <>
          <AirdropWalletsCarousel styles={styles.carouselStyles} items={subscribedWallets} setRef={setRef} />
          <View style={styles.walletsListContainer}>
            <AirdropWalletsList
              wallets={subscribedWallets}
              title={i18n.airdrop.dashboard.registeredWallets}
              itemCallToAction={(wallet: Wallet) => (
                <RegisteredWalletAction onActionClick={() => setCarouselActiveElement(wallet)} />
              )}
            />
          </View>
        </>
      ) : (
        <>
          <Image source={images.airdrop} style={styles.airdropImage} />
          <Text style={styles.description}>{i18n.airdrop.dashboard.desc2}</Text>
        </>
      )}
      {availableWallets?.length > 0 && (
        <View style={styles.walletsListContainer}>
          <AirdropWalletsList
            wallets={availableWallets}
            title={i18n.airdrop.dashboard.availableWallets}
            itemCallToAction={(wallet: Wallet) => (
              <AvailableWalletAction onActionClick={() => subscribeWallet(wallet)} />
            )}
          />
        </View>
      )}
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  carouselStyles: {
    paddingTop: 36,
    paddingBottom: 24,
  },
  walletsListContainer: {
    marginTop: 12,
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  airdropImage: {
    width: 189,
    height: 193,
    marginTop: 27.5,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  spaceTop: {
    marginTop: 18,
  },
  footer: {
    marginTop: 18,
    width: '100%',
  },
});
