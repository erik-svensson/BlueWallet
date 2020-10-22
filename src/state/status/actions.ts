export enum StatusAction {
  UpdateInternetConnectionStatus = 'UpdateInternetConnectionStatus',
  UpdateInternetConnectionStatusSuccess = 'UpdateInternetConnectionStatusSuccess',
  UpdateServerConnectionStatus = 'UpdateServerConnectionStatus',
  UpdateServerConnectionStatusSuccess = 'UpdateServerConnectionStatusSuccess',
}

export interface UpdateInternetConnectionStatusAction {
  type: StatusAction.UpdateInternetConnectionStatus;
}

export interface UpdateInternetConnectionStatusSuccessAction {
  type: StatusAction.UpdateInternetConnectionStatusSuccess;
  payload: boolean;
}

export interface UpdateServerConnectionStatusAction {
  type: StatusAction.UpdateServerConnectionStatus;
}

export interface UpdateServerConnectionStatusSuccessAction {
  type: StatusAction.UpdateServerConnectionStatusSuccess;
  payload: boolean;
}

export type StatusActionType =
  | UpdateInternetConnectionStatusAction
  | UpdateServerConnectionStatusAction
  | UpdateInternetConnectionStatusSuccessAction
  | UpdateServerConnectionStatusSuccessAction;

export const updateInternetConnectionStatus = (): UpdateInternetConnectionStatusAction => ({
  type: StatusAction.UpdateInternetConnectionStatus,
});

export const updateInternetConnectionStatusSuccess = (
  payload: boolean,
): UpdateInternetConnectionStatusSuccessAction => ({
  type: StatusAction.UpdateInternetConnectionStatusSuccess,
  payload,
});

export const updateServerConnectionStatus = (): UpdateServerConnectionStatusAction => ({
  type: StatusAction.UpdateServerConnectionStatus,
});

export const updateServerConnectionStatusSuccess = (payload: boolean): UpdateServerConnectionStatusSuccessAction => ({
  type: StatusAction.UpdateServerConnectionStatusSuccess,
  payload,
});
