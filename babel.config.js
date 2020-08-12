module.exports = {
  presets: ['@babel/preset-typescript', 'module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: ['react-native-config-node/transform'],
    },
    production: {
      plugins: ['react-native-config-node/transform'],
    },
  },
};
