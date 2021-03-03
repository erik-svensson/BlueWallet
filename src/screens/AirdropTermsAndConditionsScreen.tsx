import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Header, ScreenTemplate } from 'app/components';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

export const AirdropTermsAndConditionsScreen = () => (
  <ScreenTemplate
    testID={'airdrop-terms-conditions-screen'}
    header={<Header isBackArrow title={i18n.termsConditions.header} />}
  >
    <Text style={styles.title}>{i18n.termsConditions.title}</Text>
  </ScreenTemplate>
);

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    marginTop: 16,
    textAlign: 'center',
  },
  content: {
    backgroundColor: palette.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 4,
    borderColor: palette.textBlack,
  },
});
