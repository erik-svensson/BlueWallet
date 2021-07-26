const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts: defaultSourceExts },
  } = await getDefaultConfig();

  const sourceExts = process.env.RN_SRC_EXT
    ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
    : defaultSourceExts;

  return {
    resolver: {
      sourceExts: [...sourceExts, 'svg'],
      assetExts: assetExts.filter(ext => ext !== 'svg'),
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    minifierConfig: {
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
      mangle: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
      },
    },
  };
})();
