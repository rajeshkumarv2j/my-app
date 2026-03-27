module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.js'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
