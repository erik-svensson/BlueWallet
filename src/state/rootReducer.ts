import { combineReducers } from 'redux';

import { Filters } from 'app/consts';
import { createPersistReducer } from 'app/helpers/reduxPersist';

import { AirdropState, airdropReducer } from './airdrop/reducer';
import { appSettingsReducer, AppSettingsState } from './appSettings/reducer';
import { AuthenticationState, authenticationReducer } from './authentication/reducer';
import { AuthenticatorsState, authenticatorsReducer } from './authenticators/reducer';
import { contactsReducer, ContactsState } from './contacts/reducer';
import { ElectrumXState, electrumXReducer } from './electrumX/reducer';
import { filtersReducer } from './filters/reducer';
import { NotificationState, notificationReducer, NOTIFICATIONS_REDUCER_NAME } from './notifications/reducer';
import { TimeCounterState, timeCounterReducer } from './timeCounter/reducer';
import { ToastMessagesState, toastMessageReducer } from './toastMessages/reducer';
import { transactionsNotesReducer, TransactionsNotesState } from './transactionsNotes/reducer';
import { WalletsState, walletsReducer } from './wallets/reducer';

export { actions, selectors } from './authenticators';
export interface ApplicationState {
  airdrop: AirdropState;
  contacts: ContactsState;
  transactions: TransactionsNotesState;
  appSettings: AppSettingsState;
  wallets: WalletsState;
  electrumX: ElectrumXState;
  timeCounter: TimeCounterState;
  authenticators: AuthenticatorsState;
  authentication: AuthenticationState;
  filters: Filters;
  toastMessages: ToastMessagesState;
  notifications: NotificationState;
}

const persistConfig = {
  key: 'root',
  blacklist: [
    'wallets',
    'authenticators',
    'authentication',
    'electrumX',
    'filters',
    'toastMessages',
    NOTIFICATIONS_REDUCER_NAME,
  ],
};

const rootReducer = combineReducers({
  airdrop: airdropReducer,
  contacts: contactsReducer,
  transactions: transactionsNotesReducer,
  appSettings: appSettingsReducer,
  wallets: walletsReducer,
  electrumX: electrumXReducer,
  timeCounter: timeCounterReducer,
  authenticators: authenticatorsReducer,
  authentication: authenticationReducer,
  filters: filtersReducer,
  toastMessages: toastMessageReducer,
  [NOTIFICATIONS_REDUCER_NAME]: notificationReducer,
});

export const persistedReducer = createPersistReducer(rootReducer, persistConfig);
