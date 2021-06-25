import React, { FC } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { DragSortableView } from 'react-native-drag-sort';

import { WordWithKey } from 'app/consts/models';

import { Tag } from './Tag';

export interface Props {
  words: WordWithKey[];
  removable?: boolean;
  onRemove?: (keyedWord: WordWithKey) => void;
  touchable?: boolean;
  onTouch?: (keyedWord: WordWithKey) => void;
  onTagsOrderChange?: (keyedWords: WordWithKey[]) => void;
}

export const SCREEN_CONTAINER_MARGIN = 20;
const MARGIN_INSIDE_CARD = 26;
const MAXIMUM_WORD_WIDTH = 120;
const WORDS_LENGTH_INSIDE_COLUMN = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HORIZONTAL_MARGIN = 34;
const VIEW_WIDTH = SCREEN_WIDTH - SCREEN_HORIZONTAL_MARGIN * 2;

const getWordWidth = () => {
  /**
   * Sums results times two because of both sides of edges
   */
  const sumOfGlassCardMargin = MARGIN_INSIDE_CARD * 2;
  const sumOfScreenContainerMargin = SCREEN_CONTAINER_MARGIN * 2;
  const sumOfWordsMargin = MARGIN_INSIDE_CARD * WORDS_LENGTH_INSIDE_COLUMN * 2;

  const widthWithoutWords = sumOfGlassCardMargin + sumOfScreenContainerMargin + sumOfWordsMargin;
  const windowWidth = SCREEN_WIDTH;
  const leftSpaceForWords = windowWidth - widthWithoutWords;
  const oneWordSpace = Math.floor(leftSpaceForWords / WORDS_LENGTH_INSIDE_COLUMN);

  return oneWordSpace > MAXIMUM_WORD_WIDTH ? MAXIMUM_WORD_WIDTH : oneWordSpace;
};
const wordWidth = getWordWidth();

export const tagStyles = {
  width: wordWidth,
  height: 27,
  margin: MARGIN_INSIDE_CARD,
};

export const Tags: FC<Props> = ({ words, removable, onRemove, touchable, onTouch, onTagsOrderChange }) => {
  return (
    <View style={styles.container}>
      {onTagsOrderChange ? (
        <DragSortableView
          dataSource={words}
          parentWidth={VIEW_WIDTH}
          childrenWidth={tagStyles.width}
          childrenHeight={tagStyles.height}
          keyExtractor={(item: WordWithKey) => item.key}
          marginChildrenBottom={tagStyles.margin}
          marginChildrenRight={tagStyles.margin}
          marginChildrenLeft={tagStyles.margin}
          onDataChange={(tags: WordWithKey[]) => {
            onTagsOrderChange(tags);
          }}
          onClickItem={(all: WordWithKey[], wordWithKey: WordWithKey) => {
            if (onRemove) {
              onRemove(wordWithKey);
            }
          }}
          renderItem={(wordWithKey: WordWithKey, index: number) => (
            <Tag keyedWord={wordWithKey} index={index} removable={removable} />
          )}
        />
      ) : (
        words.map((wordWithKey: WordWithKey, index: number) => (
          <Tag
            key={wordWithKey.key}
            keyedWord={wordWithKey}
            onTouch={onTouch || undefined}
            touchable={touchable}
            onRemove={onRemove || undefined}
            index={index}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  dragContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    alignContent: 'center',
  },
});
