module.exports = {
  displayName: 'picking-features-trip-collectible',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/picking/features/trip-collectible',
  setupFilesAfterEnv: ['./test-setup.js'],
};
