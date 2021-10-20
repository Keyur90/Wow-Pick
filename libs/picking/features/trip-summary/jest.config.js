module.exports = {
  displayName: 'picking-features-trip-summary',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/picking/features/trip-summary',
  setupFilesAfterEnv: ['./test-setup.js'],
};
