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

    const data =
      'QklFMQMRs32uAWNKBijNq8JW3fp58+/76fs9uvdYn932CziWeoO+paGJPDFHWBJPbVSqPOCNnvXkptesL2PYqXyZYEgsIIfmdcx5aDSxHPc+0OAPfg==';

    const buff1 = Buffer.from(data, 'base64');
    const ivBase64 = 'xov4i5YRQRKbB66kK6VhqQ=';

    console.log('buff1 length', buff1.length);
    console.log('buff1', buff1);

    const ephemPublicKey1 = buff1.slice(4, 37);
    const ciphertext1 = buff1.slice(37, -32);
    const mac1 = buff1.slice(-32);

    // const ephemPublicKeyBase64 = ephemPublicKey1.toString('base64');
    // const ciphertextBase64 = ciphertext1.toString('base64');
    // const macBase64 = mac1.toString('base64');

    // console.log('macBase64', macBase64);
    // console.log('ephemPublicKey', ephemPublicKeyBase64);
    // console.log('ciphertext', ciphertextBase64);

    const iv = Buffer.from(ivBase64, 'base64');

    const msg = eccryptoJS.utf8ToBuffer(payload.data);

    console.log('start encryption', payload.keyPair);
    console.log('start encryption private', payload.keyPair.private.toString('base64'));
    console.log('start encryption public', payload.keyPair.public.toString('base64'));

    // const encrypted = yield eccrypto.encrypt(payload.keyPair.public, msg);
    const encrypted1 = { ephemPublicKey: ephemPublicKey1, ciphertext: ciphertext1, mac: mac1, iv };

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
