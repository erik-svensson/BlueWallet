import config from 'app/config';

import createHttpClient from '../client';
import { EncryptPinPayload, EncryptPinResponse } from './types';

const httpClient = createHttpClient(config.apiBaseUrl);

export const encryptPin = (data: EncryptPinPayload): Promise<EncryptPinResponse> =>
  httpClient.post(`/encryption_test/`, data);
