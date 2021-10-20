module.exports = {
  displayName: 'picking-features-trip-item',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/picking/features/trip-item',
  setupFilesAfterEnv: ['./test-setup.js'],
};
