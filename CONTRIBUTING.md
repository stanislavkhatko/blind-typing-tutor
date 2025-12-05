# Contributing to Blind Typing Tutor

Thank you for your interest in contributing to Blind Typing Tutor! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/blind-typing-tutor.git
   cd blind-typing-tutor
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/stanislavkhatko/blind-typing-tutor.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## 🔀 Development Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   npm run test:e2e
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for Japanese keyboard layout
fix: resolve memory leak in setTimeout cleanup
docs: update README with new features
refactor: extract browser detection to utility
```

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` type - use proper types or `unknown`
- Add JSDoc comments for public APIs
- Follow existing code style

### React

- Use functional components with hooks
- Keep components small and focused
- Use `useMemo` and `useCallback` appropriately
- Follow React best practices

### Code Style

- Run `npm run lint` before committing
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

### File Organization

- Keep related files together
- Use descriptive file names
- Follow the existing directory structure

## 🧪 Testing

- Add tests for new features
- Ensure all existing tests pass
- Test in multiple browsers if possible
- Update test documentation if needed

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update CHANGELOG.md for significant changes
- Keep code comments clear and concise

## 🌍 Internationalization

When adding new text:

1. Add translations to `src/utils/translations.ts`
2. Support all interface languages (29 languages)
3. Test with different language settings
4. Ensure proper RTL support if needed

## ⌨️ Keyboard Layouts

When adding new keyboard layouts:

1. Create layout file in `src/config/layouts/`
2. Follow existing layout structure
3. Add to layout registry in `src/config/layouts/index.ts`
4. Update type definitions if needed
5. Test with the new layout

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description** - Clear description of the bug
- **Steps to Reproduce** - Detailed steps
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Environment** - Browser, OS, version
- **Screenshots** - If applicable

## 💡 Feature Requests

When requesting features:

- **Use Case** - Why is this feature needed?
- **Proposed Solution** - How should it work?
- **Alternatives** - Other solutions considered
- **Additional Context** - Any other relevant info

## 🔍 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md**
5. **Request review** from maintainers
6. **Address feedback** promptly

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No new warnings
- [ ] CHANGELOG.md updated

## 🎯 Areas for Contribution

We welcome contributions in these areas:

- **New Keyboard Layouts** - Add support for more layouts
- **New Languages** - Add word lists for more languages
- **UI/UX Improvements** - Enhance user experience
- **Performance** - Optimize rendering and performance
- **Accessibility** - Improve a11y features
- **Documentation** - Improve docs and examples
- **Testing** - Add more test coverage
- **Bug Fixes** - Fix reported issues

## ❓ Questions?

- Open an issue for questions
- Check existing issues and discussions
- Review the codebase for examples

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

---

**Note**: By contributing, you agree that your contributions will be licensed under the MIT License.

