# Blind Typing Tutor ⌨️

<div align="center">

![Blind Typing Tutor](https://img.shields.io/badge/Blind%20Typing%20Tutor-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)

A modern, feature-rich touch typing tutor application built with React and TypeScript. Master keyboard typing with real-time feedback, multiple keyboard layouts, and comprehensive statistics.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing) • [License](#-license)

</div>

## 📖 About

Blind Typing Tutor is a free, open-source web application designed to help users learn and improve their touch typing skills. The application supports 28+ keyboard layouts, 8 learning languages, and 29 interface languages, making it accessible to users worldwide.

### Why Blind Typing Tutor?

- **Free & Open Source** - No ads, no tracking, completely free
- **Multi-Language Support** - Learn typing in 8 languages with 29 interface languages
- **Multiple Keyboard Layouts** - Support for QWERTY, QWERTZ, AZERTY, and more
- **Real-Time Feedback** - Instant visual and audio feedback on your typing
- **Comprehensive Statistics** - Track WPM, accuracy, and errors
- **Modern UI** - Beautiful, responsive design with dark mode support
- **Accessible** - Works on all modern browsers, no installation required

## ✨ Features

### 🎯 Core Features

- **Three Learning Modes**
  - Practice Mode - Random words for continuous practice
  - Beginner Mode - Repeated words for muscle memory
  - Custom Mode - Practice with your own text

- **Real-Time Statistics**
  - Words Per Minute (WPM) tracking
  - Accuracy percentage
  - Error count and highlighting

- **Visual Keyboard**
  - Interactive keyboard visualization
  - Color-coded finger zones
  - Hand hints for proper finger placement
  - Active key highlighting

- **Audio Feedback**
  - Keyboard click sounds
  - Error sound alerts
  - Toggleable audio controls

### 🌍 Internationalization

- **28+ Keyboard Layouts** including:
  - English (US, UK)
  - German (QWERTZ)
  - French (AZERTY)
  - Spanish, Portuguese, Italian
  - Russian, Ukrainian (Cyrillic)
  - Turkish, Arabic, Hebrew
  - Japanese, Korean, Chinese
  - And many more...

- **8 Learning Languages** with word lists:
  - English, Ukrainian, Turkish
  - German, French, Spanish
  - Portuguese, Russian

- **29 Interface Languages** for UI localization

### 🎨 User Experience

- Dark/Light mode toggle
- Responsive design (mobile-friendly)
- Auto-advance to next phrase
- Correction mode (prevents typing errors)
- Customizable settings
- Persistent preferences (localStorage)

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/stanislavkhatko/blind-typing-tutor.git
   cd blind-typing-tutor
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📚 Usage

### Basic Usage

1. **Select your keyboard layout** from the dropdown in the header
2. **Choose learning mode** (Practice, Beginner, or Custom)
3. **Select learning language** for the content you want to practice
4. **Start typing** - the app will track your progress automatically
5. **Review statistics** - WPM, accuracy, and errors are displayed in real-time

### Advanced Features

- **Toggle Keyboard Visibility** - Show/hide the visual keyboard
- **Hand Hints** - Display which hand should type each key
- **Color Zones** - Visual color coding for finger zones
- **Correction Mode** - Prevents advancing until you type correctly
- **Sound Feedback** - Enable/disable typing sounds
- **Custom Text** - Practice with your own text in Custom mode

### Keyboard Shortcuts

- Type directly to start practicing
- The input field auto-focuses for immediate typing

## 🧪 Testing

### Run E2E Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests for specific browser
npx playwright test --project=chromium
```

### Install Playwright Browsers

If tests fail due to missing browsers:

```bash
npx playwright install
```

## 🛠️ Development

### Project Structure

```
blind-typing-tutor/
├── src/
│   ├── components/       # React components
│   │   ├── Game.tsx     # Main game component
│   │   ├── Keyboard.tsx # Keyboard visualization
│   │   ├── Stats.tsx    # Statistics display
│   │   └── ErrorBoundary.tsx
│   ├── config/
│   │   └── layouts/     # Keyboard layout definitions
│   ├── utils/           # Utility functions
│   │   ├── Generator.ts # Text generation
│   │   ├── SoundManager.ts
│   │   ├── translations.ts
│   │   └── ...
│   ├── types/           # TypeScript type definitions
│   └── App.tsx          # Main app component
├── e2e/                 # End-to-end tests
├── public/              # Static assets
└── dist/                # Build output
```

### Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Playwright** - E2E testing
- **Lucide React** - Icons

### Code Quality

```bash
# Lint code
npm run lint

# Type check
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/stanislavkhatko/blind-typing-tutor?style=social)
![GitHub forks](https://img.shields.io/github/forks/stanislavkhatko/blind-typing-tutor?style=social)
![GitHub issues](https://img.shields.io/github/issues/stanislavkhatko/blind-typing-tutor)
![GitHub pull requests](https://img.shields.io/github/issues-pr/stanislavkhatko/blind-typing-tutor)

## 🔗 Links

- **Live Demo**: [https://blind-typing-tutor.wordmemo.net/](https://blind-typing-tutor.wordmemo.net/)
- **Issues**: [GitHub Issues](https://github.com/stanislavkhatko/blind-typing-tutor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/stanislavkhatko/blind-typing-tutor/discussions)

## 💬 Support

If you find this project helpful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation
- ☕ [Buying me a coffee](https://buymeacoffee.com/stanislavkhatko)

---

<div align="center">

Made with ❤️ by [Stanislav Khatko](https://github.com/stanislavkhatko)

[⬆ Back to Top](#blind-typing-tutor-)

</div>
