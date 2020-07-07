const HDNode = require('bip32');
const bip39 = require('bip39');

const mnemonic = 'filter dog grocery license walnut river course again depth refuse summer vivid';
const seed = bip39.mnemonicToSeedSync(mnemonic);

const root = HDNode.fromSeed(seed);

const child = root.derivePath("m/49'/440'/0'");

const privateKey = '2ea63cd06457e1d3f6228c7e1c020422912e262c7ddacaf357f5ea0621638996';
console.log(child.privateKey.toString('hex'));
