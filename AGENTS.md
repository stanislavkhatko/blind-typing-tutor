# AI Agent Instructions for Blind Typing Tutor

## Project Overview

Blind Typing Tutor is a modern touch typing tutor application built with **Next.js 15**, **React 19**, and **TypeScript**. It helps users learn touch typing with support for 28+ keyboard layouts, 29 interface languages, and comprehensive real-time feedback.

**Live Site**: https://blind-typing-tutor.wordmemo.net  
**Tech Stack**: Next.js, React, TypeScript, Tailwind CSS  
**Deployment**: Vercel

## Project Structure

```
blind-typing-tutor/
├── app/                          # Next.js app directory
│   ├── [interfaceLang]/         # Interface language routes
│   │   └── [studyLang]/         # Study language routes
│   │       └── [learningMode]/  # Mode routes (words/phrases/custom)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Root redirect page
│   └── globals.css              # Global styles
├── src/
│   ├── components/              # React components
│   │   ├── Game.tsx            # Main typing game component
│   │   ├── Keyboard.tsx        # Virtual keyboard display
│   │   ├── Stats.tsx           # Statistics display
│   │   ├── game/               # Game-related components
│   │   └── layout/             # Layout components (Header, SEO)
│   ├── config/
│   │   ├── constants.ts        # App constants and configs
│   │   └── layouts/            # Keyboard layout definitions
│   ├── hooks/                  # Custom React hooks
│   ├── translations/           # Translation files (29 languages)
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── words/                  # Word lists for each language
└── public/                     # Static assets

```

## Key Features

1. **Multi-language Support**: 29 interface languages, 8 learning languages
2. **Keyboard Layouts**: 28+ layouts (QWERTY, AZERTY, QWERTZ, Dvorak, etc.)
3. **Practice Modes**: Words, Phrases, Custom text
4. **Real-time Feedback**: WPM tracking, accuracy, error highlighting
5. **Visual Keyboard**: Color-coded finger zones, active key highlighting
6. **SEO Optimized**: Dynamic metadata, sitemap, localized content

## Important Patterns

### Routing

- Uses Next.js dynamic routes: `/[interfaceLang]/[studyLang]/[learningMode]`
- Example: `/en/en/phrases` (English interface, English study, phrases mode)
- All routes are statically generated at build time

### State Management

- Local component state with React hooks
- Settings persisted to localStorage
- No external state management library

### Styling

- Tailwind CSS for all styling
- Dark mode support with `dark:` variants
- Responsive design with mobile detection

### Translations

- Centralized in `src/translations/` directory
- Type-safe with TypeScript `TranslationKeys` interface
- Each language file exports a complete translation object

## Development Commands

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn deploy       # Deploy to Vercel
yarn test:e2e     # Run Playwright tests
```

## When Working on This Project

### Adding New Translations

1. Add new keys to `src/translations/types.ts` in `TranslationKeys` type
2. Update all translation files in `src/translations/` (29 files)
3. Verify TypeScript compilation succeeds

### Adding New Keyboard Layouts

1. Create layout definition in `src/config/layouts/`
2. Add to the appropriate layout category
3. Update `POPULAR_LAYOUT_IDS` in `src/config/constants.ts` if needed

### Adding SEO Content

1. Update `app/[interfaceLang]/[studyLang]/[learningMode]/SEOContent.tsx`
2. Add mode-specific content to `seoContent` object
3. Ensure content is localized per interface language
4. Keep visible content (not `sr-only`) for search engines

### Modifying Routes

1. All dynamic routes in `app/[interfaceLang]/[studyLang]/[learningMode]/`
2. Update `generateStaticParams()` if adding/removing route patterns
3. Update metadata generation in `src/utils/metadata.ts`

### SEO Best Practices

- Keep text-to-HTML ratio above 10% (aim for 200+ words per page)
- Use proper heading hierarchy (h1 → h2 → h3)
- Include unique, descriptive content per route
- Enable indexing with `robots: { index: true, follow: true }`

## Common Tasks

### Fix TypeScript Errors

- Check `src/translations/types.ts` for missing keys
- Ensure all translation files are complete
- Verify type imports match actual file structure

### Improve SEO

- Add more localized content to SEOContent.tsx
- Update meta descriptions in translation files
- Ensure proper canonical URLs and hreflang tags

### Add New Features

- Follow existing component patterns in `src/components/`
- Use custom hooks for reusable logic
- Keep components small and focused
- Prefer composition over inheritance

## Testing

- E2E tests with Playwright in `e2e/` directory
- Test critical user flows: typing practice, mode switching, language changes
- Run tests before deployment

## Deployment

- Automatic deployment via Vercel on push to main
- Manual deployment: `yarn deploy`
- Environment: Vercel serverless functions
- Static export with ISR (Incremental Static Regeneration)

## Notes

- Mobile users see a desktop-only message (typing requires keyboard)
- Settings persist across sessions via localStorage
- All routes are pre-rendered at build time for performance
- Dark mode preference is saved per user
