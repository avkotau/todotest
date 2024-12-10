module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  // setupFilesAfterEnv: ["@testing-library/jest-dom"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
};
