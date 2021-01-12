import b58 from 'bs58check';
import sha256 from 'crypto-js/sha256';

import { Wallet, CONST, WALLETS_ADDRESSES_TYPES } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';

const ENCODING = 'hex';

export const walletToAddressesGenerationBase = async (wallet: Wallet) => {
  let instant_public_key = undefined;
  let recovery_public_key = undefined;

  if (wallet.type === HDSegwitP2SHArWallet.type) {
    recovery_public_key = wallet.pubKeys && wallet.pubKeys[0].toString(ENCODING);
  }

  if (wallet.type === HDSegwitP2SHAirWallet.type) {
    instant_public_key = wallet.pubKeys && wallet.pubKeys[0].toString(ENCODING);
    recovery_public_key = wallet.pubKeys && wallet.pubKeys[1].toString(ENCODING);
  }

  return {
    name: wallet.label,
    gap_limit: CONST.walletsDefaultGapLimit,
    derivation_path: {}, //[wallet.getDerivationPath()],
    xpub: await wallet.getXpub(),
    address_type: 'p2sh', // WALLETS_ADDRESSES_TYPES[wallet.type], TODO change when backend types are completed
    instant_public_key: 'recovery_public_key',
    ...(instant_public_key && { instant_public_key }),
    ...(recovery_public_key && { recovery_public_key }),
  };
};

export const getWalletHashedPublicKeys = async (wallet: Wallet): Promise<string | undefined> => {
  const encodedPubKeys =
    wallet.pubKeys
      ?.map(pk => pk.toString(ENCODING))
      .reverse()
      .join('') || '';
  const xpub = await wallet.getXpub();
  return sha256(`${xpub}${encodedPubKeys}`).toString();
};
