import { test, expect } from "@playwright/test";

test.describe("Core Navigation + Interactions", () => {
  test("should navigate through all major pages and verify key elements", async ({ page }) => {
    // Step 1: Go to home page
    await page.goto("/");
    await page.waitForSelector('[data-testid="portfolio-grid"]', { state: 'visible' });
    await page.screenshot({ path: "test-results/01-home-page.png", fullPage: true });
    
    // Assert header contains "Program Control Room"
    await expect(page.getByRole("heading", { name: "Program Control Room" })).toBeVisible();

    // Step 2: Verify portfolio grid exists with 12 rocks
    const portfolioGrid = page.locator('[data-testid="portfolio-grid"]');
    await expect(portfolioGrid).toBeVisible();
    
    const rockTiles = page.locator('[data-testid="rock-tile"]');
    await expect(rockTiles).toHaveCount(12);
    await page.screenshot({ path: "test-results/02-portfolio-grid.png" });

    // Step 3: Click first rock tile
    await rockTiles.first().click();
    await page.waitForURL(/\/rocks\/rock-/);
    await page.waitForSelector('[data-testid="rock-tabs"]', { state: 'visible' });
    await page.screenshot({ path: "test-results/03-rock-detail.png", fullPage: true });

    // Step 4: Verify tabs exist
    const rockTabs = page.locator('[data-testid="rock-tabs"]');
    await expect(rockTabs).toBeVisible();
    
    // Verify tab labels
    await expect(page.getByRole("button", { name: "Scorecard" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Milestones" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Risks & Dependencies" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Decisions & Actions" })).toBeVisible();

    // Step 5: Click each tab and verify content
    await page.getByRole("button", { name: "Scorecard" }).click();
    await expect(page.getByText("Health is confidence-weighted")).toBeVisible();
    await page.screenshot({ path: "test-results/04-scorecard-tab.png" });

    await page.getByRole("button", { name: "Milestones" }).click();
    await expect(page.getByText("Milestone")).toBeVisible();
    await page.screenshot({ path: "test-results/05-milestones-tab.png" });

    await page.getByRole("button", { name: "Risks & Dependencies" }).click();
    await expect(page.getByText("Top Risks")).toBeVisible();
    await page.screenshot({ path: "test-results/06-risks-tab.png" });

    await page.getByRole("button", { name: "Decisions & Actions" }).click();
    await expect(page.getByText("Unresolved decisions")).toBeVisible();
    await page.screenshot({ path: "test-results/07-decisions-tab.png" });

    // Step 6: Go to cadence page
    await page.goto("/cadence");
    await page.waitForSelector('[data-testid="cadence-shift-simulator"]', { state: 'visible' });
    await expect(page.getByRole("heading", { name: "Governance Cadence" })).toBeVisible();
    await page.screenshot({ path: "test-results/08-cadence-page.png", fullPage: true });

    // Step 7: Use Shift Simulator
    const shiftSimulator = page.locator('[data-testid="cadence-shift-simulator"]');
    await expect(shiftSimulator).toBeVisible();

    // Select SteerCo from dropdown
    const forumSelect = shiftSimulator.locator("select");
    await forumSelect.selectOption({ index: 3 }); // SteerCo is 4th option (index 3)
    await page.screenshot({ path: "test-results/09-shift-simulator-selected.png" });

    // Get initial meeting date text
    const initialDateText = await shiftSimulator.getByText(/New Meeting Date:/).textContent();
    expect(initialDateText).toBeTruthy();

    // Click +7 days button
    await shiftSimulator.getByRole("button", { name: "+7" }).click();
    await page.waitForTimeout(500); // Wait for recalculation

    // Verify meeting date changed
    const updatedDateText = await shiftSimulator.getByText(/New Meeting Date:/).textContent();
    expect(updatedDateText).not.toBe(initialDateText);
    await page.screenshot({ path: "test-results/10-shift-simulator-shifted.png" });

    // Step 8: Go back to home and click Generate Exec Pack
    await page.goto("/");
    await page.getByRole("link", { name: "Generate Exec Pack" }).click();
    await page.waitForURL("/exec-pack");
    await page.screenshot({ path: "test-results/11-exec-pack-page.png", fullPage: true });

    // Step 9: Verify exec pack table exists
    const execPackTable = page.locator('[data-testid="exec-pack-table"]');
    await expect(execPackTable).toBeVisible();
    
    // Verify table has rows
    const tableRows = execPackTable.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();
    await page.screenshot({ path: "test-results/12-exec-pack-table.png" });

    // Step 10: Go to offering page
    await page.goto("/offering");
    await expect(page.locator('[data-testid="offering-title"]')).toBeVisible();
    await expect(page.getByText("Program Balanced Scorecard OS")).toBeVisible();
    await page.screenshot({ path: "test-results/13-offering-page.png", fullPage: true });
  });
});

test.describe("Exec Pack Print View", () => {
  test("should render exec pack with all key sections", async ({ page }) => {
    await page.goto("/exec-pack");
    await page.screenshot({ path: "test-results/14-exec-pack-full.png", fullPage: true });

    // Verify key sections exist
    await expect(page.getByRole("heading", { name: "Executive Pack" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Portfolio Overview" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Top 5 Risks" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Decisions Needed This Week" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Next 14 Days Cadence" })).toBeVisible();

    // Verify table exists
    const execPackTable = page.locator('[data-testid="exec-pack-table"]');
    await expect(execPackTable).toBeVisible();

    // Verify table has data rows
    const rows = execPackTable.locator("tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    await page.screenshot({ path: "test-results/15-exec-pack-sections.png" });
  });
});

