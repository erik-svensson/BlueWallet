declare module 'react-native-flexi-radio-button';
declare module 'react-native-progress/Bar';
declare module 'bs58check';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;

  export default content;
}
