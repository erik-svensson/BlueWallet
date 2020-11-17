import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet, NativeScrollEvent, TouchableOpacity } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

import { EN } from 'app/assets/tc/';
import { Button, CustomModal, Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams, PasswordNavigatorParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors as authenticationSelectors } from 'app/state/authentication';
import {
  setIsTcAccepted as setIsTcAcceptedAction,
  SetIsTcAcceptedAction,
  createTc as createTcAction,
} from 'app/state/authentication/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

interface MapStateToProps {
  isPinSet: boolean;
  isTxPasswordSet: boolean;
}

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PasswordNavigatorParams, Route.CreatePin>,
    StackNavigationProp<RootStackParams, Route.TermsConditions>
  >;
  route: RouteProp<RootStackParams, Route.TermsConditions>;
  setIsTcAccepted: (isTcAccepted: boolean) => SetIsTcAcceptedAction;
  createTc: () => void;
  isPinSet: boolean;
  isTcAccepted: boolean;
  isTxPasswordSet: boolean;
}

export class TermsConditionsScreen extends React.PureComponent<Props> {
  state = {
    canGo: false,
    showWarring: false,
    height: 500,
  };

  handleCanGo = () => {
    this.setState({
      canGo: true,
    });
  };

  handleNoButton = () => {
    this.toggleModal();
  };

  handleYesButton = () => {
    RNExitApp.exitApp();
  };

  toggleModal = () => {
    this.setState({
      showWarring: !this.state.showWarring,
    });
  };

  disagreeAction = () => {
    this.toggleModal();
  };

  agreeAction = () => {
    const { isTxPasswordSet, isPinSet, setIsTcAccepted, createTc } = this.props;

    if (isTxPasswordSet && isPinSet) {
      createTc();
    } else {
      setIsTcAccepted(true);
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  renderContent = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.modalTitle}>{i18n.termsConditions.modal.header}</Text>
        <Text style={styles.modalText}>{i18n.termsConditions.modal.text}</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={this.handleNoButton}>
            <Text style={styles.modalButton}>{i18n.termsConditions.modal.noButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleYesButton}>
            <Text style={styles.modalButton}>{i18n.termsConditions.modal.yesButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { canGo, showWarring } = this.state;
    return (
      <ScreenTemplate
        isCloseToBottom={this.isCloseToBottom}
        allowedUserClick={this.handleCanGo}
        footer={
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.termsConditions.buttons.disagree}
              onPress={this.disagreeAction}
              type="outline"
              containerStyle={styles.disagreeButton}
            />
            <Button
              title={i18n.termsConditions.buttons.agree}
              onPress={this.agreeAction}
              containerStyle={styles.agreeButton}
              disabled={!canGo}
            />
          </View>
        }
        header={<Header navigation={this.props.navigation} title={i18n.termsConditions.header} />}
      >
        <Text style={styles.title}>{i18n.termsConditions.title}</Text>
        <WebView
          source={{ html: EN }}
          style={[styles.text, { height: this.state.height | 0 }]}
          originWhitelist={['*']}
          bounces={false}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          contentInset={{ top: 0, left: 0 }}
          onNavigationStateChange={title => {
            if (title.title != undefined) {
              this.setState({
                height: parseInt(title.title),
              });
            }
          }}
        >
          <CustomModal show={showWarring}>{this.renderContent()}</CustomModal>
        </WebView>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
  isPinSet: authenticationSelectors.isPinSet(state),
  isTxPasswordSet: authenticationSelectors.isTxPasswordSet(state),
});

const mapDispatchToProps = {
  setIsTcAccepted: setIsTcAcceptedAction,
  createTc: createTcAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditionsScreen);

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    marginTop: 16,
    textAlign: 'center',
  },
  text: {
    marginTop: 25,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  disagreeButton: {
    paddingRight: 10,
    width: '100%',
  },
  agreeButton: {
    paddingLeft: 10,
    width: '100%',
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
  modalTitle: {
    ...typography.headline4,
    marginTop: 16,
    marginHorizontal: 23,
  },
  modalText: {
    ...typography.caption,
    marginHorizontal: 23,
    marginTop: 10,
    lineHeight: 24,
  },
  buttonWrapper: {
    paddingTop: 15,
    alignSelf: 'flex-end',
  },
  modalButton: {
    ...typography.button,
    paddingVertical: 10,
    color: palette.secondary,
    marginHorizontal: 23,
  },
});
