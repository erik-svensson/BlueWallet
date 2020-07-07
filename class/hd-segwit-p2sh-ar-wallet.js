import config from '../config';
import { AbstractHDSegwitP2SHWallet } from './abstract-hd-segwit-p2sh-wallet';

const { payments, ECPair } = require('bitcoinjs-lib');

const network = config.network;
export class HDSegwitP2SHArWallet extends AbstractHDSegwitP2SHWallet {
  static type = 'HDsegwitP2SHar';
  static typeReadable = 'AR';

  constructor(recoveryPubKey) {
    super();
    this.recoveryPubKey = ECPair.fromPublicKey(Buffer.from(recoveryPubKey, 'hex'), {
      network: config.network,
    }).publicKey;
  }

  nodeToAddress(hdNode) {
    const { address } = payments.p2sh({
      redeem: payments.p2wsh({
        redeem: payments.p2ar({
          pubkeys: [hdNode.publicKey, this.recoveryPubKey],
          network,
        }),
        network,
      }),
      network,
    });

    return address;
  }
}
