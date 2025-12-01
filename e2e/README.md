# E2E Tests

This directory contains end-to-end tests for the Blind Typing Tutor application using Playwright.

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests for a specific browser
npx playwright test --project=chromium
```

## Test Coverage

The e2e tests cover:

1. **Application Loading**
   - Header visibility
   - Keyboard toggle button
   - Stats display (WPM, Accuracy, Errors)

2. **Typing Functionality**
   - Text generation
   - Input field interaction
   - Character typing

3. **Error Calculation**
   - Correct typing
   - Incorrect typing
   - Error count updates

4. **Theme Toggle**
   - Dark/Light mode switching
   - Theme persistence

5. **UI Controls**
   - Keyboard visibility toggle
   - Hand hints toggle
   - Color zones toggle
   - Correction mode toggle

6. **Keyboard Layouts**
   - Layout dropdown
   - Layout switching
   - Text processing with different layouts

7. **Learning Modes**
   - Mode selection
   - Mode switching

8. **Keyboard Colors**
   - Color display
   - Color zone functionality

## Test Structure

Tests are organized in a single test suite `Blind Typing Tutor E2E Tests` with individual test cases for each feature.

## Notes

- Tests automatically start the dev server before running
- Tests wait for text generation before attempting to type
- Tests use flexible selectors to work with different interface languages

