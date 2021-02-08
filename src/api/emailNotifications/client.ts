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
  ERROR_REQUEST_AUTHENTICATION = 'On /authenticate/ request the server responded with result: "error',
}

const httpClient = createHttpClient(config.emailNotificationsApi);

export const subscribeEmail = async (data: SubscribePayload): Promise<SubscribeResponse> =>
  httpClient.post(`/subscribe/`, data);

export const unsubscribeEmail = async (data: UnsubscribePayload): Promise<UnsubscribePayload> =>
  httpClient.post(`/unsubscribe/`, data);

export const authenticate = async (data: AuthenticatePayload): Promise<AuthenticatePayload> =>
  httpClient.post(`/authenticate/`, data);

export const modifyEmail = async (data: ModifyPayload): Promise<ModifyResponse> => httpClient.put(`/modify/`, data);

export const checkSubscriptionEmail = async (data: CheckSubscriptionPayload): Promise<CheckSubscriptionResponse> =>
  httpClient.post(`/check_subscription`, data);

export const verifyEmail = async (data: VerifyEmailPayload): Promise<VerifyEmailResponse> =>
  httpClient.post(`/verify_email/`, data);
