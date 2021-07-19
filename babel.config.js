module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          app: './src',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV', 'LOG_BOX_IGNORE', 'CHAMBER_OF_SECRETS'],
      },
    ],
  ],
  env: {
    test: {
      plugins: ['react-native-config-node/transform'],
    },
  },
};
