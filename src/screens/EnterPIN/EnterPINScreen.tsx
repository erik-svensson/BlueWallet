import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button } from 'app/components';
import { Route, Authenticator } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors } from 'app/state/authenticators';
import { AuthenticatorsState } from 'app/state/authenticators/reducer';
import { palette, typography, fonts } from 'app/styles';

const i18n = require('../../../loc');

interface MapStateProps {
  authenticator?: Authenticator;
}

type Props = NavigationInjectedProps & MapStateProps;

class EnterPINScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.authenticators.add.title} />,
  });

  navigateToExport = () => {
    const { navigation } = this.props;
    console.log('NAVIGATING EXPORT');
  };

  renderPIN = (pin: string) => (
    <View style={styles.pinWrapper}>
      {pin.split('').map((char, index) => (
        <View style={styles.pinNumber} key={index}>
          <Text style={styles.pinNumberText}>{char}</Text>
        </View>
      ))}
    </View>
  );

  render() {
    const { authenticator } = this.props;

    return (
      <ScreenTemplate
        footer={
          <>
            <Button onPress={this.navigateToExport} title={i18n.send.details.next} />
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.authenticators.enterPIN.subtitle}</Text>
        <Text style={styles.description}>{i18n.authenticators.enterPIN.description}</Text>

        {authenticator && this.renderPIN(authenticator.pin)}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState & AuthenticatorsState, props: Props): MapStateProps => {
  const id = props.navigation.getParam('id');
  return {
    authenticator: selectors.getById(state, id),
  };
};

export default connect(mapStateToProps)(EnterPINScreen);

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
  pinNumber: {
    paddingBottom: 6,
    width: 40,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  pinWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinNumberText: {
    textAlign: 'center',
    fontFamily: fonts.ubuntu.light,
    fontSize: 24,
  },
  isLoadingDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
    marginVertical: 10,
  },
  advancedOptionsLabel: {
    color: palette.textGrey,
    marginBottom: 12,
  },
  radioButton: {
    paddingStart: 0,
    paddingVertical: 8,
  },
  radioButtonContent: {
    paddingStart: 10,
    top: -3,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
  },
  importButtonContainer: {
    marginTop: 12,
  },
});
