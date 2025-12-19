# Landing Page UI

This project contains a React landing page component designed with a modern, "OpenAI-like" aesthetic.

## Structure

- `src/LandingPage.tsx`: The main landing page component containing all 7 sections.
- `src/components/ui/`: Contains the reusable UI components (Button, Card, Badge, Input, Accordion) styled with Tailwind CSS.
- `src/index.css`: Contains the Tailwind directives and CSS variables for the design system.

## Usage

1. Ensure you have a React project with Tailwind CSS configured.
2. If using Next.js or Vite, importing `src/index.css` in your root layout/entry file is required for the component colors to work correctly.
3. Import and use the `LandingPage` component in your app:

```tsx
import LandingPage from './src/LandingPage';

function App() {
  return <LandingPage />;
}
```

## Dependencies

This implementation assumes a standard React setup.
- `clsx` and `tailwind-merge` are used in `src/lib/utils.ts`.
- `lucide-react` is used for icons (if enabled) but placeholders are currently used in the main file.

