# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/calendars/verifyCalenderPage.spec.ts

# Run tests in a directory
npx playwright test tests/calendars

# Run a single test by name
npx playwright test -g "Verify Calender Page"

# Run in interactive UI mode
npx playwright test --ui

# Run in debug mode
npx playwright test --debug

# View HTML report after a test run
npx playwright show-report
```

There are no lint or build scripts — Playwright handles TypeScript compilation at runtime.

## Architecture

This is a **Playwright TypeScript e2e test project** using the **Page Object Model (POM)** pattern with **custom fixtures**, targeting `https://goto.your.rentals/`.

### Two-Phase Test Execution

1. **Setup phase**: `tests/auth.setup.ts` runs first. It logs in and writes an authenticated session to `storageState.json`.
2. **Test phase**: All other tests load `storageState.json` so they start already authenticated — no login needed per test.

This is wired in `playwright.config.ts` via two projects: `setup` (produces `storageState.json`) and `chromium` (depends on `setup`, consumes `storageState.json`).

### Page Objects (`pages/`)

All page objects extend `BasePage` (`pages/basePage.ts`), which provides a `goto(url)` helper that prepends the base URL. Page objects expose element getters and action methods, keeping selectors out of test specs.

### Custom Fixtures (`fixtures.ts`)

The `fixtures.ts` file extends Playwright's base `test` with pre-instantiated page objects (`calendarsPage`, `managerPage`). **All test specs must import `test` from `fixtures.ts`**, not from `@playwright/test` directly, to access these fixtures.

```typescript
// Correct
import { test } from '../../fixtures';

test('my test', async ({ calendarsPage }) => { ... });
```

### Test Data & Utilities (`utils/`)

- `utils/data.ts` — hardcoded form field data for property manager flows
- `utils/date.ts` — pre-formatted date strings used in calendar tests

### Test ID Attribute

The project uses `data-test-id` as the custom test ID attribute (configured in `playwright.config.ts`). Prefer `page.getByTestId()` for stable selectors.

### Credentials

Login credentials are currently hardcoded in `tests/auth.setup.ts`. The config has commented-out `dotenv` support — a `.env` file (already gitignored) can be used if credentials need to be extracted.