module.exports = {
  presets: ['@babel/preset-typescript', 'module:metro-react-native-babel-preset'],

  plugins: [
    // 'react-native-config-node/transform',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          app: './src/',
        },
      },
    ],
  ],
};
