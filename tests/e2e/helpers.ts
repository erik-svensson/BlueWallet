export const SECOND = 1000;

export const WAIT_FOR_ELEMENT_TIMEOUT = 10 * SECOND;

interface ECDSA {
  PUBLIC_KEY: string;
  PRIVATE_KEY_PHRASE: string;
  PRIVATE_KEY: string;
}

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

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
