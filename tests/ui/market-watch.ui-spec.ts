import { test, expect, Locator } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

let articles: Locator[] = [];

Given("I navigate to MarketWatch", async ({ page }) => {
  await page.goto(
    "https://www.marketwatch.com/?mod=MW_NavHat&ns=prod/accounts-mw"
  );
  await expect(
    page.getByLabel("Become a MarketWatch").getByRole("button")
  ).toBeVisible();
  await page.getByLabel("Become a MarketWatch").getByRole("button").click();
});

When("I view the latest news", async ({ page }) => {
  await expect(page.locator("mw-latest-news")).toBeVisible();
  articles = await page.locator("mw-latest-news").locator("li a span").all();
});

Then("I print out the name of the first 7 articles", async ({ page }) => {
  expect(articles.length).toBeGreaterThanOrEqual(7);
  for (const article of articles.slice(0, 7)) {
    const articleTitle = await article.textContent();
    console.log(articleTitle?.trim());
  }
});
