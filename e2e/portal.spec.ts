import { expect, test, type Page } from "@playwright/test";

const email = process.env.NORTH_COAST_TEST_LOGIN_EMAIL ?? "club-admin@northcoast.local";
const password = process.env.NORTH_COAST_TEST_LOGIN_PASSWORD;
const deploymentAccessUrl = process.env.PORTAL_E2E_ACCESS_URL;
const northCoastPath = "/clubs/north-coast-golf-club";

test.skip(!password, "Set NORTH_COAST_TEST_LOGIN_PASSWORD to run production portal E2E tests.");

async function expectNoCredentialQuery(page: Page) {
  const url = new URL(page.url());
  expect(url.searchParams.has("email")).toBe(false);
  expect(url.searchParams.has("password")).toBe(false);
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

async function expectContained(page: Page, childTestId: string, parentTestId: string) {
  const isContained = await page.evaluate(
    ({ childTestId, parentTestId }) => {
      const child = document.querySelector(`[data-testid="${childTestId}"]`);
      const parent = document.querySelector(`[data-testid="${parentTestId}"]`);
      if (!child || !parent) return false;
      const childBox = child.getBoundingClientRect();
      const parentBox = parent.getBoundingClientRect();
      return childBox.left >= parentBox.left - 1 && childBox.right <= parentBox.right + 1;
    },
    { childTestId, parentTestId },
  );
  expect(isContained).toBe(true);
}

async function login(page: Page) {
  await primeDeploymentAccess(page);
  await page.goto("/login");
  await expect(page.getByRole("button", { name: /sign in/i })).toBeEnabled();
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/^password$/i).fill(password!);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.getByLabel(/^password$/i).fill("").catch(() => {});
  await expect(page).toHaveURL(new RegExp(`${northCoastPath}$`));
  await expect(page.getByRole("heading", { name: "North Coast Golf Club" })).toBeVisible();
  await expect(page.locator(".animate-pulse")).toHaveCount(0);
  await expectNoCredentialQuery(page);
}

async function primeDeploymentAccess(page: Page) {
  if (!deploymentAccessUrl) return;
  await page.goto(deploymentAccessUrl, { waitUntil: "domcontentloaded" });
}

test.describe("portal authentication", () => {
  test("login form cannot submit before hydration and never falls back to GET credentials", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await primeDeploymentAccess(page);
    await page.goto("/login");
    await expect(page.locator("form").first()).toHaveAttribute("method", "post");
    await expect(page.getByLabel(/email/i)).toBeDisabled();
    await expect(page.getByLabel(/^password$/i)).toBeDisabled();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeDisabled();
    await expectNoCredentialQuery(page);

    await context.close();
  });

  test("successful login redirects to the dashboard without credential query strings", async ({ page }) => {
    await login(page);
  });

  test("failed login stays on login and shows the expected error", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /sign in/i })).toBeEnabled();
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/^password$/i).fill("not-the-right-password");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText("Unable to sign in with those details.")).toBeVisible();
    await expectNoCredentialQuery(page);
  });
});

test.describe("portal navigation and content", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("dashboard renders and desktop primary navigation reaches supported pages", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Open latest report" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /needs to know now/i })).toBeVisible();
    await expect(page.getByTestId("overview-last-survey-value")).toHaveText("2026-05-14");
    await expectNoHorizontalOverflow(page);
    await expectContained(page, "overview-heading", "overview-briefing-panel");
    await expectContained(page, "overview-metrics-grid", "overview-briefing-panel");
    for (const label of ["Course Map", "Findings", "Recommendations", "Documents", "Team"]) {
      await expect(page.getByRole("link", { name: label })).toHaveCount(0);
      await expect(page.getByText(label)).toHaveCount(0);
    }

    await page.getByRole("link", { name: "Reports" }).click();
    await expect(page).toHaveURL(/\/clubs\/north-coast-golf-club\/reports$/);
    await expect(page.getByRole("heading", { name: "Course intelligence library." })).toBeVisible();

    await page.getByRole("link", { name: "Course Areas" }).click();
    await expect(page).toHaveURL(/\/clubs\/north-coast-golf-club\/course-areas$/);
    await expect(page.getByRole("heading", { name: "Course asset register." })).toBeVisible();

    await page.getByRole("link", { name: "Overview" }).click();
    await expect(page).toHaveURL(new RegExp(`${northCoastPath}$`));
  });

  test("published report opens and print view calls window.print", async ({ page }) => {
    await page.evaluate(() => {
      window.print = () => {
        window.dispatchEvent(new Event("portal-print-called"));
      };
      window.addEventListener("portal-print-called", () => {
        document.body.dataset.printCalled = "true";
      });
    });

    await page.getByRole("link", { name: "Open latest report" }).click();
    await expect(page).toHaveURL(/\/reports\/2026-course-baseline$/);
    await expect(page.getByRole("heading", { name: "2026 Course Baseline & Monitoring Report" })).toBeVisible();
    await expect(page.getByText("Demonstration report — illustrative data")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Overall course condition/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Issues by urgency" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Evidence-led course findings" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recommendations by decision window" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Course asset record" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How this survey was interpreted" })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Downloads$/ })).toHaveCount(0);

    await page.getByRole("button", { name: /print view/i }).first().click();
    const printed = await page.evaluate(() => document.body.dataset.printCalled === "true");
    expect(printed).toBe(true);
  });

  test("course area opens", async ({ page }) => {
    await page.getByRole("link", { name: "Course Areas" }).click();
    await page.getByRole("link", { name: /open area/i }).first().click();
    await expect(page).toHaveURL(/\/clubs\/north-coast-golf-club\/course-areas\/[a-f0-9-]+$/);
    await expect(page.getByText("Current condition summary")).toBeVisible();
  });

  test("primary navigation contains only real customer routes", async ({ page }) => {
    const before = page.url();

    for (const label of ["Course Map", "Findings", "Recommendations", "Documents", "Team"]) {
      await expect(page.getByRole("link", { name: label })).toHaveCount(0);
      await expect(page.getByText(label)).toHaveCount(0);
    }

    await expect(page.getByRole("button", { name: /download pdf/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /notifications/i })).toHaveCount(0);
    expect(page.url()).toBe(before);
  });

  test("report avoids unavailable controls", async ({ page }) => {
    await page.getByRole("link", { name: "Open latest report" }).click();

    await expect(page.getByRole("button", { name: /download pdf/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /previous section/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /next section/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^Downloads$/ })).toHaveCount(0);
  });

  test("cross-club isolation blocks another club", async ({ page }) => {
    await page.goto("/clubs/harbour-dunes-golf-club");

    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Harbour Dunes Golf Club")).toHaveCount(0);
  });

  test("mobile navigation opens, closes and closes after route selection", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width > 500, "Mobile navigation is only visible on mobile viewports.");

    await page.getByRole("button", { name: /open navigation/i }).click();
    await expect(page.getByRole("dialog", { name: /portal navigation/i })).toBeVisible();
    await expect(page.getByRole("dialog", { name: /portal navigation/i }).getByRole("link")).toHaveCount(3);
    await expect(page.getByText("Coming soon")).toHaveCount(0);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /portal navigation/i })).toHaveCount(0);

    await page.getByRole("button", { name: /open navigation/i }).click();
    await page.getByRole("dialog", { name: /portal navigation/i }).getByRole("link", { name: "Reports" }).click();
    await expect(page).toHaveURL(/\/clubs\/north-coast-golf-club\/reports$/);
    await expect(page.getByRole("dialog", { name: /portal navigation/i })).toHaveCount(0);
  });
});

test.describe("core flows do not throw console errors", () => {
  test("login, dashboard, reports and course areas are clean", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await login(page);
    await page.getByRole("link", { name: "Reports" }).click();
    await expect(page.getByRole("heading", { name: "Course intelligence library." })).toBeVisible();
    await page.getByRole("link", { name: "Course Areas" }).click();
    await expect(page.getByRole("heading", { name: "Course asset register." })).toBeVisible();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
