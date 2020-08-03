export enum TimeCounterAction {
  SetTimeCounter = 'SetTimeCounter',
  SetFailedAttempts = 'SetFailedAttempts',
}

export interface SetTimeCounterAction {
  type: TimeCounterAction.SetTimeCounter;
  timestamp: number;
}

export interface SetFailedAttemptsAction {
  type: TimeCounterAction.SetFailedAttempts;
  attempt: number;
}

export type TimeCounterActionType = SetTimeCounterAction | SetFailedAttemptsAction;

export const setTimeCounter = (timestamp: number): SetTimeCounterAction => ({
  type: TimeCounterAction.SetTimeCounter,
  timestamp,
});

export const setFailedAttempts = (attempt: number): SetFailedAttemptsAction => ({
  type: TimeCounterAction.SetFailedAttempts,
  attempt,
});
