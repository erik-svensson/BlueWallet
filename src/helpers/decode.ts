import CryptoJS from 'crypto-js';
/**
 *
 * Provide faster and secure way to decrypt some number used for confirm email notification
 *
 *
 * @param  {string} email - user email provided from input text field
 * @param  {string} pin - string provided from /verify_email api
 * @return {string} decryptedCode - 4 digi mixedCase letter or number
 */

export const decryptCode = (email: string, pin: string) => {
  const sliceNumber = 32;

  const secret = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(email).toString());

  const unBase64CipherText = CryptoJS.enc.Base64.parse(pin);

  const extractedCipherText = unBase64CipherText.toString().slice(-sliceNumber);

  const extractedIv = unBase64CipherText.toString().slice(0, sliceNumber);

  const decrypted = CryptoJS.AES.decrypt(extractedCipherText, secret, {
    iv: CryptoJS.enc.Hex.parse(extractedIv),
    format: CryptoJS.format.Hex,
  });
  const decryptedCode = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedCode;
};
