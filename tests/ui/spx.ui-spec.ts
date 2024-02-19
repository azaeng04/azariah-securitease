import { createBdd } from "playwright-bdd";
import { SpxPage } from "./pom/spx.po";

const { Given, When, Then } = createBdd();

let spxPage: SpxPage;
let bottomPerformers: (string | null)[][] = [];

Given(
  "I navigate to the Market Watch investing section for SPX",
  async ({ page }) => {
    spxPage = new SpxPage(page);
    await spxPage.navigateTo();
    await spxPage.getBannerPo().closeBanner();
  }
);

When("I view the bottom performers", async ({ page }) => {
  bottomPerformers = await spxPage.getBottomPerformers();
});

Then(
  "I should display the first 5 names, last prices \\(LAST) and change percentages \\(CHG%) of the bottom performers",
  () => {
    spxPage.displayBottomPerformers(bottomPerformers, 5);
  }
);
