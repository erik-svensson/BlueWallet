import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import JSONTree from 'react-native-json-tree';

import { ScreenTemplate, Header, Text } from 'app/components';
import config from 'app/config';
import { fonts } from 'app/styles';

const i18n = require('../../../loc');

const theme = {
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a',
};

export const DeveloperScreen = () => {
  return (
    <>
      <ScreenTemplate header={<Header isBackArrow={true} title={i18n.developer.header} />}>
        <View style={styles.container}>
          <Text style={styles.label}>{i18n.developer.config}</Text>
          <JSONTree data={config} theme={theme} hideRoot />
        </View>
      </ScreenTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: { width: Dimensions.get('window').width - 180 },
  label: {
    fontSize: 18,
    fontFamily: fonts.ubuntu.bold,
    marginBottom: 20,
  },
});
