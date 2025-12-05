# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-XX

### Added

- Initial release of Blind Typing Tutor
- Support for 28+ keyboard layouts (QWERTY, QWERTZ, AZERTY, Cyrillic, etc.)
- 8 learning languages with word lists (English, Ukrainian, Turkish, German, French, Spanish, Portuguese, Russian)
- 29 interface languages for UI localization
- Three learning modes: Practice, Beginner, and Custom
- Real-time statistics: WPM, accuracy, and error tracking
- Visual keyboard with color-coded finger zones
- Hand hints for proper finger placement
- Audio feedback (keyboard clicks and error sounds)
- Dark/Light mode toggle
- Correction mode to prevent typing errors
- Auto-advance to next phrase when completed
- Responsive design for mobile and desktop
- Error boundary for graceful error handling
- Safe localStorage utilities with error handling
- Browser language auto-detection
- Comprehensive E2E tests with Playwright
- TypeScript for type safety
- ESLint configuration with no-console rule

### Technical

- React 19.2 with TypeScript 5.9
- Vite 7.2 for fast development and optimized builds
- Tailwind CSS 4 for styling
- Code splitting for word lists (lazy loading)
- Optimized bundle size with manual chunk splitting
- ESBuild minification
- Source maps disabled in production

### Documentation

- Comprehensive README with features and setup instructions
- CONTRIBUTING.md guide for contributors
- CHANGELOG.md for version history
- MIT License
- E2E test documentation

---

## [Unreleased]

### Planned

- More keyboard layouts
- Additional learning languages
- Phrases and programming code practice modes
- User progress tracking and statistics history
- Keyboard shortcuts documentation
- PWA support with offline capability
- Unit tests for utilities and components
- Performance monitoring and analytics

---

[1.0.0]: https://github.com/stanislavkhatko/blind-typing-tutor/releases/tag/v1.0.0
