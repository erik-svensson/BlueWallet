import {
  SENTRY_DSN,
  HOST,
  PORT,
  BTCV_NETWORK,
  PROTOCOL,
  ELECTRUM_X_PROTOCOL_VERSION,
  IS_BETA,
} from 'react-native-config';

const bitcoin = require('bitcoinjs-lib');

let isBeta = true;
try {
  isBeta = IS_BETA === 'true';
} catch (_) {}

export default {
  sentryDsn: SENTRY_DSN || '',
  host: HOST || 'e1.electrumx.bitcoinvault.global',
  port: PORT || '50001',
  network: bitcoin.alt_networks[BTCV_NETWORK || 'bitcoinvault'],
  protocol: PROTOCOL || 'tcp',
  electrumXProtocolVersion: ELECTRUM_X_PROTOCOL_VERSION || '2.0',
  isBeta,
  applicationId: isBeta ? 'io.goldwallet.wallet.testnet' : 'io.goldwallet.wallet',
  applcationName: isBeta ? 'Testnet Gold Wallet' : 'GoldWallet',
};
