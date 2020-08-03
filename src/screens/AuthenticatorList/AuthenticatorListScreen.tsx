import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ListRenderItemInfo } from 'react-native';
import { SwipeListView, RowMap } from 'react-native-swipe-list-view';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import { icons, images } from 'app/assets';
import { Header, Image, ListEmptyState, ScreenTemplate } from 'app/components';
import { Route, Authenticator, FinalizedPSBT, CONST } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import { selectors, actions } from 'app/state/authenticators';
import { palette, typography } from 'app/styles';

import { formatDate } from '../../../utils/date';

const BigNumber = require('bignumber.js');

const BlueElectrum = require('../../../BlueElectrum');
const i18n = require('../../../loc');

interface MapStateProps {
  authenticators: Authenticator[];
  isLoading: boolean;
}

interface ActionProps {
  loadAuthenticators: Function;
  signTransaction: Function;
  deleteAuthenticator: Function;
}

type Props = NavigationInjectedProps & MapStateProps & ActionProps;

const HIDDEN_ITEM_WIDHT = 75;
const HIDDEN_ITEM_NUMBER = 3;

class AuthenticatorListScreen extends PureComponent<Props> {
  componentDidMount() {
    const { loadAuthenticators } = this.props;
    loadAuthenticators();
  }

  onDeletePress = (authenticator: Authenticator) => {
    const { deleteAuthenticator, navigation } = this.props;
    navigation.navigate(Route.DeleteEntity, {
      name: authenticator.name,
      title: i18n.authenticators.delete.title,
      subtitle: i18n.authenticators.delete.subtitle,
      onConfirm: () => {
        deleteAuthenticator(authenticator.id, {
          onSuccess: () => {
            CreateMessage({
              title: i18n.message.success,
              description: i18n.authenticators.delete.success,
              type: MessageType.success,
              buttonProps: {
                title: i18n.message.returnToAuthenticators,
                onPress: () => navigation.navigate(Route.AuthenticatorList),
              },
            });
          },
        });
      },
    });
  };

  navigateToPair = (id: string) => {
    const { navigation } = this.props;
    navigation.navigate(Route.PairAuthenticator, { id });
  };

  navigateToExport = (id: string) => {
    const { navigation } = this.props;

    navigation.navigate(Route.ExportAuthenticator, { id });
  };

  getActualSatoshiPerByte = (tx: string, feeSatoshi: number) =>
    new BigNumber(feeSatoshi).dividedBy(Math.round(tx.length / 2)).toNumber();

  signTransaction = () => {
    const { navigation, signTransaction } = this.props;
    navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (psbt: string) => {
        navigation.goBack();
        signTransaction(psbt, {
          onSuccess: ({
            finalizedPsbt: { recipients, tx, fee },
            authenticator,
          }: {
            finalizedPsbt: FinalizedPSBT;
            authenticator: Authenticator;
          }) => {
            navigation.navigate(Route.SendCoinsConfirm, {
              fee,
              // pretending that we are sending from real wallet
              fromWallet: {
                label: authenticator.name,
                preferredBalanceUnit: CONST.preferredBalanceUnit,
                broadcastTx: BlueElectrum.broadcastV2,
              },
              txDecoded: tx,
              recipients,
              satoshiPerByte: this.getActualSatoshiPerByte(tx.toHex(), fee),
            });
          },
          onFailure: Alert.alert,
        });
      },
    });
  };

  renderItem = ({ item }: { item: Authenticator }) => (
    <View style={styles.authenticatorWrapper}>
      <View style={styles.authenticatorLeftColumn}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>
          {i18n._.created} {formatDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{i18n.authenticators.list.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.buttonDescription}>{i18n.wallets.walletModal.btcv}</Text>
        <Image source={images.coin} style={styles.coinIcon} />
      </View>
      <TouchableOpacity onPress={this.signTransaction} style={styles.scanContainer}>
        <Image source={icons.scan} style={styles.scan} />
        <Text style={styles.scanText}>{i18n.authenticators.list.scan}</Text>
      </TouchableOpacity>
    </View>
  );

  renderEmptyList = () => (
    <ListEmptyState
      variant={ListEmptyState.Variant.Authenticators}
      onPress={() => this.props.navigation.navigate(Route.CreateAuthenticator)}
    />
  );

  hasAuthenticators = () => {
    const { authenticators } = this.props;
    return !!authenticators.length;
  };

  closeRow = (rowMap: RowMap<Authenticator>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  renderHiddenItem = ({ item }: ListRenderItemInfo<Authenticator>, rowMap: RowMap<Authenticator>) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          this.navigateToExport(item.id);
          this.closeRow(rowMap, item.id);
        }}
      >
        <Text style={styles.backTextWhite}>Export</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnCenter]}
        onPress={() => {
          this.navigateToPair(item.id);
          this.closeRow(rowMap, item.id);
        }}
      >
        <Text style={styles.backTextWhite}>Pair</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          this.onDeletePress(item);
          this.closeRow(rowMap, item.id);
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  getAuthenticatorsList = () => {
    const { authenticators } = this.props;
    return authenticators.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()).map(a => ({ ...a, key: a.id }));
  };

  render() {
    const { navigation, loadAuthenticators, isLoading } = this.props;

    return (
      <ScreenTemplate
        noScroll={true}
        header={
          <Header
            navigation={navigation}
            isBackArrow={false}
            title={i18n.tabNavigator.authenticators}
            addFunction={() => navigation.navigate(Route.CreateAuthenticator)}
          />
        }
      >
        {this.hasAuthenticators() ? (
          <View style={styles.container}>
            {this.renderHeader()}
            <SwipeListView
              refreshing={isLoading}
              style={styles.list}
              data={this.getAuthenticatorsList()}
              onRefresh={() => loadAuthenticators()}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-HIDDEN_ITEM_WIDHT * HIDDEN_ITEM_NUMBER}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </View>
        ) : (
          this.renderEmptyList()
        )}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState): MapStateProps => ({
  authenticators: selectors.list(state),
  isLoading: selectors.isLoading(state),
});

const mapDispatchToProps: ActionProps = {
  loadAuthenticators: actions.loadAuthenticators,
  deleteAuthenticator: actions.deleteAuthenticator,
  signTransaction: actions.signTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatorListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 5,
  },
  list: {
    paddingHorizontal: 15,
  },
  authenticatorWrapper: {
    backgroundColor: palette.white,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authenticatorLeftColumn: {
    flexGrow: 6,
  },
  name: {
    ...typography.headline5,
  },
  date: {
    color: palette.textGrey,
    ...typography.caption,
  },
  headerTitle: {
    textAlign: 'center',
    ...typography.headline4,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDescription: {
    ...typography.caption,
    color: palette.textGrey,
  },
  coinIcon: {
    width: 17,
    height: 17,
    margin: 4,
  },
  scanText: {
    ...typography.headline6,
    color: palette.textSecondary,
  },
  scan: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  scanContainer: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 26,
    marginTop: 20,
  },
  // new
  rowBack: {
    alignItems: 'center',
    backgroundColor: palette.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backTextWhite: {
    color: palette.white,
  },
  backRightBtnLeft: {
    backgroundColor: 'green',
    right: HIDDEN_ITEM_WIDHT * 2,
  },
  backRightBtnCenter: {
    backgroundColor: 'blue',
    right: HIDDEN_ITEM_WIDHT * 1,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: HIDDEN_ITEM_WIDHT * 0,
  },
});
