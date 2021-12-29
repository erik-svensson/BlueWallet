import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

import { Button, ContactAvatar, Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { typography } from 'app/styles';

import logger from '../../logger';

const i18n = require('../../loc');

type Props = {
  route: RouteProp<RootStackParams, Route.ContactQRCode>;
};

export class ContactQRCodeScreen extends React.PureComponent<Props> {
  qrCodeSVG: any;

  openShareDialog = () => {
    const { contact } = this.props.route.params;

    this.qrCodeSVG.toDataURL((data: string) => {
      const shareImageBase64 = {
        message: contact.address,
        url: `data:image/png;base64,${data}`,
      };

      try {
        Share.open(shareImageBase64);
      } catch (error) {
        if (error instanceof Error) {
          logger.warn({
            message: error.message,
            category: 'ContactQRCode',
          });
        }
      }
    });
  };

  render() {
    const { contact } = this.props.route.params;

    return (
      <ScreenTemplate
        footer={
          <Button
            testID="share-contact-qr-code-button"
            onPress={this.openShareDialog}
            title={i18n.contactDetails.share}
          />
        }
        header={<Header isBackArrow title={contact.name} />}
      >
        <ContactAvatar name={contact.name} />
        <View testID="share-contact-qr-code" style={styles.qrCodeContainer}>
          <QRCode quietZone={10} value={contact.address} size={140} ecl={'H'} getRef={ref => (this.qrCodeSVG = ref)} />
        </View>
        <Text style={styles.address}>{contact.address}</Text>
      </ScreenTemplate>
    );
  }
}

export default ContactQRCodeScreen;

const styles = StyleSheet.create({
  qrCodeContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  address: {
    ...typography.headline5,
    textAlign: 'center',
  },
});
