import React, { FC } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { Wallet } from 'app/consts';
import { typography, palette } from 'app/styles';

interface Props {
  title: string;
  wallets: Wallet[];
  itemCallToAction?: (wallet: Wallet) => React.ReactElement;
}

interface ItemProps {
  wallet: Wallet;
  callToAction?: React.ReactElement;
}

const AirdropWalletsListItem: FC<ItemProps> = ({ wallet, callToAction }) => (
  <View style={styles.listElement}>
    <View style={styles.textContainer}>
      <Text style={styles.itemName}>{wallet.label}</Text>
      <Text style={styles.itemDescription}>{`${wallet.getAddressForTransaction()}`}</Text>
    </View>
    {callToAction}
  </View>
);

export const AirdropWalletsList: FC<Props> = props => {
  const { title, wallets, itemCallToAction } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        data={wallets}
        renderItem={({ item }) => (
          <AirdropWalletsListItem wallet={item} callToAction={itemCallToAction && itemCallToAction(item)} />
        )}
      />
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 5,
  },
  itemName: {
    ...typography.headline5,
    marginBottom: 1,
  },
  itemDescription: {
    ...typography.overline,
    color: palette.textGrey,
    lineHeight: 14,
  },
});
