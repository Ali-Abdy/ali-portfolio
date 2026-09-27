import { expect, test } from "@playwright/test";

test("browsing creates no cookies and stores only an explicitly chosen theme", async ({
  page,
  context,
}) => {
  await page.goto("/de");
  await expect(
    page.getByRole("button", { name: "Helles Design aktivieren" }),
  ).toBeVisible();
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({});
  expect(await page.evaluate(() => ({ ...sessionStorage }))).toEqual({});
  expect(await context.cookies()).toEqual([]);

  await page.getByRole("button", { name: "Helles Design aktivieren" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({
    theme: "light",
  });
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveClass(/light/);
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({
    theme: "light",
  });
  expect(await page.evaluate(() => ({ ...sessionStorage }))).toEqual({});
  expect(await context.cookies()).toEqual([]);
});

test("declining browser storage does not prevent reading or theme changes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage disabled by visitor", "SecurityError");
      },
    });
  });
  await page.goto("/en");
  await expect(page.locator("h1")).toHaveText("Ali Abdi.");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:aliabdihaj@gmail.com",
  );
  expect(errors).toEqual([]);
});

test("license notices are accessible and unused source assets are not served", async ({
  page,
  request,
}) => {
  for (const lang of ["de", "en"]) {
    await page.goto(`/${lang}`);
    await expect(
      page.getByRole("link", {
        name: lang === "de" ? "Drittanbieter-Lizenzen" : "Third-party licenses",
      }),
    ).toHaveAttribute("href", "/third-party-notices.txt");
  }
  const notices = await request.get("/third-party-notices.txt");
  expect(notices.status()).toBe(200);
  expect(notices.headers()["content-type"]).toContain("text/plain");
  const text = await notices.text();
  expect(text).toContain("SIL OPEN FONT LICENSE Version 1.1");
  expect(text).toContain("Copyright (c) 2022 Paco Coursey");
  for (const path of [
    "/profile.png",
    "/projects/luxury-barbershop.webp",
    "/assets/source/profile.png",
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
