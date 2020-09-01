import { all } from 'redux-saga/effects';

import { sagas as authenticatorsSagas } from './authenticators';

export function* rootSaga() {
  yield all([
    ...authenticatorsSagas,
    // ...advertisment.sagas,
    // ...notification.sagas,
  ]);
}
