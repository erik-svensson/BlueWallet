import config from 'app/config';

import createHttpClient from '../client';
import {
  SubscribePayload,
  UnsubscribePayload,
  AuthenticatePayload,
  ModifyPayload,
  CheckSubscriptionPayload,
  VerifyEmailPayload,
  VerifyEmailResponse,
  SubscribeResponse,
  ModifyResponse,
  CheckSubscriptionResponse,
} from './types';

export enum EmailNotificationsError {
  INVALID_EMAIL = 'Enter a valid email address',
  ERROR_VERIFICATION_ERROR = 'On /verify-email/ request the server responded with result: "error"',
  WRONG_PIN = 'Wrong pin',
  TRIALS_LEFT = 'Trials left',
  WRONG_PIN_1_LEFT = 'Request to /authenticate/ failed. Details: Trials left: 1',
  WRONG_PIN_2_LEFT = 'Request to /authenticate/ failed. Details: Trials left: 2',
  WRONG_PIN_NO_TRIALS_LEFT = 'Request to /authenticate/ failed. Details: No more trials left',
  ERROR_REQUEST_AUTHENTICATION = 'On /authenticate/ request the server responded with result: "error',
}

const httpClient = createHttpClient('http://217.96.228.216:8765/api/');

export const subscribeEmail = (data: SubscribePayload): Promise<SubscribeResponse> =>
  httpClient.post(`/subscribe/`, data);

export const unsubscribeEmail = (data: UnsubscribePayload): Promise<UnsubscribePayload> =>
  httpClient.post(`/unsubscribe/`, data);

export const authenticate = (data: AuthenticatePayload): Promise<AuthenticatePayload> =>
  httpClient.post(`/authenticate/`, data);

export const modifyEmail = (data: ModifyPayload): Promise<ModifyResponse> => httpClient.put(`/modify/`, data);

export const checkSubscriptionEmail = (data: CheckSubscriptionPayload): Promise<CheckSubscriptionResponse> =>
  httpClient.post(`/check_subscription`, data);

export const verifyEmail = (data: VerifyEmailPayload): Promise<VerifyEmailResponse> =>
  httpClient.post(`/verify_email/`, data);
