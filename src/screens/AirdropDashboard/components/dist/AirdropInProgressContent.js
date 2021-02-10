'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
const __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };

exports.__esModule = true;
exports.AirdropInProgressContent = void 0;
const react_1 = require('react');
const react_native_1 = require('react-native');

const assets_1 = require('app/assets');
const components_1 = require('app/components');
const airdrop_1 = require('app/helpers/airdrop');
const styles_1 = require('app/styles');

const i18n = require('../../../../loc');
const _1 = require('./');
const Error_1 = require('./Error');

exports.AirdropInProgressContent = function(_a) {
  const error = _a.error,
    loading = _a.loading,
    subscribedWallets = _a.subscribedWallets,
    availableWallets = _a.availableWallets,
    subscribeWallet = _a.subscribeWallet,
    usersQuantity = _a.usersQuantity;
  const _b = react_1.useState(false),
    communityCarouselActive = _b[0],
    setCommunityCarouselActive = _b[1];
  const _c = react_1.useState([]),
    loadingWalletsIds = _c[0],
    setLoadingWalletsIds = _c[1];
  let _carouselRef;
  const setRef = function(carouselRef) {
    _carouselRef = carouselRef;
  };

  react_1.useEffect(
    function() {
      const idsToRemove = [];

      loadingWalletsIds.forEach(function(id) {
        if (
          !availableWallets.filter(function(w) {
            return w.id === id;
          })[0]
        ) {
          idsToRemove.push(id);
        }
      });
      const stillLoading = loadingWalletsIds.filter(function(id) {
        return !idsToRemove.includes(id);
      });

      setLoadingWalletsIds(stillLoading);
    },
    [availableWallets, loading],
  );
  const _subscribeWallet = function(wallet) {
    setLoadingWalletsIds(__spreadArrays(loadingWalletsIds, [wallet.id]));
    subscribeWallet(wallet);
  };
  const setCarouselActiveElement = function(wallet) {
    const snapIndex = subscribedWallets.findIndex(function(w) {
      return w.id === wallet.id;
    });

    _carouselRef.snapToItem(snapIndex || 0, true);
  };
  const onCarouselItemSnap = function(index) {
    setCommunityCarouselActive(index === subscribedWallets.length);
  };
  const userHasSubscribedWallets =
    (subscribedWallets === null || subscribedWallets === void 0 ? void 0 : subscribedWallets.length) > 0;
  const getCarouselItems = function(subscribedWallets, usersQuantity) {
    const renderableWallets = subscribedWallets.map(airdrop_1.getCarouselItem);

    return airdrop_1.isAfterAirdrop()
      ? renderableWallets
      : __spreadArrays(renderableWallets, [airdrop_1.getCommunityItem(usersQuantity)]);
  };

  if (error) {
    return react_1['default'].createElement(
      react_native_1.View,
      { style: styles.errorContainer },
      react_1['default'].createElement(Error_1.Error, null),
    );
  }
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    userHasSubscribedWallets
      ? react_1['default'].createElement(
          react_1['default'].Fragment,
          null,
          react_1['default'].createElement(components_1.AirdropCarousel, {
            styles: styles.carouselStyles,
            items: getCarouselItems(subscribedWallets, usersQuantity),
            setRef,
            onItemSnap: onCarouselItemSnap,
          }),
          !communityCarouselActive &&
            react_1['default'].createElement(
              react_native_1.View,
              { style: styles.walletsListContainer },
              react_1['default'].createElement(components_1.AirdropWalletsList, {
                wallets: subscribedWallets,
                title: i18n.airdrop.dashboard.registeredWallets,
                itemCallToAction(wallet) {
                  return react_1['default'].createElement(_1.RegisteredWalletAction, {
                    onActionClick() {
                      return setCarouselActiveElement(wallet);
                    },
                  });
                },
              }),
            ),
        )
      : react_1['default'].createElement(
          react_1['default'].Fragment,
          null,
          react_1['default'].createElement(components_1.Image, {
            source: assets_1.images.airdrop,
            style: styles.airdropImage,
          }),
          react_1['default'].createElement(
            react_native_1.Text,
            { style: styles.description },
            i18n.airdrop.dashboard.desc2,
          ),
        ),
    (availableWallets === null || availableWallets === void 0 ? void 0 : availableWallets.length) > 0 &&
      !communityCarouselActive &&
      react_1['default'].createElement(
        react_native_1.View,
        { style: styles.walletsListContainer },
        react_1['default'].createElement(components_1.AirdropWalletsList, {
          wallets: availableWallets,
          title: i18n.airdrop.dashboard.availableWallets,
          itemCallToAction(wallet) {
            return react_1['default'].createElement(_1.AvailableWalletAction, {
              onActionClick() {
                return _subscribeWallet(wallet);
              },
            });
          },
          loadingWalletsIds,
        }),
      ),
    userHasSubscribedWallets &&
      !communityCarouselActive &&
      react_1['default'].createElement(
        react_native_1.View,
        { style: styles.communitySectionContainer },
        react_1['default'].createElement(_1.CommunitySection, {
          onActionClick() {
            _carouselRef.snapToItem(subscribedWallets.length, true);
          },
        }),
      ),
    communityCarouselActive && react_1['default'].createElement(_1.CommunityAchievementsList, { usersQuantity }),
  );
};
var styles = react_native_1.StyleSheet.create({
  communitySectionContainer: {
    flex: 1,
    width: '100%',
    marginTop: 16,
    marginBottom: 18,
  },
  errorContainer: {
    marginTop: 10,
  },
  carouselStyles: {
    paddingTop: 36,
    paddingBottom: 24,
  },
  walletsListContainer: {
    marginTop: 12,
    width: '100%',
  },
  airdropImage: {
    width: 189,
    height: 193,
    marginTop: 27.5,
    marginBottom: 20,
  },
  description: __assign(__assign({}, styles_1.typography.caption), {
    color: styles_1.palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  }),
});
