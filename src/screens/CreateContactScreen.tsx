import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { icons } from 'app/assets';
import { Button, Header, InputItem, ScreenTemplate, Text, Image } from 'app/components';
import { Contact, Route, RootStackParams, CONST } from 'app/consts';
import { checkAddress } from 'app/helpers/DataProcessing';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { createContact, CreateContactAction } from 'app/state/contacts/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.CreateContact>;
  route: RouteProp<RootStackParams, Route.CreateContact>;
  createContact: (contact: Contact) => CreateContactAction;
}

interface Input {
  value: string;
  error: string;
}

interface State {
  name: Input;
  address: Input;
}

export class CreateContactScreen extends React.PureComponent<Props, State> {
  state: State = {
    name: {
      value: '',
      error: '',
    },
    address: {
      value: '',
      error: '',
    },
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.route.params?.address && !state.address.value) {
      return {
        address: {
          value: props.route.params.address,
        },
      };
    }
    return null;
  }

  get canCreateContact(): boolean {
    return !!this.state.address.value && !!this.state.name.value && !this.state.name.error && !this.state.address.error;
  }

  setName = (value: string): void => {
    this.setState({ name: { value, error: this.validateName(value.trim()) } });
  };

  setAddress = (value: string): void => this.setState({ address: { value, error: '' } });

  onBarCodeScan = (address: string): void => {
    this.setAddress(address.split('?')[0].replace('bitcoin:', ''));
  };

  createContact = () => {
    const { name, address } = this.state;

    const trimmedName = name.value.trim();
    const trimmedAddress = address.value.trim();

    const nameError = this.validateName(trimmedName);
    const addressError = this.validateAddress(trimmedAddress);

    if (addressError || nameError) {
      this.setState({
        name: { value: name.value, error: nameError },
        address: { value: address.value, error: addressError },
      });
      return;
    }
    this.props.createContact({
      id: uuidv4(),
      name: trimmedName,
      address: trimmedAddress,
    });
    this.setState(
      {
        name: { value: '', error: '' },
        address: { value: '', error: '' },
      },
      this.showSuccessImportMessageScreen,
    );
  };

  validateAddress = (value: string) => {
    try {
      checkAddress(value);
    } catch (_) {
      return i18n.send.details.address_field_is_not_valid;
    }

    return '';
  };

  validateName = (value: string) => {
    if (value.match(/[@'|"“”‘|’„”,.;]/g)?.length) {
      return i18n.contactCreate.nameCannotContainSpecialCharactersError;
    }
    return '';
  };

  onScanQrCodePress = () => {
    this.props.navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: this.onBarCodeScan,
    });
  };

  showSuccessImportMessageScreen = () =>
    CreateMessage({
      title: i18n.contactCreate.successTitle,
      description: i18n.contactCreate.successDescription,
      type: MessageType.success,
      buttonProps: {
        title: i18n.contactCreate.successButton,
        onPress: () => {
          this.props.navigation.navigate(Route.MainTabStackNavigator, { screen: Route.ContactList });
        },
      },
    });

  render() {
    const { address, name } = this.state;

    return (
      <ScreenTemplate
        footer={
          <Button
            testID="new-contact-submit-button"
            disabled={!this.canCreateContact}
            onPress={this.createContact}
            title={i18n.contactCreate.buttonLabel}
          />
        }
        header={<Header isBackArrow title={i18n.contactCreate.screenTitle} />}
      >
        <Text style={styles.subtitle}>{i18n.contactCreate.subtitle}</Text>
        <Text style={styles.description}>{i18n.contactCreate.description}</Text>
        <InputItem
          testID="new-contact-name-input"
          setValue={this.setName}
          label={i18n.contactCreate.nameLabel}
          error={name.error}
        />
        <View>
          <InputItem
            testID="new-contact-address-input"
            error={address.error}
            focused={!!address.value}
            value={address.value}
            multiline
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            maxLength={CONST.maxAddressLength}
            setValue={this.setAddress}
            label={i18n.contactCreate.addressLabel}
          />
          <TouchableOpacity
            testID="new-contact-qr-code-button"
            style={styles.scanQRCodeButton}
            onPress={this.onScanQrCodePress}
          >
            <Image style={styles.qrCodeImage} source={icons.qrCode} />
          </TouchableOpacity>
        </View>
      </ScreenTemplate>
    );
  }
}
const mapDispatchToProps = {
  createContact,
};

export default connect(null, mapDispatchToProps)(CreateContactScreen);

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    marginBottom: 40,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
  scanQRCodeButton: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 8,
  },
  qrCodeImage: {
    width: 24,
    height: 24,
    padding: 8,
  },
});
