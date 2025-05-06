export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  rootDir: '.',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/*.test.[jt]s?(x)'],
};
