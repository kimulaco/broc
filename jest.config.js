module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  testMatch: ['**/test/**/*.test.ts', '**/test/**/*.test.js'],
  collectCoverageFrom: ['**/src/**/*.ts']
}
