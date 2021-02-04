import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { images } from 'app/assets';
import { Image, Countdown, AirdropWalletsList, AirdropCarousel } from 'app/components';
import { CONST, Wallet, AirdropCarouselCardData } from 'app/consts';
import { getFormattedAirdropDate, isAfterAirdrop, getCarouselItem } from 'app/helpers/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

import { AvailableWalletAction, RegisteredWalletAction, CommunitySection } from './';
import { Error } from './Error';
import { Loading } from './Loading';

const i18n = require('../../../../loc');

interface Props {
  availableWallets: Wallet[];
  subscribedWallets: Wallet[];
  subscribeWallet: SubscribeWalletActionCreator;
  error: boolean;
  loading: boolean;
  usersQuantity: number;
}

export const AirdropInProgress: FC<Props> = props => {
  let _carouselRef: Carousel<AirdropCarouselCardData>;

  const setRef = (carouselRef: Carousel<AirdropCarouselCardData>) => {
    _carouselRef = carouselRef;
  };

  const setCarouselActiveElement = (wallet: Wallet) => {
    const snapIndex = props.subscribedWallets.findIndex(w => w.id === wallet.id && w.balance === wallet.balance);

    _carouselRef.snapToItem(snapIndex || 0, true);
  };

  const userHasSubscribedWallets = props.subscribedWallets?.length > 0;

  const getCarouselItems = (subscribedWallets: Wallet[]) => {
    const communityItem = {
      header: 'Community progress',
      circleInnerFirstLine: `${props.usersQuantity} users`, // TODO: singular plural and translations
      circleInnerSecondLine: 'Airdrop participants',
      footerFirstLine: 'The first goal', // TODO: order based on
      footerSecondLine: '3500 users', // TODO: unhardcode
      circleFillPercentage: 70, // TODO: calculate, as in wallets
    };

    const renderableWallets = subscribedWallets.map(getCarouselItem);

    return isAfterAirdrop() ? renderableWallets : [...renderableWallets, communityItem];
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
      {props.loading && (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      )}
      {props.error && (
        <View style={styles.errorContainer}>
          <Error />
        </View>
      )}
      {!props.error && !props.loading && (
        <>
          {userHasSubscribedWallets ? (
            <>
              <AirdropCarousel
                styles={styles.carouselStyles}
                items={getCarouselItems(props.subscribedWallets)}
                setRef={setRef}
              />
              <View style={styles.walletsListContainer}>
                <AirdropWalletsList
                  wallets={props.subscribedWallets}
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
          {props.availableWallets?.length > 0 && (
            <View style={styles.walletsListContainer}>
              <AirdropWalletsList
                wallets={props.availableWallets}
                title={i18n.airdrop.dashboard.availableWallets}
                itemCallToAction={(wallet: Wallet) => (
                  <AvailableWalletAction onActionClick={() => props.subscribeWallet(wallet)} />
                )}
              />
            </View>
          )}
          {userHasSubscribedWallets && (
            <View style={styles.communitySectionContainer}>
              <CommunitySection
                onActionClick={() => {
                  _carouselRef.snapToItem(props.subscribedWallets.length, true);
                }}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  communitySectionContainer: {
    flex: 1,
    width: '100%',
    marginTop: 16,
    marginBottom: 18,
  },
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
