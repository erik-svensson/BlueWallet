import React, { FC } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { Chip } from 'app/components';
import { WordWithKey } from 'app/consts/models';

export interface Props {
  keyedWord: WordWithKey;
  removable?: boolean;
  onRemove?: (keyedWord: WordWithKey) => void;
  touchable?: boolean;
  onTouch?: (keyedWord: WordWithKey) => void;
  index?: number;
}
export const SCREEN_CONTAINER_MARGIN = 20;

export const Tag: FC<Props> = ({ keyedWord, removable, onRemove, index, touchable, onTouch }) => {
  let wordComponent = (
    <View style={styles.chipContainer}>
      <Chip label={`${keyedWord.word}`} />
    </View>
  );

  if (removable && onRemove) {
    wordComponent = <TouchableOpacity onPress={() => onRemove(keyedWord)}>{wordComponent}</TouchableOpacity>;
  }

  if (touchable && onTouch) {
    wordComponent = <TouchableOpacity onPress={() => onTouch(keyedWord)}>{wordComponent}</TouchableOpacity>;
  }

  return wordComponent;
};

const styles = StyleSheet.create({
  chipContainer: {
    marginEnd: 16,
    marginBottom: 16,
  },
});
