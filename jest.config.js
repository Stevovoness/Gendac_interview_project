module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.config.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};