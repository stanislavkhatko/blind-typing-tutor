import Wordline from '../wordline/wordline';

/**
 * Main Application class that handles mode selection and initializes the typing tutor
 */
export default class Application {
  /**
   * Initialize the application
   */
  constructor() {
    // DOM elements
    this.modeSelect = $('.mode-select');
    this.modeTitle = $('.mode-title');

    // CSS classes
    this.openClass = 'open';

    // Default mode
    this.mode = 'novice';

    // Initialize with default mode
    this.setMode(this.mode);

    // Bind event handlers
    this.bindEvents();
  }

  /**
   * Set the current typing mode and initialize the wordline
   * @param {string} mode - The typing mode to set
   */
  setMode(mode) {
    const fallbackMode = 'novice';
    const attemptMode = currentMode => {
      const modeOption = $(`#${currentMode}`);

      if (!modeOption.length) {
        console.error(`Mode "${currentMode}" is not available in the DOM.`);
        return false;
      }

      try {
        if (this.wordline && typeof this.wordline.destroy === 'function') {
          this.wordline.destroy();
          this.wordline = null;
        }

        this.modeTitle.html(modeOption.text());
        this.mode = currentMode;
        this.wordline = new Wordline(currentMode);
        this.wordline.setFocus();
        return true;
      } catch (error) {
        console.error(`Error initializing mode "${currentMode}":`, error);
        return false;
      }
    };

    if (attemptMode(mode)) {
      return;
    }

    if (mode !== fallbackMode && attemptMode(fallbackMode)) {
      return;
    }

    console.error(`Failed to initialize both "${mode}" and fallback mode "${fallbackMode}".`);
  }

  /**
   * Bind event handlers for mode selection
   */
  bindEvents() {
    // Toggle dropdown on click
    this.modeSelect.click(e => {
      e.stopPropagation();
      this.modeSelect.toggleClass(this.openClass);
    });

    // Handle mode selection
    this.modeSelect.find('li').click(e => {
      e.stopPropagation();
      const selectedMode = $(e.target).attr('id');
      
      if (selectedMode) {
        this.setMode(selectedMode);
        this.modeSelect.removeClass(this.openClass);
      }
    });

    // Close dropdown when clicking elsewhere
    $(document).click(() => {
      this.modeSelect.removeClass(this.openClass);
    });
  }
}
