const BASE_URL = "http://localhost:3000";
const MOCK_ROOM_ID = "abc";

let url = [
  `${BASE_URL}/rooms`,
  `${BASE_URL}/rooms/${MOCK_ROOM_ID}`,
  `${BASE_URL}/login`,
];

module.exports = {
  ci: {
    collect: {
      url,
      startServerCommand: "yarn run start",
      startServerReadyTimeout: 20000,
      numberOfRuns: 1,
      settings: {
        extends: "lighthouse:default",
        chromeFlags:
          "--no-sandbox --headless --disable-gpu --disable-dev-shm-usage",
        maxWaitForLoad: 70000,
        throttlingMethod: "devtools",
        formFactor: "desktop",
        screenEmulation: {
          disabled: true,
        },
      },
    },
    upload: {
      target: "temporary-public-storage",
      githubToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
