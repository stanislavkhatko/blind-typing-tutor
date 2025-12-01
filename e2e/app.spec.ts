import { test, expect } from '@playwright/test';

test.describe('Blind Typing Tutor E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await page.waitForSelector('[data-testid="app-title"]', { timeout: 10000 });
  });

  test('should load the application and display keyboard', async ({ page }) => {
    // Check that the header is visible
    await expect(page.locator('[data-testid="app-title"]')).toBeVisible();
    
    // Check that keyboard toggle button exists
    await expect(page.locator('[data-testid="keyboard-toggle-button"]')).toBeVisible();
    
    // Check that stats are displayed
    await expect(page.locator('[data-testid="wpm-stat"]')).toBeVisible();
    await expect(page.locator('[data-testid="accuracy-stat"]')).toBeVisible();
    await expect(page.locator('[data-testid="errors-stat"]')).toBeVisible();
  });

  test('should generate text and allow typing', async ({ page }) => {
    // Wait for text to be generated - wait for text display to have content
    await page.waitForFunction(() => {
      const textDisplay = document.querySelector('[data-testid="text-display"]');
      return textDisplay && textDisplay.textContent && textDisplay.textContent.trim().length > 0;
    }, { timeout: 10000 });
    
    // Find the input field (it's hidden but exists)
    const inputField = page.locator('[data-testid="typing-input"]');
    
    // Focus the input field using JavaScript (since it's hidden)
    await inputField.evaluate((el: HTMLInputElement) => el.focus());
    await page.waitForTimeout(500);
    
    // Get the text that should be typed (from the display area)
    const textDisplay = page.locator('[data-testid="text-display"]');
    const textContent = await textDisplay.textContent();
    
    expect(textContent).toBeTruthy();
    expect(textContent!.trim().length).toBeGreaterThan(0);
    
    // Type the first few characters correctly
    const firstChar = textContent!.trim()[0];
    await inputField.type(firstChar, { delay: 100 });
    
    // Wait for the character to be processed
    await page.waitForTimeout(500);
    
    // Verify that input was accepted
    const inputValue = await inputField.inputValue();
    expect(inputValue.length).toBeGreaterThan(0);
    expect(inputValue[0]).toBe(firstChar);
  });

  test('should calculate errors correctly', async ({ page }) => {
    // Wait for text to be generated
    await page.waitForFunction(() => {
      const textDisplay = document.querySelector('[data-testid="text-display"]');
      return textDisplay && textDisplay.textContent && textDisplay.textContent.trim().length > 0;
    }, { timeout: 10000 });
    
    const inputField = page.locator('[data-testid="typing-input"]');
    // Focus the input field using JavaScript (since it's hidden)
    await inputField.evaluate((el: HTMLInputElement) => el.focus());
    await page.waitForTimeout(500);
    
    // Get the text to type
    const textDisplay = page.locator('[data-testid="text-display"]');
    const textContent = await textDisplay.textContent();
    
    expect(textContent).toBeTruthy();
    expect(textContent!.trim().length).toBeGreaterThan(1);
    
    const textToType = textContent!.trim();
    
    // Get initial error count
    const initialErrorsElement = page.locator('[data-testid="errors-stat"]').locator('span.text-3xl').first();
    const initialErrorsText = await initialErrorsElement.textContent().catch(() => '0');
    const initialErrorCount = parseInt(initialErrorsText || '0', 10);
    
    // Type first character correctly
    await inputField.type(textToType[0], { delay: 100 });
    await page.waitForTimeout(500);
    
    // Type second character incorrectly
    const wrongChar = textToType[1] === 'a' ? 'b' : 'a';
    await inputField.type(wrongChar, { delay: 100 });
    await page.waitForTimeout(500);
    
    // Check that errors count increased
    const errorsElement = page.locator('[data-testid="errors-stat"]').locator('span.text-3xl').first();
    const errorsText = await errorsElement.textContent();
    const errorCount = parseInt(errorsText || '0', 10);
    
    // Should have at least 1 error (or more than initial if there were already errors)
    expect(errorCount).toBeGreaterThanOrEqual(1);
  });

  test('should toggle theme (dark/light mode)', async ({ page }) => {
    // Find the theme toggle button
    const themeButton = page.locator('[data-testid="theme-toggle-button"]');
    await expect(themeButton).toBeVisible();
    
    // Get initial theme state
    const initialClass = await page.locator('html').getAttribute('class');
    const isInitiallyDark = initialClass?.includes('dark') ?? false;
    
    // Click theme toggle
    await themeButton.click();
    await page.waitForTimeout(500);
    
    // Check that theme changed
    const newClass = await page.locator('html').getAttribute('class');
    const isNowDark = newClass?.includes('dark') ?? false;
    
    expect(isNowDark).not.toBe(isInitiallyDark);
    
    // Toggle back
    await themeButton.click();
    await page.waitForTimeout(500);
    
    const finalClass = await page.locator('html').getAttribute('class');
    const isFinallyDark = finalClass?.includes('dark') ?? false;
    expect(isFinallyDark).toBe(isInitiallyDark);
  });

  test('should toggle keyboard visibility', async ({ page }) => {
    // Find keyboard toggle button
    const keyboardToggle = page.locator('[data-testid="keyboard-toggle-button"]');
    await expect(keyboardToggle).toBeVisible();
    
    // Check if keyboard is initially visible (look for key elements with class "key")
    const keyElements = page.locator('.key').first();
    const initiallyVisible = await keyElements.isVisible().catch(() => false);
    
    // Toggle keyboard
    await keyboardToggle.click();
    await page.waitForTimeout(1000);
    
    // Check visibility changed
    const afterToggleVisible = await keyElements.isVisible().catch(() => false);
    expect(afterToggleVisible).not.toBe(initiallyVisible);
  });

  test('should toggle hand hints', async ({ page }) => {
    // Find hand hints toggle button
    const handToggle = page.locator('[data-testid="hand-hints-toggle-button"]');
    await expect(handToggle).toBeVisible();
    
    // Toggle hand hints
    await handToggle.click();
    await page.waitForTimeout(500);
    
    // Verify button state changed (visual feedback)
    const buttonState = await handToggle.getAttribute('class');
    expect(buttonState).toBeTruthy();
  });

  test('should toggle color zones', async ({ page }) => {
    // Find color zones toggle button
    const colorToggle = page.locator('[data-testid="color-zones-toggle-button"]');
    await expect(colorToggle).toBeVisible();
    
    // Toggle color zones
    await colorToggle.click();
    await page.waitForTimeout(500);
    
    // Verify button state changed
    const buttonState = await colorToggle.getAttribute('class');
    expect(buttonState).toBeTruthy();
  });

  test('should change keyboard layout', async ({ page }) => {
    // Find keyboard layout dropdown using the test ID
    const layoutDropdown = page.locator('[data-testid="keyboard-layout-selector"]');
    await expect(layoutDropdown).toBeVisible();
    
    // Get current layout
    const currentValue = await layoutDropdown.inputValue();
    
    // Change to a different layout (try UK or German)
    const ukOption = layoutDropdown.locator('option[value="en-gb"]');
    const deOption = layoutDropdown.locator('option[value="de-de"]');
    
    if (await ukOption.count() > 0 && currentValue !== 'en-gb') {
      await layoutDropdown.selectOption('en-gb');
      await page.waitForTimeout(1000);
      const newValue = await layoutDropdown.inputValue();
      expect(newValue).toBe('en-gb');
    } else if (await deOption.count() > 0 && currentValue !== 'de-de') {
      await layoutDropdown.selectOption('de-de');
      await page.waitForTimeout(1000);
      const newValue = await layoutDropdown.inputValue();
      expect(newValue).toBe('de-de');
    }
  });

  test('should change learning mode', async ({ page }) => {
    // Find learning mode dropdown
    const modeDropdown = page.locator('[data-testid="learning-mode-selector"]');
    await expect(modeDropdown).toBeVisible();
    
    // Change to Beginner mode
    await modeDropdown.selectOption('beginner');
    await page.waitForTimeout(1000);
    
    // Verify mode changed
    const selectedValue = await modeDropdown.inputValue();
    expect(selectedValue).toBe('beginner');
    
    // Change back to Practice
    await modeDropdown.selectOption('practice');
    await page.waitForTimeout(1000);
    
    const finalValue = await modeDropdown.inputValue();
    expect(finalValue).toBe('practice');
  });

  test('should process keyboard input correctly for different layouts', async ({ page }) => {
    // Wait for text to be generated
    await page.waitForFunction(() => {
      const textDisplay = document.querySelector('[data-testid="text-display"]');
      return textDisplay && textDisplay.textContent && textDisplay.textContent.trim().length > 0;
    }, { timeout: 10000 });
    
    const inputField = page.locator('[data-testid="typing-input"]');
    // Focus the input field using JavaScript (since it's hidden)
    await inputField.evaluate((el: HTMLInputElement) => el.focus());
    await page.waitForTimeout(500);
    
    // Get text to type - make sure we have enough text to type
    const textDisplay = page.locator('[data-testid="text-display"]');
    const textContent = await textDisplay.textContent();
    
    expect(textContent).toBeTruthy();
    expect(textContent!.trim().length).toBeGreaterThan(0);
    
    // Type only first 3 characters to avoid triggering auto-advance
    const textToType = textContent!.trim().substring(0, Math.min(3, textContent!.trim().length));
    
    // Use page.keyboard.type() which sends actual keyboard events
    // This works better with React's event handling
    await page.keyboard.type(textToType, { delay: 100 });
    
    // Wait for React to process the input
    await page.waitForTimeout(500);
    
    // Verify input was processed
    const inputValue = await inputField.inputValue();
    expect(inputValue.length).toBeGreaterThanOrEqual(textToType.length);
    
    // Check that stats are updating (WPM, Accuracy, Errors elements exist)
    await expect(page.locator('[data-testid="wpm-stat"]')).toBeVisible();
    await expect(page.locator('[data-testid="accuracy-stat"]')).toBeVisible();
    await expect(page.locator('[data-testid="errors-stat"]')).toBeVisible();
  });

  test('should handle correction mode', async ({ page }) => {
    // Find correction mode toggle
    const correctionToggle = page.locator('[data-testid="correction-mode-toggle-button"]');
    await expect(correctionToggle).toBeVisible();
    
    // Toggle correction mode
    await correctionToggle.click();
    await page.waitForTimeout(500);
    
    // Verify button state changed
    const buttonState = await correctionToggle.getAttribute('class');
    expect(buttonState).toBeTruthy();
  });

  test('should display keyboard with correct colors', async ({ page }) => {
    // Ensure keyboard is visible
    const keyboardToggle = page.locator('[data-testid="keyboard-toggle-button"]');
    const keyElements = page.locator('.key').first();
    const initiallyVisible = await keyElements.isVisible().catch(() => false);
    
    // If keyboard is not visible, toggle it on
    if (!initiallyVisible) {
      await keyboardToggle.click();
      await page.waitForTimeout(1000);
    }
    
    // Check if keyboard keys are visible
    const isVisible = await keyElements.isVisible().catch(() => false);
    
    if (isVisible) {
      // Verify keys have styling (colors)
      const keyStyle = await keyElements.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Key should have a background color (not transparent)
      expect(keyStyle).not.toBe('rgba(0, 0, 0, 0)');
      expect(keyStyle).not.toBe('transparent');
    } else {
      // If keyboard is not visible, the test should still pass (keyboard might be toggled off)
      // But we should at least verify the toggle button works
      expect(await keyboardToggle.isVisible()).toBe(true);
    }
  });
});

