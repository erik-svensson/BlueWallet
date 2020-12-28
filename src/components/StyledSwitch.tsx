import React from 'react';
import { Switch } from 'react-native';

import { palette } from 'app/styles';

interface Props {
  onValueChange?: (value: boolean) => void;
  value?: boolean;
  disabled?: boolean;
  testID?: string;
}

const trackColor = {
  false: palette.border,
  true: palette.secondary,
};

export const StyledSwitch = ({ onValueChange, value, disabled, testID }: Props) => (
  <Switch
    testID={testID}
    thumbColor={palette.background}
    ios_backgroundColor={palette.white}
    trackColor={trackColor}
    value={value}
    onValueChange={onValueChange}
    disabled={disabled}
  />
);
