import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

let bottomPerformers: (string | null)[][] = [];

Given(
  "I navigate to the Market Watch investing section for SPX",
  async ({ page }) => {
    await page.goto("");
    await expect(
      page.getByLabel("Become a MarketWatch").getByRole("img")
    ).toBeVisible();
    await page.getByLabel("Become a MarketWatch").getByRole("button").click();
  }
);

When("I view the bottom performers", async ({ page }) => {
  await expect(page.getByText("Bottom Performers Name Last")).toBeVisible();
  await page.getByText("Bottom Performers Name Last").scrollIntoViewIfNeeded();
  const locators = await page
    .getByText("Bottom Performers Name Last")
    .locator("table tbody tr")
    .all();

  bottomPerformers = await Promise.all(
    locators.map(async (locator) => {
      const allCells = await locator.locator("td").all();
      return await Promise.all(
        allCells.map(async (cell) => await cell.textContent())
      );
    })
  );
});

Then(
  "I should display the first 5 names, last prices \\(LAST) and change percentages \\(CHG%) of the bottom performers",
    async ({ page }) => {
      console.log("Top 5 Bottom Performers");
    for (const bottomPerformer of bottomPerformers.slice(0, 5)) {
        const [name, last, , chgp] = bottomPerformer;
        console.log(`${name} ${last} ${chgp}`);
    }
  }
);
