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
exports.ProgressButton = void 0;
const react_1 = require('react');
const react_native_1 = require('react-native');
const Bar_1 = require('react-native-progress/Bar');

const components_1 = require('app/components');
const styles_1 = require('app/styles');

const noIntervalID = -1;
exports.ProgressButton = function(_a) {
  const timeoutMilis = _a.timeoutMilis,
    stepIntervalMilis = _a.stepIntervalMilis,
    onComplete = _a.onComplete,
    title = _a.title,
    inProgressTitle = _a.inProgressTitle,
    _b = _a.height,
    height = _b === void 0 ? 43 : _b,
    _c = _a.width,
    width = _c === void 0 ? 86 : _c,
    _d = _a.borderRadius,
    borderRadius = _d === void 0 ? 32.5 : _d;
  const _e = react_1.useState(false),
    inProgress = _e[0],
    setInProgress = _e[1];
  const _f = react_1.useState(0),
    progress = _f[0],
    setProgress = _f[1];
  const _g = react_1.useState(noIntervalID),
    intervalID = _g[0],
    setIntervalID = _g[1];
  const styles = react_native_1.StyleSheet.create({
    stack: {
      position: 'relative',
    },
    greyBackground: {
      backgroundColor: styles_1.palette.grey,
    },
    progressButtonContainer: {
      position: 'relative',
      height,
      width,
      borderRadius,
    },
    stackItem: {
      position: 'absolute',
    },
    button: {
      height,
      width,
      borderRadius,
      display: 'flex',
      justifyContent: 'center',
    },
    titleStyle: __assign(__assign({ alignSelf: 'center' }, styles_1.typography.button), {
      fontSize: 12,
      color: styles_1.palette.white,
    }),
  });
  react_1.useEffect(function() {
    return function() {
      clearInterval(intervalID);
    };
  }, []);
  const onPress = function() {
    setInProgress(true);
    var _intervalID = setInterval(function() {
      setIntervalID(_intervalID);
      setProgress(function(prevProgress) {
        if (prevProgress < timeoutMilis) {
          return prevProgress + stepIntervalMilis;
        } else {
          clearInterval(_intervalID);
          setIntervalID(noIntervalID);
          setInProgress(function(isInProgress) {
            if (isInProgress) {
              onComplete();
            }
            return false;
          });
          return 0;
        }
      });
    }, 100);
  };
  const undo = function() {
    clearInterval(intervalID);
    setIntervalID(noIntervalID);
    setInProgress(false);
    setProgress(0);
  };
  return react_1['default'].createElement(
    react_native_1.TouchableOpacity,
    { onPress },
    react_1['default'].createElement(
      react_native_1.View,
      { style: styles.progressButtonContainer },
      inProgress
        ? react_1['default'].createElement(
            react_native_1.View,
            { style: styles.stack },
            react_1['default'].createElement(
              react_native_1.View,
              { style: styles.stackItem },
              react_1['default'].createElement(react_native_1.View, { style: [styles.button, styles.greyBackground] }),
            ),
            react_1['default'].createElement(
              react_native_1.View,
              { style: styles.stackItem },
              react_1['default'].createElement(
                react_native_1.View,
                { style: styles.button },
                react_1['default'].createElement(Bar_1['default'], {
                  borderWidth: 0,
                  color: styles_1.palette.secondary,
                  progress: progress / timeoutMilis,
                  width: null,
                  height,
                  borderRadius,
                }),
              ),
            ),
            react_1['default'].createElement(
              react_native_1.View,
              { style: styles.stackItem },
              react_1['default'].createElement(
                react_native_1.TouchableOpacity,
                { onPress: undo },
                react_1['default'].createElement(
                  react_native_1.View,
                  { style: styles.button },
                  react_1['default'].createElement(react_native_1.Text, { style: styles.titleStyle }, inProgressTitle),
                ),
              ),
            ),
          )
        : react_1['default'].createElement(
            react_native_1.View,
            { style: styles.stack },
            react_1['default'].createElement(
              components_1.LinearGradient,
              {
                colors: [styles_1.palette.gradientSecondaryFirst, styles_1.palette.gradientSecondarySecond],
                style: styles.button,
              },
              react_1['default'].createElement(react_native_1.Text, { style: styles.titleStyle }, title),
            ),
          ),
    ),
  );
};
