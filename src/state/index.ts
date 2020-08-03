import { combineReducers } from 'redux';

import { appSettingsReducer, AppSettingsState } from './appSettings/reducer';
import { contactsReducer, ContactsState } from './contacts/reducer';
import { TimeCounterState, timeCounterReducer } from './timeCounter/reducer';
import { transactionsReducer, TransactionsState } from './transactions/reducer';
import { WalletsState, walletsReducer } from './wallets/reducer';

export interface ApplicationState {
  contacts: ContactsState;
  transactions: TransactionsState;
  appSettings: AppSettingsState;
  wallets: WalletsState;
  timeCounter: TimeCounterState;
}

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  transactions: transactionsReducer,
  appSettings: appSettingsReducer,
  wallets: walletsReducer,
  timeCounter: timeCounterReducer,
});
