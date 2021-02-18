export const SECOND = 1000;

export const WAIT_FOR_ELEMENT_TIMEOUT = 10 * SECOND;

export const DEFAULT_UNLOCK_PIN = '1234';
export const DEFAULT_TRANSACTION_PASSWORD = 'qwertyui';

export enum TransactionType {
  RECEIVED,
  SENT,
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  CANCELED_DONE = 'CANCELED_DONE',
}

interface ECDSA {
  PUBLIC_KEY: string;
  PRIVATE_KEY_PHRASE: string;
  PRIVATE_KEY: string;
}

/** Wallets used to test displaying transaction. Don't touch it. */
export const TRANSACTION_WALLETS = {
  '3-Key Vault': {
    SEED_PHRASE: 'muscle danger eternal venture zoo kiss taste menu swap story category side',
    FAST_KEY: {
      PUBLIC_KEY:
        '04a76693e3d79b43a954ce60efc3b6588750a42e1a52e4eb4dd21ab6620ceb739b2a1962e6c21981cedefc24f401dd2ef4f2051b296ff4ba2cb0cf15f31f103e5d',
      PRIVATE_KEY_PHRASE: 'cricket cotton acquire unhappy maple social nest note steel moon project scale',
      PRIVATE_KEY: 'e38ad7f3b216749383d247a7e46390658ddadf94748a8f689bca7fee3c1bc9e3',
    },
    CANCEL_KEY: {
      PUBLIC_KEY:
        '04d9f7578604c5161440e34dbdb4cb35b82e823f4d191b6d2581a32cd77af68527efb8e37661de7ae596d8a6ec219db8634635a7e054e470542da7559ee7f74ce8',
      PRIVATE_KEY_PHRASE: 'license agree excite knife tortoise torch inquiry bone roast course social remind',
      PRIVATE_KEY: 'a4d201a4bee0e8a5b624b9bf71fcf1ad24aaf35cefcba2495c4f6f50c268f985',
    },
    TRANSACTIONS: [
      {
        id: 'b58824f08e5c245d9fe7ff8753bfb295cd0ef806976051095e08a83184186512',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NFCCzE2oWvMx2Z4hvgfsmDHqD4eo3Gczpe',
        amount: 0.0001,
      },
      {
        id: '4e791ccbba5397b95c77fccd4fe6b643ca7595cdf935060968187cee812dfbac',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NFCCzE2oWvMx2Z4hvgfsmDHqD4eo3Gczpe',
        amount: 0.01,
      },
      {
        id: '70727170e4e84f80d9e9c4786929ac44610ce02e6fa1fe9a78597df82e09a679',
        type: TransactionType.SENT,
        status: TransactionStatus.CANCELED,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
        amount: 0.0002,
      },
      {
        id: '246087148afd57f5ef02e29e87d92a223748ab81ccb7ca7434f3b9d73e179347',
        type: TransactionType.SENT,
        status: TransactionStatus.DONE,
        from: '2N9e3xjNbcZbYg1JZjhYRTxcNgWTr8e4ZRZ',
        amount: 0.0001,
      },
      {
        id: 'c34dd81dd2777f95f52c02e0cafd87679a9cc3a54f01d20627b0fcdcd8027a1e',
        type: TransactionType.SENT,
        status: TransactionStatus.CANCELED_DONE,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
        amount: 0.0002,
      },
    ],
  },
  '2-Key Vault': {
    SEED_PHRASE: 'reduce entire guitar kite frozen brand major rebuild grab joy only kingdom',
    CANCEL_KEY: {
      PUBLIC_KEY:
        '04f69bf9db9b1e094e33ac4aeaea89071ffe77c55cfd6940ed66c0db3041847ce15b19e9abff17db1aa2c54d64359ff159bd150c4b049be75f802064a06e7eacf0',
      PRIVATE_KEY_PHRASE: 'state stool vicious divert lion stereo lava cute wolf sport slab debate',
      PRIVATE_KEY: '667353184fe4db381ebcb9549e567f9fbcd23a6322b88ca1ed8ec494ecfddfc0',
    },
    TRANSACTIONS: [
      {
        id: '0bfa12e3e765fdd0ed6dbf4076ebcfd5ba9bc3335d7706c8366dda2d801b499b',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NCp8UPmPXwzScnC6pS1d8q2MvarRGXinWd',
      },
      {
        id: '246087148afd57f5ef02e29e87d92a223748ab81ccb7ca7434f3b9d73e179347',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2N9e3xjNbcZbYg1JZjhYRTxcNgWTr8e4ZRZ',
      },
      {
        id: '70727170e4e84f80d9e9c4786929ac44610ce02e6fa1fe9a78597df82e09a679',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.CANCELED,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
      },
      {
        id: 'c34dd81dd2777f95f52c02e0cafd87679a9cc3a54f01d20627b0fcdcd8027a1e',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.CANCELED_DONE,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
      },
    ],
  },
};

/** Wallets keys used for testing import feautre. Don't use them for other purposes. */
export const WALLETS = {
  '3-Keys Vault': {
    SEED_PHRASE: 'dumb salmon ask orbit waste orient hospital april aim address obey miracle',
    FAST_KEY: {
      PUBLIC_KEY:
        '045d83185b9e236a9660d9bde4949873302cf52d3cd6f0a52aef9d52b90cc35a3a11e62854e4010256e2a7aae2088ec6f81481b70d9365cd29246b52f8d267d971',
      PRIVATE_KEY_PHRASE: 'you ritual embark harbor hint fit expand tourist cargo board rubber flag',
      PRIVATE_KEY: '4c0cb16fc28abcfa6d803fe5f1bdbd1b3e51b20009b0ce8ac8d580a240af465e',
    },
    CANCEL_KEY: {
      PUBLIC_KEY:
        '04c905204654a473f6d6bf1963caf988646b4383c378eed8b32ff1b2a1e7e66caccee2566db49f04d9c4cc3a73fbe856e3ab56846637c859757010be0c61dbb490',
      PRIVATE_KEY_PHRASE: 'speak desk quote daughter junk ripple swim hospital art salad unusual rifle',
      PRIVATE_KEY: 'b6a2ac4d209a40f16a13c531cb20036a7f121ecae865d4f1eae0e1901825ba9b',
    },
  },
  '2-Keys Vault': {
    SEED_PHRASE: 'cinamon oxygen shrimp across inhale ripple tuna radio sand cave glide net',
    CANCEL_KEY: {
      PUBLIC_KEY:
        '0405abcbebd5637f107402787a37f62c48f8c35ed75f5bb0118060a251c0d2eb8efe8cbc4c3835fd2357c9a0f8ea741291e902994834bba012201aceaac5741e08',
      PRIVATE_KEY_PHRASE: 'song candy woman soon strong gain galaxy knee evolve nasty worry debate',
      PRIVATE_KEY: 'f2a5d5a54fd240799787f2a2fa7218e8ce4fe5cd289aeccc98bf21d5cc731975',
    },
  },
  'Standard HD P2SH': {
    SEED_PHRASE: 'gym happy rebuild vibrant armed owner enforce leader leave crash grab lazy',
  },
};

/** Wallets created for transaction testing. */
export const WALLETS_WITH_COINS = {
  '3-Keys Vault': {
    SEED_PHRASE: 'viable reason stable tongue sibling jazz virus dress despair tunnel truly heart',
    FAST_KEY:
      '0442d7724d90fb60bc969f8b0fd46f3f63fe17637d5a0ba2fa9800b3b85946b72c3b81199572cd91bad23c87c3e96dbaa68e1c4b3e47d09276bd63138c584a5a7b',
    CANCEL_KEY:
      '04e8bc5e2428dcebe434306adaa944cb5eb7df80ec2e544f94ab2cea9bc5a70b5b1af42a83a936cd9d277413a8c5303001beaa268724270e4f2ce4d62010421960',
  },

  '2-Keys Vault': {
    SEED_PHRASE: 'judge void hair leader legal fantasy strong clinic knee child great situate',
    CANCEL_KEY:
      '0442d7724d90fb60bc969f8b0fd46f3f63fe17637d5a0ba2fa9800b3b85946b72c3b81199572cd91bad23c87c3e96dbaa68e1c4b3e47d09276bd63138c584a5a7b',
  },

  'Standard HD P2SH': {
    SEED_PHRASE: 'roof jump holiday jaguar calm mammal vapor acoustic marine modify hope enemy',
  },

  'Standard P2SH': {
    SEED_PHRASE: 'cNVqz3DVCUXUSbFWVuth7CUqmgaqCz7yck2kDjt5zgUxgLkK4WZi',
  },

  'Standard HD Segwit': {
    SEED_PHRASE: 'patrol correct rural firm special eight smooth orphan pilot oppose wealth rival',
  },
};

/** ECDSA key for testing create new wallet feature. */
export const ECDSA_KEYS: { FAST_KEY: ECDSA; CANCEL_KEY: ECDSA } = {
  FAST_KEY: {
    PUBLIC_KEY:
      '04c57b0ee8ede52316d1d403fb8c4411d1c1c0e1e512486266eedac0a43bafb8d2f92a667dc971b2c2c50c06daa4df8668d661791f600100b61b3e96497b87d512',
    PRIVATE_KEY_PHRASE: 'e8561132e976f93800af9706d0e8e239c79d30ae646f4ecda065aba373f1e216',
    PRIVATE_KEY: 'neck junk hen balance glue brain attitude label salmon hurdle mean discover',
  },
  CANCEL_KEY: {
    PUBLIC_KEY:
      '047ca834eb881ff79f468eae4b684b1aaae37f98a565f0b42237356874a3e479a4562dd44ebc3968266a5830783e9d4279094f3e42a4af4ecb575599e44200f71c',
    PRIVATE_KEY_PHRASE: 'e3e262d0639535bcd38c91c6a414fbe046c9519212f074b06d40322130e01dad',
    PRIVATE_KEY: 'shy physical adapt notice rapid inside food scrub basic inner save always',
  },
};

/**
 * Checks if current configuration includes "beta" word.
 */
export const isBeta = (): boolean => {
  const argparse = require('detox/src/utils/argparse');

  return argparse.getArgValue('configuration').includes('beta');
};

export const createRandomNote = () =>
  Math.random()
    .toString(36)
    .substring(7);
