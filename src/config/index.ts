import { alt_networks, Network } from 'bitcoinjs-lib';
import Config from 'react-native-config';

export default {
  environment: Config.ENVIRONMENT,
  isBeta: Config.IS_BETA === 'true',
  applicationId: Config.APP_ID,
  applicationName: Config.APPLICATION_NAME,
  hosts: Config.HOSTS.split(','),
  port: Config.PORT,
  networkName: Config.BTCV_NETWORK,
  network: alt_networks[Config.BTCV_NETWORK] as Network,
  protocol: Config.PROTOCOL,
  electrumXProtocolVersion: Config.ELECTRUM_X_PROTOCOL_VERSION,
  explorerUrl: Config.EXPLORER_URL,
  sentryDsnIOS: Config.SENTRY_DSN_IOS,
  sentryDsnAndroid: Config.SENTRY_DSN_ANDROID,
  emailNotificationsApi: Config.EMAIL_NOTIFICATIONS_API,
  airdropApi: Config.AIRDROP_API,
  apiBaseUrl: Config.API_BASE_URL,
  codepushDeploymentKeyIOS: Config.CODEPUSH_DEPLOYMENT_KEY_IOS,
  codepushDeploymentKeyAndroid: Config.CODEPUSH_DEPLOYMENT_KEY_ANDROID,
};
