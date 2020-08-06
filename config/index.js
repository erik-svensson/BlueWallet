import Config from 'react-native-config';

const bitcoin = require('bitcoinjs-lib');
// const { Config } = require('react-native-config');

const { SENTRY_DSN, HOST, PORT, BTCV_NETWORK } = Config;

export default {
  sentryDsn: SENTRY_DSN || '',
  host: HOST || '188.166.204.85',
  port: PORT || '50001',
  network: bitcoin.alt_networks[BTCV_NETWORK || 'bitcoinvault'],
};

// export default {
//   sentryDsn: '',
//   host: '188.166.204.85',
//   port: '50001',
//   network: bitcoin.alt_networks['bitcoinvault'],
// };
