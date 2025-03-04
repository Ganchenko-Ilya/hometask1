/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\.tsx?$': ['ts-jest', {}],
    },
    testRegex: 'src/__tests__/.*.e2e.test.ts$',

};
