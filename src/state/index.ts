export * from './rootReducer';
export { rootSaga } from './rootSaga';
import { combineReducers } from 'redux';

import { Filters } from 'app/consts';

import { appSettingsReducer, AppSettingsState } from './appSettings/reducer';
import { AuthenticationState, authenticationReducer } from './authentication/reducer';
import { AuthenticatorsState, authenticatorsReducer } from './authenticators/reducer';
import { contactsReducer, ContactsState } from './contacts/reducer';
import { filtersReducer } from './filters/reducer';
import { TimeCounterState, timeCounterReducer } from './timeCounter/reducer';
import { TransactionsNotesState, transactionsNotesReducer } from './transactionsNotes/reducer';
import { WalletsState, walletsReducer } from './wallets/reducer';

export interface ApplicationState {
  contacts: ContactsState;
  transactions: TransactionsNotesState;
  appSettings: AppSettingsState;
  wallets: WalletsState;
  timeCounter: TimeCounterState;
  authentication: AuthenticationState;
  authenticators: AuthenticatorsState;
  filters: Filters;
}

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  transactionsNotes: transactionsNotesReducer,
  appSettings: appSettingsReducer,
  wallets: walletsReducer,
  timeCounter: timeCounterReducer,
  authentication: authenticationReducer,
  authenticators: authenticatorsReducer,
  filters: filtersReducer,
});
