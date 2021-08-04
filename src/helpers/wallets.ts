import sha256 from 'crypto-js/sha256';

import { Wallet, CONST, WALLETS_ADDRESSES_TYPES, WalletPayload } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';

const ENCODING = 'hex';

export const walletToAddressesGenerationBase = async (wallet: Wallet): Promise<WalletPayload> => {
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
    //@ts-ignore
    name: wallet.label,
    gap_limit: CONST.walletsDefaultGapLimit,
    address_range: CONST.walletsDefaultAddressRange,
    derivation_path: CONST.walletsDefaultDerivationPath,
    xpub: await wallet.getXpub(),
    address_type: WALLETS_ADDRESSES_TYPES[wallet.type],
    ...(instant_public_key && { instant_public_key }),
    ...(recovery_public_key && { recovery_public_key }),
  };
};

export const getWalletHashedPublicKeys = async (wallet: Wallet): Promise<string> => {
  const encodedPubKeys =
    wallet.pubKeys
      ?.map(pk => pk.toString(ENCODING))
      .reverse()
      .join('') || '';
  const xpub = await wallet.getXpub();
  const walletType = WALLETS_ADDRESSES_TYPES[wallet.type];

  return sha256(`${walletType}${xpub}${encodedPubKeys}`).toString();
};
