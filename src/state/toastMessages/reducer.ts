import dayjs from 'dayjs';

import { ToastMessageAction, ToastMessageActionType } from './actions';

export interface Toast {
  title: string;
  description: string;
  secondsAfterHide: number;
}

export interface ToastWithCreatedAt extends Toast {
  createdAt: number;
}

export interface ToastMessagesState {
  toastMessagesList: ToastWithCreatedAt[];
}

const initialState: ToastMessagesState = {
  toastMessagesList: [],
};

export const toastMessageReducer = (state = initialState, action: ToastMessageActionType): ToastMessagesState => {
  switch (action.type) {
    case ToastMessageAction.AddToastMessage:
      return {
        toastMessagesList: [
          ...state.toastMessagesList,
          {
            description: action.payload.description,
            secondsAfterHide: action.payload.secondsAfterHide,
            title: action.payload.title,
            createdAt: dayjs().unix(),
          },
        ],
      };
    default:
      return state;
  }
};
