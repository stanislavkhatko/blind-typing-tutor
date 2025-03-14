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
    try {
      this.modeTitle.html($(`#${mode}`).text());
      // Initialize the wordline with the selected mode
      this.wordline = new Wordline(mode);
      this.wordline.setFocus();
    } catch (error) {
      console.error('Error setting mode:', error);
      // Fallback to default mode if there's an error
      if (mode !== 'novice') {
        this.setMode('novice');
      }
    }
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
