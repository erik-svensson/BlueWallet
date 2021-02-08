import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { images } from 'app/assets';
import { Image, Countdown, AirdropWalletsList, AirdropWalletsCarousel } from 'app/components';
import { CONST, Wallet, AirdropWalletCardData } from 'app/consts';
import { getFormattedAirdropDate } from 'app/helpers/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

import { AvailableWalletAction, RegisteredWalletAction } from './';
import { Error } from './Error';
import { Loading } from './Loading';

const i18n = require('../../../../loc');

interface Props {
  availableWallets: Wallet[];
  subscribedWallets: Wallet[];
  subscribeWallet: SubscribeWalletActionCreator;
  error: boolean;
  loading: boolean;
}

const AirdropInProgressContent: FC<Props> = ({
  error,
  loading,
  subscribedWallets,
  availableWallets,
  subscribeWallet,
}) => {
  let _carouselRef: Carousel<AirdropWalletCardData>;

  const setRef = (carouselRef: Carousel<AirdropWalletCardData>) => {
    _carouselRef = carouselRef;
  };

  const setCarouselActiveElement = (wallet: Wallet) => {
    const snapIndex = subscribedWallets.findIndex(w => w.id === wallet.id && w.balance === wallet.balance);

    _carouselRef.snapToItem(snapIndex || 0, true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Error />
      </View>
    );
  }

  return (
    <>
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
    </>
  );
};

export const AirdropInProgress: FC<Props> = props => {
  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
        <Text style={[styles.description, styles.spaceTop]}>
          {props.subscribedWallets?.length > 0 ? i18n.airdrop.dashboard.desc1WithWallets : i18n.airdrop.dashboard.desc1}
        </Text>
        <Text style={styles.description}>
          {i18n.airdrop.dateOfAirdrop}&nbsp;
          {getFormattedAirdropDate()}
        </Text>
      </View>
      <Countdown dataEnd={CONST.airdropDate} />
      <AirdropInProgressContent {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 20,
  },
  errorContainer: {
    marginTop: 10,
  },
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
});
