import CryptoJS from 'crypto-js';

export const decryptCode = (email: string, pin: string) => {
  const secret = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(email).toString());

  const unBase64CipherText = CryptoJS.enc.Base64.parse(pin);

  const extractedCipherText = unBase64CipherText.toString().slice(-32);

  const extractedIv = unBase64CipherText.toString().slice(0, 32);

  const decrypted = CryptoJS.AES.decrypt(extractedCipherText, secret, {
    iv: CryptoJS.enc.Hex.parse(extractedIv),
    format: CryptoJS.format.Hex,
  });
  const decryptedCode = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedCode;
};
