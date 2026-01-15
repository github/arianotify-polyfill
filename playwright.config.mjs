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
      name: 'firefox', // Use Firefox because Firefox doesn’t have a native implementation of 'ariaNotify' (as of 2026-01-15), so we can test the polyfill in it.
      use: devices['Desktop Firefox'],
    },
  ],
  quiet: false,
};

export default config;
