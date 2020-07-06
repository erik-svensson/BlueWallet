import { AbstractHDSegwitP2SHWallet } from './abstract-hd-segwit-p2sh-wallet';

const { payments, ECPair } = require('bitcoinjs-lib');

export class HDSegwitP2SHArWallet extends AbstractHDSegwitP2SHWallet {
  static type = 'HDsegwitP2SHar';
  static typeReadable = 'AR';

  constructor(recoveryPubKey) {
    super();
    this.recoveryPubKey = ECPair.fromPublicKey(Buffer.from(recoveryPubKey, 'hex')).publicKey;
  }

  nodeToAddress(hdNode) {
    // Uncomment and remove below method when bitcoinjs-lib will be ready

    // const { address } = payments.p2sh({
    //   redeem: payments.p2wsh({
    //     redeem: payments.p2ar({
    //       alertPubKey: hdNode.publicKey,
    //       recoveryPubKey: this.recoveryPubKey,
    //     }),
    //   }),
    // });
    const { address } = payments.p2sh({
      redeem: payments.p2wpkh({ pubkey: hdNode.publicKey }),
    });
    return address;
  }
}
