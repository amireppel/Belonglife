export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.js$': 'babel-jest',
    // process `*.tsx` files with `ts-jest`
    },
    testEnvironment: 'jest-fixed-jsdom',

    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        "\\.(css|less|scss)$": "<rootDir>/test/__mocks__/styleMock.js"
    },
    
}