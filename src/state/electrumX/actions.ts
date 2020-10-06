export enum ElectrumXAction {
  StartListeners = 'StartListeners',
  SetBlockHeight = 'SetBlockHeight',
}
export interface SetBlockHeightAction {
  type: ElectrumXAction.SetBlockHeight;
  blockHeight: number;
}

export interface StartListenersAction {
  type: ElectrumXAction.StartListeners;
}

export type ElectrymXActionType = SetBlockHeightAction | StartListenersAction;

export const startListeners = (): StartListenersAction => ({
  type: ElectrumXAction.StartListeners,
});

export const setBlockHeight = (blockHeight: number): SetBlockHeightAction => ({
  type: ElectrumXAction.SetBlockHeight,
  blockHeight,
});
