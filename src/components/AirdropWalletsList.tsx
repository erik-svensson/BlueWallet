import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Loader, EllipsisText } from 'app/components';
import { Wallet } from 'app/consts';
import { typography, palette } from 'app/styles';

interface Props {
  title: string;
  wallets: Wallet[];
  itemCallToAction?: (wallet: Wallet) => React.ReactElement;
  loadingWalletsIds?: string[];
}

interface ItemProps {
  wallet: Wallet;
  callToAction?: React.ReactElement;
  loading: boolean;
}

const AirdropWalletsListItem: FC<ItemProps> = ({ wallet, callToAction, loading }) => (
  <View style={styles.listElement}>
    <View style={styles.textContainer}>
      <EllipsisText style={styles.itemName}>{wallet.label}</EllipsisText>
      <Text style={styles.itemDescription}>{`${wallet.getAddressForTransaction()}`}</Text>
    </View>
    {loading ? (
      <View style={styles.loaderContainer}>
        <Loader size={13} />
      </View>
    ) : (
      callToAction
    )}
  </View>
);

export const AirdropWalletsList: FC<Props> = props => {
  const { title, wallets, itemCallToAction, loadingWalletsIds = [] } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {wallets.map(wallet => (
        <AirdropWalletsListItem
          key={wallet.id}
          wallet={wallet}
          callToAction={itemCallToAction && itemCallToAction(wallet)}
          loading={loadingWalletsIds.includes(wallet.id)}
        />
      ))}
    </View>
  );
};

export default AirdropWalletsList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    ...typography.overline,
    color: palette.textGrey,
    textAlign: 'left',
    marginBottom: 16,
  },
  listElement: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 5,
  },
  itemName: {
    ...typography.headline5,
    marginBottom: 3,
  },
  itemDescription: {
    ...typography.overline,
    color: palette.textGrey,
    lineHeight: 14,
  },
});
