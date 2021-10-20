module.exports = {
  displayName: 'picking-features-trip-picking-end-summary',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/picking/features/trip-picking-end-summary',
  setupFilesAfterEnv: ['./test-setup.js'],
};
