export enum AirdropAction {
  ThankYouSeen = 'ThankYouSeen',
  ThankYouFlowCompleted = 'ThankYouFlowCompleted',
}

export interface ThankYouSeenAction {
  type: AirdropAction.ThankYouSeen;
}

export interface ThankYouFlowCompleted {
  type: AirdropAction.ThankYouFlowCompleted;
}

export type AirdropActionType = ThankYouSeenAction | ThankYouFlowCompleted;

export const markThankYouSeen = (): ThankYouSeenAction => ({
  type: AirdropAction.ThankYouSeen,
});

export const completeThankYouFlow = (): ThankYouFlowCompleted => ({
  type: AirdropAction.ThankYouFlowCompleted,
});
