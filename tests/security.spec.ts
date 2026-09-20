import { expect, test } from "@playwright/test";

test("production responses enforce browser security boundaries", async ({
  request,
}) => {
  for (const path of ["/de", "/en", "/not-a-page", "/icon.svg", "/social/de"]) {
    const response = await request.get(path);
    const headers = response.headers();
    expect(headers["x-content-type-options"], path).toBe("nosniff");
    expect(headers["x-frame-options"], path).toBe("DENY");
    expect(headers["referrer-policy"], path).toBe("no-referrer");
    expect(headers["cross-origin-opener-policy"], path).toBe("same-origin");
    expect(headers["strict-transport-security"], path).toBe("max-age=31536000");
    expect(headers["permissions-policy"], path).toContain("camera=()");
    expect(headers["permissions-policy"], path).toContain("microphone=()");
    const csp = headers["content-security-policy"];
    for (const directive of [
      "default-src 'self'",
      "script-src-attr 'none'",
      "connect-src 'self'",
      "base-uri 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'none'",
    ])
      expect(csp, path).toContain(directive);
    expect(csp, path).not.toContain("unsafe-eval");
    expect(csp, path).not.toContain("ws:");
    expect(headers["x-powered-by"], path).toBeUndefined();
    expect(headers["access-control-allow-origin"], path).toBeUndefined();
    expect(headers["set-cookie"], path).toBeUndefined();
  }
});

test("image processing accepts only the portrait and bounded sizes and quality", async ({
  request,
}) => {
  const valid = await request.get("/_next/image", {
    params: { url: "/profile.webp", w: 300, q: 75 },
    headers: { Accept: "image/webp" },
  });
  expect(valid.status()).toBe(200);
  expect(valid.headers()["content-type"]).toBe("image/webp");
  expect(valid.headers()["content-disposition"]).toContain("attachment");

  for (const url of [
    "/profile.png",
    "/social/de",
    "/icon.svg",
    "/profile.webp?variant=unbounded",
    "https://security-test.invalid/image.webp",
    "http://127.0.0.1:3107/de",
    "//security-test.invalid/image.webp",
  ]) {
    const response = await request.get("/_next/image", {
      params: { url, w: 300, q: 75 },
    });
    expect(response.status(), url).toBe(400);
  }
  for (const params of [
    { w: 3840, q: 75 },
    { w: 300, q: 100 },
  ]) {
    const response = await request.get("/_next/image", {
      params: { url: "/profile.webp", ...params },
    });
    expect(response.status()).toBe(400);
  }
});

test("fixed social cards stay read-only and reject unsupported locales", async ({
  request,
}) => {
  for (const lang of ["de", "en"]) {
    const response = await request.get(`/social/${lang}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
    expect(response.headers()["x-nextjs-cache"]).toBe("HIT");
    const query = await request.get(`/social/${lang}?title=untrusted`);
    expect(await query.body()).toEqual(await response.body());
    // This Next.js version serves the prerendered asset for non-GET methods too.
    // Verify that their bodies cannot change the card or trigger a mutation.
    for (const method of ["POST", "PUT", "DELETE"]) {
      const attemptedWrite = await request.fetch(`/social/${lang}`, {
        method,
        data: { title: "untrusted" },
      });
      expect(attemptedWrite.status()).toBe(200);
      expect(await attemptedWrite.body()).toEqual(await response.body());
    }
    expect(await (await request.get(`/social/${lang}`)).body()).toEqual(
      await response.body(),
    );
  }
  for (const lang of ["fr", "undefined", "de-extra"]) {
    expect((await request.get(`/social/${lang}`)).status()).toBe(404);
    expect((await request.get(`/${lang}`)).status()).toBe(404);
  }
});

test("private project files and query payloads are not exposed", async ({
  request,
}) => {
  for (const path of [
    "/.env",
    "/.env.local",
    "/.git/config",
    "/package.json",
    "/next.config.ts",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    expect(await response.text()).not.toContain("/Users/ali/");
  }
  const payload = "<script>window.securityProbe=true</script>";
  const response = await request.get("/de", {
    params: { query: payload, next: "https://security-test.invalid" },
  });
  expect(response.status()).toBe(200);
  expect(await response.text()).not.toContain(payload);
  expect(response.headers().location).toBeUndefined();
});

test("normal browsing has no CSP violations or third-party resource requests", async ({
  page,
}) => {
  const foreignRequests: string[] = [];
  const cspErrors: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:3107")
      foreignRequests.push(request.url());
  });
  page.on("console", (message) => {
    if (/content security policy|violates.*directive/i.test(message.text()))
      cspErrors.push(message.text());
  });
  await page.goto("/de");
  await page.getByRole("button", { name: "Helles Design aktivieren" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page
    .locator(".portrait-image")
    .evaluate((image: HTMLImageElement) => image.decode());
  expect(foreignRequests).toEqual([]);
  expect(cspErrors).toEqual([]);
});

test("the browser blocks inline handlers, foreign scripts and outbound connections", async ({
  page,
}) => {
  // Fulfill locally if a regression allows this URL; never contact an external host.
  await page.route("https://security-test.invalid/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "document.documentElement.dataset.foreignScript = 'executed'",
    }),
  );
  await page.goto("/de");
  await page.evaluate(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      const current = document.documentElement.dataset.blockedDirectives ?? "";
      document.documentElement.dataset.blockedDirectives = `${current} ${event.effectiveDirective}`;
    });
    const button = document.createElement("button");
    button.setAttribute(
      "onclick",
      "document.documentElement.dataset.inlineHandler = 'executed'",
    );
    document.body.append(button);
    button.click();
    button.remove();
    const script = document.createElement("script");
    script.src = "https://security-test.invalid/probe.js";
    document.head.append(script);
    void fetch("https://security-test.invalid/collect").catch(() => undefined);
  });
  for (const directive of [
    "script-src-attr",
    "script-src-elem",
    "connect-src",
  ]) {
    await expect(page.locator("html")).toHaveAttribute(
      "data-blocked-directives",
      new RegExp(directive),
    );
  }
  await expect(page.locator("html")).not.toHaveAttribute("data-inline-handler");
  await expect(page.locator("html")).not.toHaveAttribute("data-foreign-script");
});

test("the portfolio cannot be embedded in an iframe", async ({ page }) => {
  await page.route("**/security-test-frame", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><title>Local test harness</title><iframe src="/de"></iframe>',
    }),
  );
  const blocked = page.waitForEvent("console", {
    predicate: (message) =>
      /frame-ancestors|refused to (frame|display)/i.test(message.text()),
  });
  await page.goto("/security-test-frame");
  await blocked;
  await expect(page.frameLocator("iframe").locator("h1")).toHaveCount(0);
});
