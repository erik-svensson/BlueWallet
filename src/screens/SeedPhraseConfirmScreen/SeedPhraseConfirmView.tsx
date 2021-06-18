import { shuffle } from 'lodash/fp';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedMnemonic } from 'app/components';
import { mnemonicWordsToKeyedMnemonic } from 'app/helpers/helpers';
import { palette, typography } from 'app/styles';

export interface Props {
  secret: string;
}

export const SeedPhraseConfirmView: FC<Props> = ({ secret }) => {
  //TODO

  return (
    <>
      <View style={styles.mnemonicPhraseContainer}>
        <AnimatedMnemonic mnemonic={mnemonicWordsToKeyedMnemonic(secret)} />
      </View>
      <View style={styles.mnemonicPhraseUnselectedContainer}>
        <AnimatedMnemonic mnemonic={shuffle(mnemonicWordsToKeyedMnemonic(secret))} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mnemonicPhraseContainer: {
    flex: 1,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 20,
  },
  mnemonicPhraseUnselectedContainer: {
    flex: 1,
  },
});
