import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { defineBddConfig } from "playwright-bdd";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

if (!process.env.NODE_ENV) process.env.NODE_ENV = "local";

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
  override: true,
});

const testDir = defineBddConfig({
  paths: ["./tests/ui/features/*.feature"],
  require: ["./tests/ui/*.ui-spec.ts", "./tests/ui/*.api-spec.ts"],
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testMatch: "**/*.ui-spec.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.marketwatch.com/investing/index/spx",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      testDir,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      testDir,
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      testDir,
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://restcountries.com",
      },
      testMatch: "**/*.api-spec.ts",
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
