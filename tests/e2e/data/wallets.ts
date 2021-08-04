import { DataTestWallets } from '../types';

export const getWallets = (testWalletsVarName: string): DataTestWallets => {
  const dataString = process.env[testWalletsVarName];
  let data: DataTestWallets;

  if (dataString) {
    data = JSON.parse(dataString);
  } else {
    throw new Error(`Mainnet test data not found. Please provide it in ${testWalletsVarName} env variable`);
  }
  return data;
};
