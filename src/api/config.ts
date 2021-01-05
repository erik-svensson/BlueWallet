import Config from 'react-native-config';

const { NOTIFICATION_EMAIL_URL } = Config;

export const config = {
  baseURL: NOTIFICATION_EMAIL_URL || '',
};
