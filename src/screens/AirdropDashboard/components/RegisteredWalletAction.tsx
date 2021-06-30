import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { images } from 'app/assets';
import { Image } from 'app/components';

interface Props {
  onActionClick: () => void;
}

export const RegisteredWalletAction: FC<Props> = ({ onActionClick }) => {
  return (
    <TouchableOpacity style={styles.arrowContainer} testID="forward-button" onPress={onActionClick}>
      <Image style={styles.image} source={images.forwardArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    height: 24,
    width: 24,
    top: 7,
    left: 12,
  },
  image: {
    width: 7,
    height: 12,
  },
});
