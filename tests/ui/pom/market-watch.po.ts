import { Locator, Page, expect } from "@playwright/test";
import { BannerPo } from "./banner.po";

export class MartketWatchPage {
  private articles: Locator[] = [];
  private bannerPo: BannerPo;

  constructor(private page: Page) {
    this.bannerPo = new BannerPo(this.page);
  }

  async navigateTo() {
    await this.page.goto(
      "https://www.marketwatch.com/?mod=MW_NavHat&ns=prod/accounts-mw"
    );
  }
  getBannerPo() {
    return this.bannerPo;
  }

  async getArticles() {
    await expect(
      this.page.locator("mw-latest-news"),
      "News articles are not visible"
    ).toBeVisible();
    this.articles = await this.page
      .locator("mw-latest-news")
      .locator("li a span")
      .all();
    return this.articles;
  }

  async displayArticles(totalArticles: number) {
    if (totalArticles > this.articles.length)
      throw new Error("Total articles exceeds the limit");

    console.log(`Top ${totalArticles} Articles`);
    for (const article of this.articles.slice(0, totalArticles)) {
      const articleTitle = await article.textContent();
      console.log(articleTitle?.trim());
    }
  }
}
