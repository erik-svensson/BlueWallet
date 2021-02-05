import api from './client';
import {
  SubscribePayload,
  UnsubscribePayload,
  AuthenticatePayload,
  UpdateNotificationEmailPayload,
  CheckSubscriptionPayload,
  VerifyEmailPayload,
} from './types';

export const subscribeEmail = (data: SubscribePayload) => api.post(`subscribe/`, data);

export const unsubscribeEmail = (data: UnsubscribePayload) => api.post(`unsubscribe/`, data);

export const authenticateEmail = (data: AuthenticatePayload) => api.post(`authenticate/`, data);

export const modifyEmail = (data: UpdateNotificationEmailPayload) => api.put(`modify/`, data);

export const checkSubscriptionEmail = (data: CheckSubscriptionPayload) => api.post(`check_subscription`, data);

export const verifyEmail = (data: VerifyEmailPayload) => api.post(`verify_email/`, data);
