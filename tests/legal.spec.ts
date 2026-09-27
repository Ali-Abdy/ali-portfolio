import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const legalPagesEnabled = process.env.LEGAL_PAGES_ENABLED === "true";

for (const lang of ["de", "en"] as const) {
  test(`${lang}: legal pages follow the configured publication state`, async ({
    page,
    request,
  }) => {
    if (!legalPagesEnabled) {
      for (const route of [`/${lang}/legal`, `/${lang}/privacy`]) {
        expect((await request.get(route)).status()).toBe(404);
      }
      await page.goto(`/${lang}`);
      await expect(page.locator('footer a[href$="/legal"]')).toHaveCount(0);
      await expect(page.locator('footer a[href$="/privacy"]')).toHaveCount(0);
      return;
    }

    for (const kind of ["legal", "privacy"] as const) {
      const response = await request.get(`/${lang}/${kind}`);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain('name="robots" content="noindex, follow"');

      await page.setViewportSize({ width: 320, height: 844 });
      await page.goto(`/${lang}/${kind}`);
      await expect(page).toHaveTitle(/Ali Abdi/);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("address")).toContainText("Example Street");
      await expect(page.locator("address")).toContainText("12345 Example City");
      await expect(page.locator("address")).toContainText("Germany");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.getByRole("link", {
          name: lang === "de" ? "English" : "Deutsch",
          exact: true,
        }),
      ).toHaveAttribute("href", `/${lang === "de" ? "en" : "de"}/${kind}`);
      await expect(
        page.getByRole("link", {
          name: lang === "de" ? "Zurück zum Portfolio" : "Back to portfolio",
        }),
      ).toHaveAttribute("href", `/${lang}`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }

    await page.goto(`/${lang}`);
    await expect(page.locator(`footer a[href="/${lang}/legal"]`)).toHaveCount(
      1,
    );
    await expect(page.locator(`footer a[href="/${lang}/privacy"]`)).toHaveCount(
      1,
    );
  });
}
