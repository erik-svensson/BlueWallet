import {
  DataFrozenTxWallets,
  DataTestWallets,
  DataActiveTxWallets,
  TransactionStatus,
  TransactionType,
  WalletType,
} from '../../types';

/** Wallets used to test displaying transaction. Don't make any transactions using those */
const frozenTxWallets: DataFrozenTxWallets = {
  [WalletType.KEY_3]: {
    seedPhrase: 'muscle danger eternal venture zoo kiss taste menu swap story category side',
    fastKey: {
      publicKey:
        '04a76693e3d79b43a954ce60efc3b6588750a42e1a52e4eb4dd21ab6620ceb739b2a1962e6c21981cedefc24f401dd2ef4f2051b296ff4ba2cb0cf15f31f103e5d',
      privateKeyPhrase: 'cricket cotton acquire unhappy maple social nest note steel moon project scale',
      privateKey: 'e38ad7f3b216749383d247a7e46390658ddadf94748a8f689bca7fee3c1bc9e3',
    },
    cancelKey: {
      publicKey:
        '04d9f7578604c5161440e34dbdb4cb35b82e823f4d191b6d2581a32cd77af68527efb8e37661de7ae596d8a6ec219db8634635a7e054e470542da7559ee7f74ce8',
      privateKeyPhrase: 'license agree excite knife tortoise torch inquiry bone roast course social remind',
      privateKey: 'a4d201a4bee0e8a5b624b9bf71fcf1ad24aaf35cefcba2495c4f6f50c268f985',
    },
    transactions: [
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
        from: '2N6pwK1SATHgr2GLQN8MhsFt9eyuyjzpcQS',
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
  [WalletType.KEY_2]: {
    seedPhrase: 'reduce entire guitar kite frozen brand major rebuild grab joy only kingdom',
    cancelKey: {
      publicKey:
        '04f69bf9db9b1e094e33ac4aeaea89071ffe77c55cfd6940ed66c0db3041847ce15b19e9abff17db1aa2c54d64359ff159bd150c4b049be75f802064a06e7eacf0',
      privateKeyPhrase: 'state stool vicious divert lion stereo lava cute wolf sport slab debate',
      privateKey: '667353184fe4db381ebcb9549e567f9fbcd23a6322b88ca1ed8ec494ecfddfc0',
    },
    transactions: [
      {
        id: '0bfa12e3e765fdd0ed6dbf4076ebcfd5ba9bc3335d7706c8366dda2d801b499b',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NCp8UPmPXwzScnC6pS1d8q2MvarRGXinWd',
        amount: 0.002,
      },
      {
        id: '246087148afd57f5ef02e29e87d92a223748ab81ccb7ca7434f3b9d73e179347',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2N9e3xjNbcZbYg1JZjhYRTxcNgWTr8e4ZRZ',
        amount: 0.0001,
      },
      {
        id: '70727170e4e84f80d9e9c4786929ac44610ce02e6fa1fe9a78597df82e09a679',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.CANCELED,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
        amount: 0.0002,
      },
      {
        id: 'c34dd81dd2777f95f52c02e0cafd87679a9cc3a54f01d20627b0fcdcd8027a1e',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.CANCELED_DONE,
        from: '2MuFYLrRvb6wfu668tKfKAF8P7HPZBGm3aa',
        amount: 0.0032937,
      },
    ],
  },
  [WalletType.S_HD_P2SH]: {
    seedPhrase: 'gym happy rebuild vibrant armed owner enforce leader leave crash grab lazy',
    transactions: [
      {
        id: '9ade026369b336798b4e396d03388a087c71a2f3ebc545fae05f12c8ebf77b7d',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NG7gWLFHea5P1gep58Lak3SdQWLREY9o8V',
        amount: 1,
      },
    ],
  },
  [WalletType.S_P2SH]: {
    seedPhrase: 'cMqwV4MmyvL6NYHcwzmE8bUgcxs5Ynrhq5xB7arpi3stXBrevVGn',
    transactions: [
      {
        id: 'eb6c9aa0fec54376280c076d9c4e1691b12a469aa1cff81c8122cc2cc1d73f4f',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NAMs8sgit7nZEw3qnqVHGGbGJJq5U61ZJX',
        amount: 1,
      },
      {
        id: '69ffc82642ac99bc6d884ff845f4d02d981ee2cf95890c11a8dfc2dc050dd253',
        type: TransactionType.SENT,
        status: TransactionStatus.DONE,
        from: '2N4Z3NtPvPPEms7AhN8a84voiGkoq6ayMX5',
        amount: 0.003,
      },
      {
        id: 'aab07096f09fd4302c6e214c76bd938bc491d65ee1663d35f882b3a12b038f81',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: 'troyale1q8hg8t3ulalfuxrw0wyg74ne0rvl7pq8fccpkf9',
        amount: 0.001,
      },
    ],
  },
  [WalletType.S_HD_SEGWIT]: {
    seedPhrase: 'cherry seat addict sweet forward balcony million bulk long toddler camera bid',
    transactions: [
      {
        id: 'ca79b3fc19ce0f5a76c72fcd9ba31306c76c96c963befa3179e051033b264904',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2NGMKq96Bior1jm7pQUbCkGGKYB1mkC9xUp',
        amount: 1,
      },
      {
        id: '69ffc82642ac99bc6d884ff845f4d02d981ee2cf95890c11a8dfc2dc050dd253',
        type: TransactionType.RECEIVED,
        status: TransactionStatus.DONE,
        from: '2N4Z3NtPvPPEms7AhN8a84voiGkoq6ayMX5',
        amount: 0.003,
      },
      {
        id: 'ca79b3fc19ce0f5a76c72fcd9ba31306c76c96c963befa3179e051033b264904',
        type: TransactionType.SENT,
        status: TransactionStatus.DONE,
        from: 'troyale1q8hg8t3ulalfuxrw0wyg74ne0rvl7pq8fccpkf9',
        amount: 0.001,
      },
    ],
  },
};

/** Wallets full of coins to test making transactions. */
const activeTxWallets: DataActiveTxWallets = {
  [WalletType.KEY_3]: {
    seedPhrase: 'cancel distance owner rapid symbol display destroy history dirt ready mango lazy',
    fastKey: {
      publicKey:
        '049d51d410f68069d027f1bb82df79848bd06f9f36b62b94254268c1f85a75cdde947beba7c0c2a8e2512a9338004dc664c53f89a235097d48f1b91e75735a6d99',
      privateKey: '4ad65f4fbb128e9ad1015867fc27913e6393ade21c3908fed56aa31a74b4aa7c',
      privateKeyPhrase: 'usage desk pledge view equal coil boring sorry kiss fence thunder breeze',
    },
    cancelKey: {
      publicKey:
        '04072259c909ef1202d57d54ed1e98187feacc0d5dca9b235ff7df79eb923a4d0d8511a00f75e2c7aba20f7114d1ba7a3e36aa1c74405eaacb1abf5c576e1d94fe',
      privateKey: '83ee5d5471f475c5c6228322942a0b658340682f7432095395cbf3f3ea640bbd',
      privateKeyPhrase: 'wild crush caution hobby visual penalty holiday offer text disorder appear cart',
    },
  },

  [WalletType.KEY_2]: {
    seedPhrase: 'obscure analyst search hawk undo embody curtain master slice skill correct flee',
    cancelKey: {
      publicKey:
        '04e7dc2895538eef94067f8da59dba82604a4636cb959dc6460a7655c6f9946de8c2fd008395ee407268439fa58f65e10d646f4fe80df4216e07857e0e3018a82a',
      privateKey: 'a3cb454757335e196f304cdbd8c70a67ab14833df10a99502fdacf477e2bacd2',
      privateKeyPhrase: 'tape creek unlock lock gauge clip sting leader mechanic tooth brush appear',
    },
  },

  [WalletType.S_HD_P2SH]: {
    seedPhrase: 'roof jump holiday jaguar calm mammal vapor acoustic marine modify hope enemy',
  },

  [WalletType.S_P2SH]: {
    seedPhrase: 'cNkotrX9pRS2Se8Zr4YMssXbQ2XfJhirZLCgxbHPF87EvKKu5XtK',
  },

  [WalletType.S_HD_SEGWIT]: {
    seedPhrase: 'patrol correct rural firm special eight smooth orphan pilot oppose wealth rival',
  },
};

const moneybox = {
  address: '2NCp8UPmPXwzScnC6pS1d8q2MvarRGXinWd',
  seedPhrase: 'elegant glass unhappy fiction goat response scale joke despair hand solid vivid',
  fastKey: {
    publicKey:
      '04bff919b085937500916be58b23115e09c1a43ea2a3f577ab6ba9e637fa6e39d86855e6ea400d725f36eede053b83b967bfd7ab75971c2f4ae294c31d93cc4a3e',
    privateKey: '',
    privateKeyPhrase: '',
  },
  cancelKey: {
    publicKey:
      '042d3564005160aab0a40af4a93e995b71df1e646104222b221b78eb0da0b8e94a60735fa723a2831aad00aeb855de0d584cca049faacc536a5efb953453a1e88f',
    privateKey: '',
    privateKeyPhrase: '',
  },
};

const contactAddress = '2N6MAzhNc6LkMU6paWrPQpXLAs79rP7UnCi';

const getData = (): DataTestWallets => ({
  frozenTxWallets,
  activeTxWallets,
  moneybox,
  contactAddress,
});

export default getData;
