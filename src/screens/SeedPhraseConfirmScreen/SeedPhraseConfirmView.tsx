import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { palette, typography } from 'app/styles';

export interface Props {
  secret: string;
}

export const SeedPhraseConfirmView: FC<Props> = ({ secret }) => {
  //TODO

  return (
    <>
      <View style={styles.mnemonicPhraseContainer}></View>
      <View style={styles.mnemonicPhraseUnselectedContainer}></View>
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
