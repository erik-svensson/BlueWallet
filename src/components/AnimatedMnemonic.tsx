import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Chip } from 'app/components';

export interface WordWithKey {
  word: string;
  key: string;
}

interface Props {
  mnemonic: WordWithKey[];
  testID?: string;
}

export const AnimatedMnemonic = ({ mnemonic, testID }: Props) => (
  <View testID={testID} style={styles.mnemonicPhraseContainer}>
    {mnemonic.map(({ word, key }) => (
      <View style={styles.chipContainer} key={key}>
        <Chip label={`${word}`} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  chipContainer: {
    marginEnd: 16,
    marginBottom: 16,
  },
  mnemonicPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
