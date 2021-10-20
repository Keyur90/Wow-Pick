module.exports = {
  displayName: 'picking-features-trip-sample',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/picking/features/trip-sample',
  setupFilesAfterEnv: ['./test-setup.js'],
};
