import api from './client';
import {
  SubscribePayload,
  UnsubscribePayload,
  AuthenticatePayload,
  ModifyPayload,
  CheckSubscriptionPayload,
  VerifyEmailPayload,
} from './types';

export const subscribeEmail = (data: SubscribePayload) => {
  api.post(`subscribe`, {
    data,
  });
};

export const unsubscribeEmail = (data: UnsubscribePayload) => {
  api.post(`unsubscribe`, {
    data,
  });
};

export const authenticateEmail = (data: AuthenticatePayload) => {
  api.post(`authenticate`, {
    data,
  });
};

export const modifyEmail = (data: ModifyPayload) => {
  api.put(`modify`, {
    data,
  });
};

export const checkSubscriptionEmail = (data: CheckSubscriptionPayload) => {
  api.get(`check_subscription`, {
    data,
  });
};

export const verifyEmail = (data: VerifyEmailPayload) =>
  api.post(`/verify_email/`, {
    ...data,
  });
