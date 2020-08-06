const bitcoin = require('bitcoinjs-lib');
const { Config } = require('react-native-config');

const { SENTRY_DSN, HOST, PORT, BTCV_NETWORK } = Config;

module.exports = {
  sentryDsn: SENTRY_DSN || '',
  host: HOST || '188.166.204.85',
  port: PORT || '50001',
  network: bitcoin.alt_networks[BTCV_NETWORK || 'bitcoinvault'],
};
