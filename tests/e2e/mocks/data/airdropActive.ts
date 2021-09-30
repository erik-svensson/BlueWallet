import dayjs from 'dayjs';

export default {
  get: {
    '/airdrop/': {
      status: 200,
      body: {
        result: {
          users: 44,
          ends: dayjs().add(1, 'd'),
          goals: {
            '100': 'first goal',
            '1000': 'second goal',
            '10000': 'third goal',
          },
          badges: {
            '2': 'Shrimp',
            '4': 'Crab',
            '7': 'Shark',
            '10': 'Whale',
          },
          award_amount: {
            '100': '1,000',
            '500': '10,000',
            '1500': '50,000',
          },
        },
      },
    },
  },
};
