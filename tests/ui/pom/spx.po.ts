import { Page, expect } from "@playwright/test";
import { BannerPo } from "./banner.po";

export class SpxPage {
  private bannerPo: BannerPo;

  constructor(private page: Page) {
    this.bannerPo = new BannerPo(this.page);
  }

  async navigateTo() {
    await this.page.goto("");
  }

  getBannerPo() {
    return this.bannerPo;
  }

  async getBottomPerformers() {
    await expect(
      this.page.getByText("Bottom Performers Name Last")
    ).toBeVisible();
    await this.page
      .getByText("Bottom Performers Name Last")
      .scrollIntoViewIfNeeded();
    const locators = await this.page
      .getByText("Bottom Performers Name Last")
      .locator("table tbody tr")
      .all();

    return Promise.all(
      locators.map(async (locator) => {
        const allCells = await locator.locator("td").all();
        return await Promise.all(
          allCells.map(async (cell) => await cell.textContent())
        );
      })
    );
  }

  async displayBottomPerformers(
    bottomPerformers: (string | null)[][],
    totalPerformers: number
  ) {
    if (totalPerformers > bottomPerformers.length)
      throw new Error("Total performers exceeds the limit of total performers");

    console.log(`Top ${totalPerformers} Bottom Performers`);
    for (const bottomPerformer of bottomPerformers.slice(0, totalPerformers)) {
      const [name, last, , chgp] = bottomPerformer;
      console.log(`${name} ${last} ${chgp}`);
    }
  }
}
