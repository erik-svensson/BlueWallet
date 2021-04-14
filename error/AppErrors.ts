const i18n = require('../loc');

export class DoubleSpentFundsError extends Error {
  constructor(message = i18n.send.error.doubleSpentFunds) {
    super(message);

    this.name = 'DoubleSpentFundsError';
  }
}

export class NotExistingFundsError extends Error {
  constructor(message = i18n.send.error.notExistingFunds) {
    super(message);

    this.name = 'NotExistingFundsError';
  }
}

export class DustError extends Error {
  constructor(message = i18n.send.error.dust) {
    super(message);

    this.name = 'DustError';
  }
}

export class BroadcastError extends Error {
  constructor(message: string) {
    const messages = message.split('\n');
    const generalMsg = messages[0];
    const detailedMsg = messages[2];
    const errorMsg = `${generalMsg}: ${detailedMsg}`;

    super(errorMsg);

    this.name = 'BroadcastError';
  }
}

export class ElectrumXConnectionError extends Error {
  constructor(message = i18n.connectionIssue.electrumXNotConnected) {
    super(message);

    this.name = 'ElectrumXConnectionError';
  }
}

export class HttpError extends Error {
  constructor(message = i18n.connectionIssue.electrumXNotConnected) {
    super(message);

    this.name = 'HttpError';
  }
}
