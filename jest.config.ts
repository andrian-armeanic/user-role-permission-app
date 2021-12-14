export default {
    testEnvironment: "node",
    testPathIgnorePattern: [
        "/node_modules/"
    ],
    transform: {
        "^.+\\.ts?$": "ts-jest"
    }
};