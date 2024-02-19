import type { Page } from "@playwright/test";

export class BannerPo {
  constructor(private page: Page) {}

  async closeBanner() {
    const visible = await this.page
      .getByLabel("Become a MarketWatch")
      .getByRole("button")
      .isVisible();

    if (visible)
      await this.page
        .getByLabel("Become a MarketWatch")
        .getByRole("button")
        .click();
  }
}
