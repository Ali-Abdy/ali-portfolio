import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const lang of ["de", "en"] as const) {
  test(`${lang}: server-rendered content, metadata, links and accessibility`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await request.get(`/${lang}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${lang}"`);
    expect(html).toContain(lang === "de" ? "Ich lerne, indem" : "Learning by");
    await page.goto(`/${lang}`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page).toHaveTitle(/Ali Abdi/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("article")).toHaveCount(2);
    await expect(
      page.locator('button[aria-describedby="cv-status"]'),
    ).toBeDisabled();
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
    await expect(
      page.locator('a[href="mailto:aliabdihaj@gmail.com"]'),
    ).toHaveCount(1);
    for (const anchor of await page.locator('a[href^="#"]').all()) {
      const href = await anchor.getAttribute("href");
      await expect(page.locator(href!)).toHaveCount(1);
    }
    for (const link of await page.locator('a[target="_blank"]').all()) {
      expect(await link.getAttribute("rel")).toContain("noopener");
      expect(await link.getAttribute("rel")).toContain("noreferrer");
    }
    await page
      .locator(".portrait-image")
      .evaluate((image: HTMLImageElement) => image.decode());
    expect(
      await page
        .locator(".portrait-image")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
    for (const theme of ["light", "dark"] as const) {
      const target =
        theme === "light"
          ? lang === "de"
            ? "Helles Design aktivieren"
            : "Switch to light theme"
          : lang === "de"
            ? "Dunkles Design aktivieren"
            : "Switch to dark theme";
      const button = page.getByRole("button", { name: target });
      if (await button.isVisible()) await button.click();
      await expect(page.locator("html")).toHaveClass(new RegExp(theme));
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page
      .getByRole("link", {
        name: lang === "de" ? "English" : "Deutsch",
        exact: true,
      })
      .click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      lang === "de" ? "en" : "de",
    );
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ["de", "en"]) {
      await page.goto(`/${lang}`);
      await page
        .locator(".portrait-image")
        .evaluate((image: HTMLImageElement) => image.decode());
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (width <= 850) {
        const menu = page.getByRole("button", {
          name: lang === "de" ? "Menü öffnen" : "Open menu",
        });
        await menu.click();
        await expect(page.locator("#mobile-navigation")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeFocused();
        await expect(page.locator("#mobile-navigation")).toBeHidden();
        await menu.click();
        await page.locator('#mobile-navigation a[href="#projects"]').click();
        await expect(page.locator("#mobile-navigation")).toBeHidden();
        await expect(page).toHaveURL(/#projects$/);
      }
    }
  });
}

test("default route, unknown route, metadata assets, keyboard and reduced motion", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/de$/);
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  for (const route of ["/fr", "/does-not-exist"])
    expect((await request.get(route)).status()).toBe(404);
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/icon.svg",
    "/apple-icon.png",
    "/social/de",
    "/social/en",
  ]) {
    expect((await request.get(route)).status(), route).toBe(200);
  }
});
