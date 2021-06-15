import { v4 as uuidv4 } from 'uuid';

import { Toast } from 'app/consts';

export enum ToastMessageAction {
  AddToastMessage = 'AddToastMessage',
  HideToastMessage = 'HideToastMessage',
}

export interface AddToastMessageAction {
  type: ToastMessageAction.AddToastMessage;
  payload: Toast;
}

export interface HideToastMessageAction {
  type: ToastMessageAction.HideToastMessage;
  payload: Toast;
}

export type ToastMessageActionType = AddToastMessageAction | HideToastMessageAction;

interface AddToastMessage {
  title: string;
  description: string;
  duration?: number;
  id?: string;
  status?: string;
}

export const addToastMessage = ({
  title,
  description,
  duration = 5500,
  id,
  status,
}: AddToastMessage): AddToastMessageAction => ({
  type: ToastMessageAction.AddToastMessage,
  payload: { title, description, duration, id: id || uuidv4(), status },
});

export const hideToastMessage = (payload: Toast): HideToastMessageAction => ({
  type: ToastMessageAction.HideToastMessage,
  payload,
});
