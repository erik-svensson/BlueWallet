import { CONST, Wallet, TxType } from 'app/consts';

import { decryptCode } from './decode';

const BigNumber = require('bignumber.js');

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isAllWallets = (wallet: Wallet): boolean => wallet.label === CONST.allWallets;

export const noop = () => null;

export const getConfirmationsText = (txType: TxType, confirmations: number): string => {
  const maxConfirmations = [TxType.ALERT_PENDING, TxType.ALERT_CONFIRMED].includes(txType)
    ? CONST.alertBlocks
    : CONST.confirmationsBlocks;
  const confs = confirmations > maxConfirmations ? maxConfirmations : confirmations;

  return `${confs}/${maxConfirmations}`;
};

export const isCodeChunked = (code: string): boolean => {
  const reg = new RegExp(/\d;\d;/g);

  return reg.test(code);
};

export const isEmail = (email: string): boolean => {
  const rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  const reg = new RegExp(rEmail);

  return reg.test(email);
};

export const checkZero = (amount: string) => {
  if (amount.charAt(0) === '.' || amount.charAt(0) === ',') {
    const newAmount = `0.${amount.substring(1)}`;

    return newAmount;
  } else {
    return amount;
  }
};

export const checkMinSatoshi = (amount: string | undefined) => {
  const minSatoshi = new BigNumber(1).dividedBy(CONST.satoshiInBtc);

  if (Number(amount) < minSatoshi && Number(amount) !== 0) {
    return true;
  }
};

export const agreedCode = (userCode: string, email: string, pin: string) => {
  const tempDecryptedCode = decryptCode(email, pin);

  return tempDecryptedCode === userCode;
};
