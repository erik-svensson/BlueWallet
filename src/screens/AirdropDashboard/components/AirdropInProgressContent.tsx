import React, { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { images } from 'app/assets';
import { Image, AirdropWalletsList, AirdropCarousel } from 'app/components';
import { Wallet, AirdropCarouselCardData } from 'app/consts';
import { isAfterAirdrop, getCarouselItem, getCommunityItem } from 'app/helpers/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

import { AvailableWalletAction, RegisteredWalletAction, CommunitySection, CommunityAchievementsList } from './';
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

export const AirdropInProgressContent: FC<Props> = ({
  error,
  loading,
  subscribedWallets,
  availableWallets,
  subscribeWallet,
  usersQuantity,
}) => {
  const [communityCarouselActive, setCommunityCarouselActive] = useState(false);
  let _carouselRef: Carousel<AirdropCarouselCardData>;

  const setRef = (carouselRef: Carousel<AirdropCarouselCardData>) => {
    _carouselRef = carouselRef;
  };

  const setCarouselActiveElement = (wallet: Wallet) => {
    const snapIndex = subscribedWallets.findIndex(w => w.id === wallet.id);

    _carouselRef.snapToItem(snapIndex || 0, true);
  };

  const onCarouselItemSnap = (index: number) => {
    setCommunityCarouselActive(index === subscribedWallets.length);
  };

  const userHasSubscribedWallets = subscribedWallets?.length > 0;

  const getCarouselItems = (subscribedWallets: Wallet[], usersQuantity: number): AirdropCarouselCardData[] => {
    const renderableWallets = subscribedWallets.map(getCarouselItem);

    return isAfterAirdrop() ? renderableWallets : [...renderableWallets, getCommunityItem(usersQuantity)];
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
      {userHasSubscribedWallets ? (
        <>
          <AirdropCarousel
            styles={styles.carouselStyles}
            items={getCarouselItems(subscribedWallets, usersQuantity)}
            setRef={setRef}
            onItemSnap={onCarouselItemSnap}
          />
          {!communityCarouselActive && (
            <View style={styles.walletsListContainer}>
              <AirdropWalletsList
                wallets={subscribedWallets}
                title={i18n.airdrop.dashboard.registeredWallets}
                itemCallToAction={(wallet: Wallet) => (
                  <RegisteredWalletAction onActionClick={() => setCarouselActiveElement(wallet)} />
                )}
              />
            </View>
          )}
        </>
      ) : (
        <>
          <Image source={images.airdrop} style={styles.airdropImage} />
          <Text style={styles.description}>{i18n.airdrop.dashboard.desc2}</Text>
        </>
      )}
      {availableWallets?.length > 0 && !communityCarouselActive && (
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
      {userHasSubscribedWallets && !communityCarouselActive && (
        <View style={styles.communitySectionContainer}>
          <CommunitySection
            onActionClick={() => {
              _carouselRef.snapToItem(subscribedWallets.length, true);
            }}
          />
        </View>
      )}
      {communityCarouselActive && <CommunityAchievementsList usersQuantity={usersQuantity} />}
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
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
});
