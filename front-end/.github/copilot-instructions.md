# Copilot Instructions for `crud-angular-spring`

## Project Overview
- This is an Angular 20+ frontend project, generated with Angular CLI, using SCSS and Angular Material for UI.
- The main module is `AppModule` (see `src/app/app-module.ts`).
- The entry point is `src/main.ts`, with the root component `App` (`src/app/app.ts`).
- Routing is configured in `src/app/app-routing-module.ts` and feature modules (e.g., `courses`) use their own routing modules.
- The UI is themed via `src/styles.scss` using Angular Material theming.

## Key Patterns & Structure
- **Modules:** Each feature (e.g., `courses`) is organized as a module with its own routing and components.
- **Component Structure:** Components use `standalone: false` and are declared in their respective modules.
- **Routing:** The root route redirects to `courses`. Feature modules use `forChild` routes.
- **SCSS:** All styles are written in SCSS. Global styles and theming are in `src/styles.scss`.
- **Testing:** Unit tests are colocated with components (e.g., `courses.spec.ts`). Uses Jasmine and Karma.
- **Prettier:** HTML files are formatted with the Angular parser (see `package.json`).

## Developer Workflows
- **Start Dev Server:** `npm start` or `ng serve` (see `package.json`).
- **Build:** `npm run build` or `ng build` (outputs to `dist/`).
- **Unit Tests:** `npm test` or `ng test` (runs Karma/Jasmine).
- **E2E Tests:** `ng e2e` (no default framework; user must configure).
- **Scaffolding:** Use Angular CLI for generating components, modules, etc. (`ng generate component <name>`).

## Conventions & Customizations
- **File Naming:** Uses Angular CLI defaults (kebab-case for files, PascalCase for classes).
- **Material Theming:** Customize via `src/styles.scss` using the `mat.theme()` mixin.
- **Strict TypeScript:** Enforced via `tsconfig.json` (strict mode, no implicit returns, etc.).
- **Assets:** Static files are in `public/` and referenced in `angular.json`.
- **.editorconfig:** Enforces 2-space indentation, UTF-8, and single quotes for TypeScript.

## Integration Points
- **Angular Material:** Used for UI components and theming.
- **No backend integration is present in this repo.**

## Examples
- **Add a new feature module:**
  1. `ng generate module feature-name --routing`
  2. Add to `app-routing-module.ts` as a lazy-loaded route if needed.
- **Add a new component to a module:**
  1. `ng generate component feature-name/component-name`
  2. Declare in the module's `declarations` array.

## References
- See `README.md` for more CLI commands and workflow details.
- See `angular.json` for build and serve configuration.
- See `tsconfig.json` for TypeScript and Angular compiler options.

---

**If you update project structure or conventions, update this file to keep AI agents productive.**
