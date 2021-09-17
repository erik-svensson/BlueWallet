import * as eccryptoJS from 'eccrypto-js';
import { takeEvery, put, call } from 'redux-saga/effects';

import { encryptPin } from 'app/api/encryption/client';
import { EncryptPinResponse, EncryptPinResponseFailure } from 'app/api/encryption/types';

import { EncryptionAction, EncryptPinAction, encryptPinSuccess, encryptPinFailure } from './actions';

enum Result {
  error = 'error',
  success = 'success',
}

export function* encryptPinSaga(action: EncryptPinAction) {
  const { payload } = action as EncryptPinAction;

  try {
    const response: EncryptPinResponse | EncryptPinResponseFailure = yield call(encryptPin, {
      data: payload.data,
      pubkey: payload.pubkey,
    });

    // Priv key
    const privatKey =
      'tprv8cJi1bMUvoCfjy1oMY6AuBC7yUu2j6qPhyEKiAKASvnsowagmyrN6pRgE9bVwkhPPaJdBneTHwzaKitUqaWTg6J7bo3E85crdtxmstQrBsb';

    const result =
      'QklFMQJnZNFBiKYPWBh5GxASB73dstry3N5iFV0CBb7Vi9HR/GZk/LlHfLfbdQ8iu1F4l7tiykcB1uGw5ksOuIih0Ru9IN5/lMYOwZWnw9cVyDymZg==';

    // const keyPair = eccryptoJS.generateKeyPair();

    // console.log('keyPair', keyPair);

    // const str = 'test message to encrypt';
    // const msg = eccryptoJS.utf8ToBuffer(str);

    // const data = b58.decode(result);

    // console.log('b58.decode data', data);

    // console.log('decodedb58', data);

    // const encrypted = yield eccryptoJS.encrypt(data, msg);

    // console.log('encrypted', encrypted);

    // console.log('keyPair', payload.keyPair);

    // const keyPair = eccryptoJS.generateKeyPair();

    // const str = 'test message to encrypt';
    // const msg = eccryptoJS.utf8ToBuffer(payload.data);

    // // console.log('start encryption', payload.keyPair, keyPair.publicKey);

    // const encrypted = yield eccryptoJS.encrypt(payload.keyPair.public, msg);

    // console.log('encrypted', encrypted);

    // const decrypted = yield eccryptoJS.decrypt(payload.keyPair.private, encrypted);

    // console.log('decrypted', decrypted.toString());

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
