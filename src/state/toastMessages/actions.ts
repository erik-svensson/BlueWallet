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

export const addToastMessage = ({
  title,
  description,
  milisecondsAfterHide = 5000,
}: {
  title: string;
  description: string;
  milisecondsAfterHide?: number;
}): AddToastMessageAction => ({
  type: ToastMessageAction.AddToastMessage,
  payload: { title, description, milisecondsAfterHide, id: uuidv4() },
});

export const hideToastMessage = (payload: Toast): HideToastMessageAction => ({
  type: ToastMessageAction.HideToastMessage,
  payload,
});
