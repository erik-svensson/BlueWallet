module.exports = {
  coverageThreshold: {
    './src/': {
      branches: 80,
      statements: 80,
      functions: 80,
      lines: 80
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx' ],
  preset: 'react-native',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation)',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
