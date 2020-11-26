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

export const addToastMessage = (payload: Toast): AddToastMessageAction => ({
  type: ToastMessageAction.AddToastMessage,
  payload,
});

export const hideToastMessage = (payload: Toast): HideToastMessageAction => ({
  type: ToastMessageAction.HideToastMessage,
  payload,
});
