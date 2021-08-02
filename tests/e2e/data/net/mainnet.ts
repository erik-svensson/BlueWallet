import fs from 'fs';

import { DataTestWallets } from '../../types';

const getData = (): DataTestWallets => {
  console.log('Searching for mainnet test data');
  const dataString = process.env['DETOX_MAINNET_WALLETS'];
  let data: DataTestWallets;

  if (dataString) {
    data = JSON.parse(dataString);
  } else {
    const file = fs.readFileSync('./tests/e2e/data/mainnet-wallets.json', 'utf-8');

    data = JSON.parse(file);
  }

  if (!data) {
    throw new Error(
      'Mainnet test data not found. Please provide it in DETOX_MAINNET_WALLETS env variable or test/e2e/data/mainnet-wallets.json',
    );
  } else {
    console.log('Mainnet test data found');
  }

  return data;
};

export default getData;
