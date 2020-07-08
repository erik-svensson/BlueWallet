const HDNode = require('bip32');
const bip39 = require('bip39');
const { pbkdf2 } = require('pbkdf2');

const config = require('./config');

// (async () => {
//   // const mnemonic = 'filter dog grocery license walnut river course again depth refuse summer vivid';
const mnemonic = 'desert season travel unique clinic pass eager know elephant dune stick breeze';

//   const mnemonicArr = mnemonic.split(' ');

//   let randombits132 = '';
//   mnemonicArr.map(word => {
//     const index = bip39.wordlists.english.indexOf(word);
//     console.log('index', index);
//     const bit = index.toString(2).padStart(11, '0');
//     console.log('bit', bit);
//     randombits132 += bit;
//   });
//   console.log('bits', randombits132);
//   console.log('randombits128 length', randombits132.slice(0, 4));
//   const randombits128 = randombits132.slice(4);
//   console.log('randombits128 length', randombits128);

//   const bla = pbkdf2(randombits128, randombits132.slice(0, 4), 1, 32, 'sha256', (_, callback) => {
//     console.log('callback', callback);
//     // ECPair.fromPublicKey(Buffer.from(p, BUFFER_ENCODING), {
//     //   network: config.network,
//     // });
//     console.log(callback.toString('hex'));
//   });
// })();

// const seed = bip39.mnemonicToSeedSync(mnemonic);
// const node = HDNode.fromSeed(seed, config.network).privateKey;
// console.log('node', node.toString('hex'));
HDSegwitP2SHArWallet.mnemonicToKeyPair(mnemonic);
const privateKey = '2ea63cd06457e1d3f6228c7e1c020422912e262c7ddacaf357f5ea0621638996';

// const generateWordsFromBytes = (random132bits) => {
//   const dividedBits = random132bits.match(/.{1,11}/g);
//   return dividedBits?.map(bit => {
//     const index = parseInt(bit, 2);
//     return bip39.wordlists.english[index];
//   });
// };
