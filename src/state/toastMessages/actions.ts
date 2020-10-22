import { Toast } from './reducer';

export enum ToastMessageAction {
  AddToastMessage = 'AddToastMessage',
}

export interface AddToastMessageAction {
  type: ToastMessageAction.AddToastMessage;
  payload: Toast;
}

export type ToastMessageActionType = AddToastMessageAction;

export const addToastMessage = (payload: Toast): AddToastMessageAction => ({
  type: ToastMessageAction.AddToastMessage,
  payload,
});
