import { Locator, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { MartketWatchPage } from "./pom/market-watch.po";

const { Given, When, Then } = createBdd();

let marketWatch: MartketWatchPage;
let articles: Locator[];

Given("I navigate to MarketWatch", async ({ page }) => {
  marketWatch = new MartketWatchPage(page);
  await marketWatch.navigateTo();
  await marketWatch.getBannerPo().closeBanner();
});

When("I view the latest news", async ({ page }) => {
  articles = await marketWatch.getArticles();
});

Then("I print out the name of the first 7 articles", async ({ page }) => {
  await marketWatch.displayArticles(7);
});
