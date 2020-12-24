module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/tests/e2e'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|react-navigation|@react-native-community|@sentry/*)'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', 'class/**/*.{js,ts,tsx}', 'utils/**/*.{js,ts,tsx}'],
};
