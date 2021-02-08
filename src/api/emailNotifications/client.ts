import { HttpError } from 'app/../error/AppErrors';

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

export const subscribeEmail = async (data: SubscribePayload): Promise<SubscribeResponse> => {
  const response = await httpClient.post(`/subscribe/`, data);

  return response.data;
};

export const unsubscribeEmail = async (data: UnsubscribePayload): Promise<UnsubscribePayload> => {
  const response = await httpClient.post(`/unsubscribe/`, data);

  return response.data;
};

export const authenticate = async (data: AuthenticatePayload): Promise<AuthenticatePayload> => {
  const response = await httpClient.post(`/authenticate/`, data);

  if (response.data.result === 'error') {
    throw new HttpError(EmailNotificationsError.ERROR_REQUEST_AUTHENTICATION);
  }

  return response.data;
};

export const modifyEmail = async (data: ModifyPayload): Promise<ModifyResponse> => {
  const response = await httpClient.put(`/modify/`, data);

  return response.data;
};

export const checkSubscriptionEmail = async (data: CheckSubscriptionPayload): Promise<CheckSubscriptionResponse> => {
  const response = await httpClient.post(`/check_subscription`, data);

  return response.data;
};

export const verifyEmail = async (data: VerifyEmailPayload): Promise<VerifyEmailResponse> => {
  const response = await httpClient.post(`/verify_email/`, data);

  if (response.data.result === 'error') {
    throw new HttpError(EmailNotificationsError.ERROR_VERIFICATION_ERROR);
  }

  return response.data;
};
