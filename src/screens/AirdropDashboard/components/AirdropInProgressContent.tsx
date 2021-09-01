import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';

import { images } from 'app/assets';
import { Image, AirdropWalletsList, AirdropCarousel } from 'app/components';
import { Wallet, AirdropCarouselCardData } from 'app/consts';
import { getCarouselItem } from 'app/helpers/airdrop';
import { selectors } from 'app/state/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

import { AvailableWalletAction, RegisteredWalletAction, CommunitySection, CommunityAchievementsList } from './';
import { Error } from './Error';

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
  const isAfterAirdrop = useSelector(selectors.isAfterAirdrop);
  const airdropGoals = useSelector(selectors.badges);
  const allWallets = useSelector(walletsSelectors.allWallets);
  const getCommunityItem = useSelector(selectors.getCommunityItem);
  const airdropsWalletBalance = useSelector(selectors.airdropsWalletBalance);
  const [communityCarouselActive, setCommunityCarouselActive] = useState(false);
  const [loadingWalletsIds, setLoadingWalletsIds] = useState<string[]>([]);
  let _carouselRef: Carousel<AirdropCarouselCardData>;

  const setRef = (carouselRef: Carousel<AirdropCarouselCardData>) => {
    _carouselRef = carouselRef;
  };

  useEffect(() => {
    const idsToRemove: string[] = [];

    loadingWalletsIds.forEach(id => {
      if (!availableWallets.filter(w => w.id === id)[0]) {
        idsToRemove.push(id);
      }
    });

    const stillLoading = loadingWalletsIds.filter(id => !idsToRemove.includes(id));

    setLoadingWalletsIds(stillLoading);
  }, [availableWallets, loading]);

  const _subscribeWallet = (wallet: Wallet) => {
    setLoadingWalletsIds([...loadingWalletsIds, wallet.id]);

    subscribeWallet(wallet);
  };

  const setCarouselActiveElement = (wallet: Wallet) => {
    const snapIndex = subscribedWallets.findIndex(w => w.id === wallet.id);

    _carouselRef.snapToItem(snapIndex || 0, true);
  };

  const onCarouselItemSnap = (index: number) => {
    setCommunityCarouselActive(index === subscribedWallets.length);
  };

  const userHasSubscribedWallets = subscribedWallets?.length > 0 || allWallets.length > 0;

  const getCarouselItems = (subscribedWallets: Wallet[]): AirdropCarouselCardData[] => {
    const renderableWallets = subscribedWallets.map(data =>
      getCarouselItem(data, isAfterAirdrop, airdropGoals, airdropsWalletBalance),
    );

    return isAfterAirdrop ? renderableWallets : [...renderableWallets, getCommunityItem];
  };

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
            items={getCarouselItems(subscribedWallets)}
            setRef={setRef}
            onItemSnap={onCarouselItemSnap}
          />
          {availableWallets?.length > 0 && !communityCarouselActive && (
            <View style={styles.walletsListContainer}>
              <AirdropWalletsList
                wallets={availableWallets}
                title={i18n.airdrop.dashboard.availableWallets}
                itemCallToAction={(wallet: Wallet) => (
                  <AvailableWalletAction onActionClick={() => _subscribeWallet(wallet)} />
                )}
                loadingWalletsIds={loadingWalletsIds}
              />
            </View>
          )}
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
