const i18n = require('../loc');

export class DoubleSpentFundsError extends Error {
  readonly message = i18n.send.error.doubleSpentFunds;
}

export class NotExistingFundsError extends Error {
  readonly message = i18n.send.error.notExistingFunds;
}

export class DustError extends Error {
  readonly message = i18n.send.error.dust;
}
