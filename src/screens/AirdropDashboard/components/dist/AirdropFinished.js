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
exports.__esModule = true;
exports.AirdropFinished = void 0;
const react_1 = require('react');
const react_native_1 = require('react-native');

const components_1 = require('app/components');
const styles_1 = require('app/styles');

const i18n = require('../../../../loc');

exports.AirdropFinished = function(_a) {
  const route = _a.route;
  return react_1['default'].createElement(
    react_native_1.View,
    null,
    react_1['default'].createElement(react_native_1.Text, { style: styles.subtitle }, i18n.airdrop.finished.subtitle),
    react_1['default'].createElement(
      react_native_1.View,
      { style: styles.descriptionContainer },
      react_1['default'].createElement(
        react_native_1.Text,
        { style: styles.description },
        i18n.airdrop.finished.checkOutData,
      ),
      react_1['default'].createElement(
        react_native_1.View,
        null,
        react_1['default'].createElement(
          react_native_1.Text,
          { style: styles.description },
          i18n.airdrop.finished.readFullReport,
          ' ',
        ),
        react_1['default'].createElement(
          react_native_1.TouchableOpacity,
          {
            onPress() {
              react_native_1.Linking.openURL('www.medium.com');
            },
          },
          react_1['default'].createElement(react_native_1.Text, { style: styles.link }, i18n.airdrop.finished.medium),
        ),
      ),
    ),
    react_1['default'].createElement(components_1.AirdropStayTuned, null),
  );
};
exports['default'] = exports.AirdropFinished;
var styles = react_native_1.StyleSheet.create({
  subtitle: __assign(__assign({ marginTop: 12, marginBottom: 18 }, styles_1.typography.headline4), {
    textAlign: 'center',
  }),
  description: __assign(__assign({}, styles_1.typography.body), {
    color: styles_1.palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  }),
  descriptionContainer: {
    marginBottom: 32,
  },
  link: __assign(__assign({}, styles_1.typography.headline5), {
    color: styles_1.palette.textSecondary,
    top: 2.5,
    position: 'relative',
  }),
  firstLine: __assign(__assign({}, styles_1.typography.headline5), { textAlign: 'center' }),
  secondLine: __assign(__assign({}, styles_1.typography.body), {
    color: styles_1.palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  }),
  socialsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 8,
  },
  facebookButtonContainer: {
    marginRight: 23,
  },
});
