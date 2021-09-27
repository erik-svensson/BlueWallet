import b58 from 'bs58check';
import { takeEvery, put, call } from 'redux-saga/effects';

import { encryptPin } from 'app/api/encryption/client';
import { EncryptPinResponse, EncryptPinResponseFailure } from 'app/api/encryption/types';

import { EncryptionAction, EncryptPinAction, encryptPinSuccess, encryptPinFailure } from './actions';

const ECIES = require('electrum-ecies');

enum Result {
  error = 'error',
  success = 'success',
}

export function* encryptPinSaga(action: EncryptPinAction) {
  const { payload } = action as EncryptPinAction;

  try {
    // Bitcoinjs library accepts only b58 encoded keys
    const publicB58key = b58.encode(payload.keyPair.public);

    const response: EncryptPinResponse | EncryptPinResponseFailure = yield call(encryptPin, {
      data: payload.data,
      pubkey: publicB58key,
    });

    const decryptedData = ECIES.decrypt(response.result, payload.keyPair.private);

    // TODO: created to test 2 side encryption work, remove for release
    console.log('decryptedData', decryptedData.toString());

    if (response.result === Result.error) {
      throw new Error(response.msg);
    }

    if (response.result === Result.success) {
      yield put(encryptPinSuccess(response.session_token));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(encryptPinFailure(error.message));
    }
  }
}

export default [takeEvery(EncryptionAction.EncryptPin, encryptPinSaga)];
