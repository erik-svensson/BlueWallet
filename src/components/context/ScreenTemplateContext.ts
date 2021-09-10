import React from 'react';
import { ScrollView } from 'react-native';

export const ScreenTemplateContext = React.createContext<{ scrollViewRef: React.RefObject<ScrollView> | null }>({
  scrollViewRef: null,
});
