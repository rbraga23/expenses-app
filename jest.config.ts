/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@entities/(.*)$': '<rootDir>/src/api/entities/$1',
    '^@services/(.*)$': '<rootDir>/src/api/services/$1',
    '^@controllers/(.*)$': '<rootDir>/src/api/controllers/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/api/middlewares/$1',
    '^@dto/(.*)$': '<rootDir>/src/api/dto/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
  },
  preset: 'ts-jest',
  testMatch: ['**/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup-tests.ts'],
};

export default config;
