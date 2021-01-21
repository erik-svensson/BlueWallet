import React, { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

import { AirdropStayTuned } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

export const AirdropFinished: FC = () => (
  <View>
    <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{i18n.airdrop.finished.checkOutData}</Text>
      <View>
        <Text style={styles.description}>{i18n.airdrop.finished.readFullReport} </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('www.medium.com');
          }}
        >
          <Text style={styles.link}>{i18n.airdrop.finished.medium}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <AirdropStayTuned />
  </View>
);

export default AirdropFinished;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  link: {
    ...typography.headline5,
    color: palette.textSecondary,
    top: 2.5,
    position: 'relative',
  },
});
