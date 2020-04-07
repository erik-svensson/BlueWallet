import { LinearGradient } from './Gradient';
import React, { ReactChild } from 'react';
import { ViewStyle } from 'react-native';

import { GradientVariants } from 'consts';
import { gradients } from 'styles';

interface Props {
  children?: ReactChild;
  variant: GradientVariants;
  style?: ViewStyle;
}

export const GradientView = ({ children, variant, style, ...props }: Props) => {
  return (
    <LinearGradient colors={gradients[variant]} style={style} {...props}>
      {children}
    </LinearGradient>
  );
};

export { GradientVariants };
