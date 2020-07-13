export const bitsToBytes = (bits: string): Buffer => {
  const bytes = bits.match(/.{1,8}/g);
  if (bytes === null) {
    throw new Error('Couldn`t find bits');
  }
  return Buffer.from(
    bytes.reduce(
      (hexBytes, byte) =>
        hexBytes +
        parseInt(byte, 2)
          .toString(16)
          .padStart(2, '0'),
      '',
    ),
    'hex',
  );
};
