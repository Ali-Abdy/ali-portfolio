import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const lang of ["de", "en"] as const) {
  test(`${lang}: server-rendered content, working links, themes and accessibility`, async ({
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
    expect(html).toContain(
      lang === "de" ? "Webentwicklung mit" : "Web development with",
    );
    await page.goto(`/${lang}`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page).toHaveTitle(/Ali Abdi/);
    await expect(page.locator("h1")).toHaveText("Ali Abdi.");
    await expect(page.locator("article")).toHaveCount(2);
    await expect(page.locator("main > section").nth(1)).toHaveAttribute(
      "id",
      "projects",
    );
    await expect(page.locator("button:disabled")).toHaveCount(0);
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
    const cv = page.getByRole("link", {
      name: lang === "de" ? "Lebenslauf anfragen" : "Request my CV",
    });
    await expect(cv).toHaveAttribute(
      "href",
      /^mailto:aliabdihaj@gmail.com\?subject=.+/,
    );
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
    // Both disclosures are independently keyboard operable, and details remain accessible when expanded.
    for (const summary of await page
      .locator(".project-details summary")
      .all()) {
      await summary.focus();
      await page.keyboard.press("Enter");
    }
    await expect(page.locator(".project-details[open]")).toHaveCount(2);
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
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    expect(errors).toEqual([]);
  });

  test(`${lang}: section navigation and language switch retain reading context`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/${lang}`);
    await page.locator('.desktop-nav a[href="#skills"]').click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(
      page.locator('.desktop-nav a[href="#skills"]'),
    ).toHaveAttribute("aria-current", "location");
    await page
      .getByRole("link", {
        name: lang === "de" ? "English" : "Deutsch",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${lang === "de" ? "en" : "de"}#skills$`),
    );
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      lang === "de" ? "en" : "de",
    );
    await expect(
      page.locator('.desktop-nav a[href="#skills"]'),
    ).toHaveAttribute("aria-current", "location");
    // Project evidence links land below the sticky header and retain a usable permalink.
    await page.locator('.skill-row a[href="#skycast"]').click();
    await expect(page).toHaveURL(/#skycast$/);
    await expect
      .poll(async () => (await page.locator("#skycast").boundingBox())!.y)
      .toBeGreaterThan(70);
    await expect(
      page.locator('.desktop-nav a[href="#projects"]'),
    ).toHaveAttribute("aria-current", "location");
    await page.locator('.desktop-nav a[href="#contact"]').click();
    await expect(
      page.locator('.desktop-nav a[href="#contact"]'),
    ).toHaveAttribute("aria-current", "location");
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
      for (const summary of await page
        .locator(".project-details summary")
        .all())
        await summary.click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (width <= 850) {
        const menu = page.locator(".menu-toggle");
        await menu.click();
        await expect(page.locator("#mobile-navigation")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeFocused();
        await expect(page.locator("#mobile-navigation")).toBeHidden();
        await menu.click();
        await page.locator('#mobile-navigation a[href="#projects"]').click();
        await expect(page.locator("#mobile-navigation")).toBeHidden();
        await expect(page).toHaveURL(/#projects$/);
        await expect(page.locator("#projects")).toBeFocused();
        await menu.click();
        await page.locator("#projects-title").click();
        await expect(page.locator("#mobile-navigation")).toBeHidden();
      }
    }
  });
}

test("email copying succeeds and clipboard refusal has a usable fallback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/de#contact");
  await page.getByRole("button", { name: "Adresse kopieren" }).click();
  await expect(page.getByRole("status")).toHaveText("E-Mail-Adresse kopiert.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "aliabdihaj@gmail.com",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: async () => {
        throw new Error("Permission denied");
      },
      configurable: true,
    });
  });
  await page.getByRole("button", { name: "Kopiert", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Bitte markieren und kopieren",
  );
  await expect(page.locator(".contact-email")).toHaveText(
    "aliabdihaj@gmail.com",
  );
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:aliabdihaj@gmail.com",
  );
});

test("printing includes project details and restores the reader’s open sections", async ({
  page,
}) => {
  await page.goto("/en");
  await page.locator(".project-details summary").first().click();
  await page.evaluate(() => {
    window.print = () => {
      window.dispatchEvent(new Event("beforeprint"));
    };
  });
  await page.getByRole("button", { name: "Print portfolio" }).click();
  // Repeated beforeprint events must not overwrite the saved disclosure state.
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await expect(page.locator(".project-details[open]")).toHaveCount(2);
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".print-control")).toBeHidden();
  await expect(page.locator(".project-detail-grid").last()).toBeVisible();
  await expect(page.locator(".print-source").first()).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ media: "screen" });
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(page.locator(".project-details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".project-details").last()).not.toHaveAttribute(
    "open",
    "",
  );
});

test("mobile content, navigation, disclosures and contact work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/de");
  await expect(page.locator("h1")).toHaveText("Ali Abdi.");
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.locator('#mobile-navigation a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await page.locator(".menu-toggle").click();
  await page.locator(".project-details summary").first().click();
  await expect(page.locator(".project-detail-grid").first()).toBeVisible();
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:aliabdihaj@gmail.com",
  );
  await expect(page.locator(".copy-email")).toBeHidden();
  await expect(page.locator(".print-control")).toBeHidden();
  await context.close();
});

test("mobile menu closes when focus leaves or the viewport changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/de");
  await page.locator(".menu-toggle").click();
  await page.locator('#mobile-navigation a[href="#contact"]').focus();
  await page.keyboard.press("Tab");
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await page.locator(".menu-toggle").click();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#mobile-navigation")).toBeHidden();
});

test("Antigravity remains local, responsive, and disabled for reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/de");
  await expect(page.locator(".hero-antigravity canvas")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".hero-antigravity canvas")).toHaveCount(0);
});

test("default route, unknown routes, metadata assets, keyboard and reduced motion", async ({
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
