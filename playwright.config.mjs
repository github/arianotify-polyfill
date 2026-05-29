import { screenReaderConfig } from "@guidepup/playwright";
import { devices } from "@playwright/test";
import * as url from "node:url";

const config = {
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 3 * 60 * 1000,
  retries: 0,
  projects: [
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
  ],
  quiet: false,
};

export default config;
