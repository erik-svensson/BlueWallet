import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';

import { ScreenTemplate, Text, InputItem, Button, Header, FlatButton } from 'app/components';
import { Route } from 'app/consts';
import { palette, typography } from 'app/styles';

const RNFS = require('react-native-fs');

const i18n = require('../../loc');

export class EnterPublicKey extends Component<NavigationInjectedProps> {
  state = {
    label: '',
  };

  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.wallets.publicKey.title} />,
  });

  setLabel = (label: string) => this.setState({ label });

  downloadblob = () => {
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      path: `${RNFS.DocumentDirectoryPath}/test1.jpg`,
    })
      .fetch('GET', 'https://blog.mobiversal.com/wp-content/uploads/2016/08/rsz_iphone6_plus-full.jpg', {
        //some headers ..
      })
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
      });
  };

  render() {
    return (
      <ScreenTemplate
        footer={
          <>
            <Button disabled={!this.state.label} loading={false} onPress={() => {}} title={i18n._.confirm} />
            <FlatButton
              onPress={this.downloadblob}
              containerStyle={styles.importButtonContainer}
              title={i18n.wallets.publicKey.generatePDF}
            />
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.wallets.publicKey.title}</Text>
        <Text style={styles.description}>{i18n.wallets.publicKey.description}</Text>
        <InputItem setValue={this.setLabel} label={i18n.wallets.publicKey.publicKey} />
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    marginBottom: 52,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
  importButtonContainer: {
    marginTop: 12,
  },
});
