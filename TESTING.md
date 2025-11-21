# Automated Testing Plan

This document outlines the comprehensive automated testing strategy for the Avant-Garde Programmer Blog. The goal is to ensure full functionality coverage, responsiveness, and stability as the site evolves.

## 1. Testing Strategy Overview

We will employ a "Testing Trophy" approach, focusing heavily on Integration and E2E tests to give the most confidence in user-facing features.

### Levels of Testing:
1.  **Static Analysis**: TypeScript & ESLint (Already configured).
2.  **Unit Tests**: Jest + React Testing Library. Focus on individual components (`Button`, `GlitchEffect`) and utility functions.
3.  **Integration Tests**: Jest + React Testing Library. Focus on component interactions (e.g., `ContactForm` validation, `CommandPalette` filtering).
4.  **End-to-End (E2E) Tests**: Playwright. Focus on critical user flows (Navigation, Form Submission, Responsiveness).

## 2. Tools & Frameworks

-   **Test Runner**: [Jest](https://jestjs.io/)
-   **Component Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   **E2E Testing**: [Playwright](https://playwright.dev/)
-   **CI/CD**: GitHub Actions (recommended for automation).

## 3. Test Coverage Plan

### A. Interactive Elements
-   **Navigation**: Verify all links in `Nav` and `Footer` route to correct pages.
-   **Command Palette**: Verify `Cmd+K` opens the palette, search filters results, and selection navigates correctly.
-   **Chaos Mode**: Verify toggle switches CSS variables/classes.
-   **Buttons**: Verify hover states and click handlers.

### B. Forms
-   **Contact Form**:
    -   Test validation (required fields, email format).
    -   Test successful submission state ("Signal Received").
    -   Test error handling.

### C. Dynamic Content
-   **Blog/Work/Lab**:
    -   Verify lists render correct number of items from `lib/data.ts`.
    -   Verify clicking an item navigates to the correct dynamic slug page.
    -   Verify 404 handling for invalid slugs.

### D. Responsiveness
-   **Mobile Menu**: Verify hamburger menu opens/closes on small screens.
-   **Layout**: Verify grid adjustments on Mobile (375px), Tablet (768px), and Desktop (1024px+).

## 4. Setup Instructions

### Install Dependencies
\`\`\`bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-node
npm init playwright@latest
\`\`\`

### Run Tests
-   **Unit/Integration**: `npm test`
-   **E2E**: `npx playwright test`

## 5. CI/CD Integration

Configure GitHub Actions to run tests on every push:
1.  Install dependencies.
2.  Build the Next.js app.
3.  Run Linting.
4.  Run Unit Tests.
5.  Run Playwright E2E Tests.
