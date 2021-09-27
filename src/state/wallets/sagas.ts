import { cloneDeep } from 'lodash';
import { Alert } from 'react-native';
import { takeEvery, takeLatest, put, all, call, select, delay, take } from 'redux-saga/effects';

import { authenticate, isRegistered, register } from 'app/api/wallet/client';
import { RegisterResponse } from 'app/api/wallet/types';
import config from 'app/config';
import { Wallet } from 'app/consts';
import { takeLatestPerKey } from 'app/helpers/sagas';
import * as helpers from 'app/helpers/wallets';
import { BlueApp } from 'app/legacy';

import { messages } from '../../../error';
import { checkAddressNetworkName } from '../../../utils/bitcoin';
import { actions as electrumXActions } from '../electrumX';
import {
  WalletsAction,
  loadWalletsSuccess,
  loadWalletsFailure,
  DeleteWalletAction,
  deleteWalletSuccess,
  deleteWalletFailure,
  CreateWalletAction,
  ImportWalletAction,
  createWalletSuccess,
  createWalletFailure,
  importWalletSuccess,
  importWalletFailure,
  UpdateWalletAction,
  updateWalletSuccess,
  updateWalletFailure,
  SendTransactionAction,
  sendTransactionSuccess,
  sendTransactionFailure,
  refreshWallet,
  refreshWalletSuccess,
  refreshWalletFailure,
  RefreshWalletAction,
  IsRegisteredWalletAction,
  checkWalletIsRegisteredSuccess,
  checkWalletIsRegisteredFailure,
  RegisterWalletAction,
  registerWalletSuccess,
  registerWalletFailure,
  AuthenticateWalletAction,
  authenticateWalletSuccess,
  authenticateWalletFailure,
  PrepareWalletAction,
  checkWalletIsRegistered,
  registerWallet,
  authenticateWallet,
  prepareWalletsSuccess,
  prepareWalletsFailure,
} from './actions';
import {
  getById as getByIdWallet,
  wallets as walletsSelector,
  isRegisteredWallets,
  walletToRegister,
} from './selectors';

const BlueElectrum = require('../../../BlueElectrum');
const i18n = require('../../../loc');

export function* loadWalletsSaga() {
  try {
    yield BlueElectrum.waitTillConnected();

    yield all([call(() => BlueApp.fetchWalletBalances()), call(() => BlueApp.fetchWalletTransactions())]);

    const wallets = BlueApp.getWallets();

    yield put(loadWalletsSuccess(wallets));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes(messages.noMatchingScript)) {
        const [address] = error.message.split(' ');
        const walletNetworkName = checkAddressNetworkName(address);

        Alert.alert(
          i18n.send.error.title,
          i18n.formatString(i18n.wallets.errors.wrongNetwork, {
            walletNetworkName,
            appNetworkName: config.networkName,
          }),
        );
      }
      yield put(loadWalletsFailure(error.message));
    }
  }
}

export function* deleteWalletSaga(action: DeleteWalletAction | unknown) {
  const {
    payload: { id },
    meta,
  } = action as DeleteWalletAction;

  try {
    const wallet = BlueApp.removeWalletById(id);

    yield BlueApp.saveToDisk();

    yield put(deleteWalletSuccess(wallet));
    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(deleteWalletFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }
  }
}

export function* createWalletSaga(action: CreateWalletAction | unknown) {
  const {
    payload: { wallet },
    meta,
  } = action as CreateWalletAction;

  try {
    yield wallet.generate();

    BlueApp.addWallet(wallet);
    yield BlueApp.saveToDisk();

    yield put(createWalletSuccess(wallet));

    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(createWalletFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }
  }
}

export function* importWalletSaga(action: ImportWalletAction | unknown) {
  const {
    payload: { wallet },
    meta,
  } = action as ImportWalletAction;

  try {
    yield all([call(() => wallet.fetchBalance()), call(() => wallet.fetchTransactions())]);
    BlueApp.addWallet(wallet);
    yield BlueApp.saveToDisk();

    yield put(importWalletSuccess(wallet));
    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(importWalletFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }
  }
}

export function* updateWalletSaga(action: UpdateWalletAction | unknown) {
  const { wallet } = action as UpdateWalletAction;

  try {
    const updatedWallet = cloneDeep(BlueApp.updateWallet(wallet));

    yield BlueApp.saveToDisk();

    yield put(updateWalletSuccess(updatedWallet));
  } catch (e) {
    if (e instanceof Error) {
      yield put(updateWalletFailure(e.message));
    }
  }
}

export function* refreshWalletSaga(action: RefreshWalletAction | unknown) {
  // delay for debouncing refresh actions for the same wallet
  yield delay(2500);

  const { id } = action as RefreshWalletAction;

  const selectedWallet: Wallet = yield select(getByIdWallet, id);
  const walletToRefresh: Wallet = cloneDeep(selectedWallet);

  try {
    if (!walletToRefresh) {
      throw new Error(`No wallet to refresh`);
    }
    yield BlueElectrum.waitTillConnected();

    yield all([call(() => walletToRefresh.fetchBalance()), call(() => walletToRefresh.fetchTransactions())]);

    yield put(refreshWalletSuccess(walletToRefresh));
  } catch (e) {
    if (e instanceof Error) {
      yield put(refreshWalletFailure(e.message));
    }
  }
}

export function* sendTransactionSaga(action: SendTransactionAction | unknown) {
  const {
    payload: { txDecoded },
    meta,
  } = action as SendTransactionAction;

  try {
    yield BlueElectrum.waitTillConnected();

    const result: Promise<any> = yield BlueElectrum.broadcast(txDecoded.toHex());

    yield put(sendTransactionSuccess());
    if (meta?.onSuccess) {
      meta.onSuccess(result);
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(sendTransactionFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }
  }
}

export function* scripHashHasChangedSaga(action: electrumXActions.ScriptHashChangedAction | unknown) {
  const { scriptHash } = action as electrumXActions.ScriptHashChangedAction;

  const wallets: Wallet[] = yield select(walletsSelector);

  const walletToRefresh = wallets.find(w => w.getScriptHashes().includes(scriptHash));

  if (walletToRefresh) {
    yield put(refreshWallet(walletToRefresh.id));
  }
}

export function* isRegisteredWalletSaga(action: IsRegisteredWalletAction | unknown) {
  const { wallets } = action as IsRegisteredWalletAction;

  try {
    const hashes: string[] = yield all(wallets.map(wallet => call(helpers.getWalletHashedPublicKeys, wallet)));

    const { result } = yield call(isRegistered, {
      wallets: hashes,
    });

    yield put(checkWalletIsRegisteredSuccess(result));
  } catch (error) {
    if (error instanceof Error) {
      yield put(checkWalletIsRegisteredFailure(error));
    }
  }
}

export function* registerWalletSaga(action: RegisterWalletAction | unknown) {
  const { wallets } = action as RegisterWalletAction;

  try {
    const { session_token, result } = yield call(register, {
      wallets,
    });

    yield put(registerWalletSuccess({ session_token, result }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(registerWalletFailure(error));
    }
  }
}

export function* authenticateWalletSaga(action: AuthenticateWalletAction | unknown) {
  const { payload } = action as AuthenticateWalletAction;

  try {
    yield call(authenticate, payload);

    yield put(authenticateWalletSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(authenticateWalletFailure(error));
    }
  }
}

export function* prepareWalletsSaga(action: PrepareWalletAction | unknown) {
  const { wallets } = action as PrepareWalletAction;

  try {
    yield put(checkWalletIsRegistered(wallets));

    const { type } = yield take([WalletsAction.IsRegisteredWalletSuccess, WalletsAction.IsRegisteredWalletFailure]);

    if (type === WalletsAction.IsRegisteredWalletSuccess) {
      const selectedWallets: boolean[] = yield select(isRegisteredWallets);

      const walletsHashesToRegister = Object.entries(selectedWallets).filter(wl => {
        const [, value] = wl;

        return !value;
      });

      if (walletsHashesToRegister.length) {
        const walletsToRegister = [];

        for (const wl of wallets) {
          const walletHash: string = yield call(helpers.getWalletHashedPublicKeys, wl);
          const walletNeedRegistration = walletsHashesToRegister.find(([key]) => key === walletHash);

          if (walletNeedRegistration) {
            walletsToRegister.push(wl);
          }
        }

        const walletsGenerationBase: Wallet[] = yield all(
          walletsToRegister.map(wallet => call(helpers.walletToAddressesGenerationBase, wallet)),
        );

        yield put(registerWallet(walletsGenerationBase));

        const { type: registerWalletType } = yield take([
          WalletsAction.RegisterWalletSuccess,
          WalletsAction.RegisterWalletFailure,
        ]);

        if (registerWalletType === WalletsAction.RegisterWalletSuccess) {
          const { session_token, result }: RegisterResponse = yield select(walletToRegister);

          const parsedWalletDataToActivate = {
            session_token,
            data: result,
          };

          yield put(authenticateWallet(parsedWalletDataToActivate));
        } else {
          throw new Error('Wallet registration failed');
        }
        const { type: AuthenticateType } = yield take([
          WalletsAction.AuthenticateWalletSuccess,
          WalletsAction.AuthenticateWalletFailure,
        ]);

        if (AuthenticateType === WalletsAction.AuthenticateWalletSuccess) {
          yield put(prepareWalletsSuccess());
        } else {
          throw new Error('Wallet authentication failed');
        }
      } else {
        yield put(prepareWalletsSuccess());
      }
    } else {
      throw new Error('Wallet registration check failed');
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(prepareWalletsFailure(error));
    }
  }
}

export default [
  takeLatestPerKey(WalletsAction.RefreshWallet, refreshWalletSaga, ({ id }: { id: string }) => id),
  takeEvery(electrumXActions.ElectrumXAction.ScriptHashChanged, scripHashHasChangedSaga),
  takeEvery(WalletsAction.DeleteWallet, deleteWalletSaga),
  takeLatest([WalletsAction.LoadWallets, electrumXActions.ElectrumXAction.ConnectionConnected], loadWalletsSaga),
  takeEvery(WalletsAction.CreateWallet, createWalletSaga),
  takeEvery(WalletsAction.ImportWallet, importWalletSaga),
  takeEvery(WalletsAction.UpdateWallet, updateWalletSaga),
  takeEvery(WalletsAction.SendTransaction, sendTransactionSaga),
  takeEvery(WalletsAction.IsRegisteredWallet, isRegisteredWalletSaga),
  takeEvery(WalletsAction.RegisterWallet, registerWalletSaga),
  takeEvery(WalletsAction.AuthenticateWallet, authenticateWalletSaga),
  takeLatest(WalletsAction.PrepareWallets, prepareWalletsSaga),
];
