import { ECDSA, TransactionStatus, TransactionType } from './types';

export const WAIT_FOR_ELEMENT_TIMEOUT = {
  DEFAULT: 10 * 1000,
  TRANSACTION_CONFIRMATION: 120 * 1000,
};

export const DEFAULT_UNLOCK_PIN = '1234';
export const DEFAULT_TRANSACTION_PASSWORD = 'qwertyui';

export const DEFAULT_EMAIL_ADDRESS = 'cloudbest.qa@gmail.com';

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

/** Wallets used to test displaying transaction. Don't make any transactions using those */
export const WALLETS = {
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
  'Standard HD P2SH': {
    SEED_PHRASE: 'gym happy rebuild vibrant armed owner enforce leader leave crash grab lazy',
  },
};

/** Wallets full of coins to test making transactions. */
export const WALLETS_WITH_COINS = {
  '3-Key Vault': {
    SEED_PHRASE: 'cancel distance owner rapid symbol display destroy history dirt ready mango lazy',
    FAST_KEY: {
      PUBLIC_KEY:
        '049d51d410f68069d027f1bb82df79848bd06f9f36b62b94254268c1f85a75cdde947beba7c0c2a8e2512a9338004dc664c53f89a235097d48f1b91e75735a6d99',
      PRIVATE_KEY: '4ad65f4fbb128e9ad1015867fc27913e6393ade21c3908fed56aa31a74b4aa7c',
      PRIVATE_KEY_PHRASE: 'usage desk pledge view equal coil boring sorry kiss fence thunder breeze',
    },
    CANCEL_KEY: {
      PUBLIC_KEY:
        '04072259c909ef1202d57d54ed1e98187feacc0d5dca9b235ff7df79eb923a4d0d8511a00f75e2c7aba20f7114d1ba7a3e36aa1c74405eaacb1abf5c576e1d94fe',
      PRIVATE_KEY: '83ee5d5471f475c5c6228322942a0b658340682f7432095395cbf3f3ea640bbd',
      PRIVATE_KEY_PHRASE: 'wild crush caution hobby visual penalty holiday offer text disorder appear cart',
    },
  },

  '2-Key Vault': {
    SEED_PHRASE: 'obscure analyst search hawk undo embody curtain master slice skill correct flee',
    CANCEL_KEY: {
      PUBLIC_KEY:
        '04e7dc2895538eef94067f8da59dba82604a4636cb959dc6460a7655c6f9946de8c2fd008395ee407268439fa58f65e10d646f4fe80df4216e07857e0e3018a82a',
      PRIVATE_KEY: 'a3cb454757335e196f304cdbd8c70a67ab14833df10a99502fdacf477e2bacd2',
      PRIVATE_KEY_PHRASE: 'tape creek unlock lock gauge clip sting leader mechanic tooth brush appear',
    },
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
  // Wallet for receiving coins from send and cancel tests.
  '3-Key moneybox': {
    WALLET_ADDRESS: '2NCp8UPmPXwzScnC6pS1d8q2MvarRGXinWd',
    SEED_PHRASE: 'elegant glass unhappy fiction goat response scale joke despair hand solid vivid',
    FAST_KEY: {
      PUBLIC_KEY:
        '04bff919b085937500916be58b23115e09c1a43ea2a3f577ab6ba9e637fa6e39d86855e6ea400d725f36eede053b83b967bfd7ab75971c2f4ae294c31d93cc4a3e',
    },
    CANCEL_KEY: {
      PUBLIC_KEY:
        '042d3564005160aab0a40af4a93e995b71df1e646104222b221b78eb0da0b8e94a60735fa723a2831aad00aeb855de0d584cca049faacc536a5efb953453a1e88f',
    },
  },
};
