import b58 from 'bs58check';
import * as eccryptoJS from 'eccrypto-js';
import { takeEvery, put, call } from 'redux-saga/effects';

import { encryptPin } from 'app/api/encryption/client';
import { EncryptPinResponse, EncryptPinResponseFailure } from 'app/api/encryption/types';

import { EncryptionAction, EncryptPinAction, encryptPinSuccess, encryptPinFailure } from './actions';

const eccrypto = require('eccrypto');

enum Result {
  error = 'error',
  success = 'success',
}

export function* encryptPinSaga(action: EncryptPinAction) {
  const { payload } = action as EncryptPinAction;

  try {
    const response: EncryptPinResponse | EncryptPinResponseFailure = yield call(encryptPin, {
      data: payload.data,
      pubkey: b58.encode(payload.keyPair.public),
    });

    // public 7138k26aWVwNxynF3zrwZipm24ufsfgpwzWiA9DejAzb9KinNr
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
    console.log('encryption msg');
    const buff = Buffer.from(response.result, 'base64');

    console.log('atob(response.result)', Buffer.from(response.result, 'base64'));
    const ephemPublicKey = Buffer.from('02ceca806bf9b1a311c6f14055830a1a25b8d481ca849b9a4cd11ff14b23f6a0e3', 'base64');
    const ciphertext = Buffer.from('a5a3f7c338030a4c6c9af42e6fcb2b72', 'base64');
    const mac = Buffer.from('3f612d0fc1eb75fe07939da58fb4a72a76cb9d1ca03fb7e6f398e55403caee37', 'base64');
    const iv = Buffer.from('681d66e3e9272ae23fd1f29d59d429fd', 'base64');
    // const ephemPublicKey = buff.slice(4, 37);
    // const ciphertext = buff.slice(37, -32);
    // const mac = buff.slice(-32);

    console.log('atob(response.result)', ephemPublicKey, ciphertext, mac, iv);
    const msg = eccryptoJS.utf8ToBuffer(payload.data);

    console.log('start encryption', payload.keyPair);
    console.log('start encryption', payload.keyPair.public.toString('base64'));

    // const encrypted = yield eccrypto.encrypt(payload.keyPair.public, msg);
    const encrypted1 = { ephemPublicKey, ciphertext, mac, iv };

    console.log('encrypted', encrypted1);

    const decrypted = yield eccrypto.decrypt(payload.keyPair.private, encrypted1);

    console.log('decrypted', decrypted.toString());

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
