# 💻 Blogfolio Client (Frontend)

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite)](https://vitejs.dev/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3068b7?logo=zod)](https://zod.dev/)

> The modular, strictly-typed React frontend consuming the decoupled Blogfolio CMS ecosystem.

This repository houses the client-side architecture for Blogfolio. It is engineered to demonstrate enterprise-grade frontend patterns, focusing heavily on **end-to-end type safety**, **intentional state encapsulation**, and **composable validation**. It syncs seamlessly with the Blogfolio Node API via a shared utility package, eliminating runtime type mismatch errors.

## ✨ Engineering Highlights

This codebase implements robust frontend architecture to ensure predictability, maintainability, and a stellar developer experience:

### 1. End-to-End Type Safety via Shared Contracts
* **Strict API Wrappers:** The `axiosWithEndpoint` wrapper utilizes advanced TypeScript generics (`InferEndpoint<T>`) to guarantee that request bodies, query parameters, and API responses strictly match the exact shape of the backend controllers.
* **Shared Zod Contracts:** Inherits type definitions and schemas from a custom shared utility package (`@blogfolio/types`), ensuring 100% synchronization with the backend API without manual type duplication.
* **Discriminated Unions:** API errors are mapped into strict discriminated unions, forcing the UI to handle every possible network and validation state (Success, Forbidden, Not Found) safely at compile time.

### 2. Composable Zod Validation (`useRefinedState`)
* Form state and validation are deeply coupled using a custom `useRefinedState` hook. Instead of relying on heavy form libraries, this hook binds a Zod schema directly to React state.
* It auto-evaluates on state changes, seamlessly translating schema constraints (e.g., password complexity rules) into localized UI error arrays and preventing invalid state propagation.

### 3. Granular Context Providers
* State management is intentionally localized. Instead of a monolithic global store (like Redux), the application uses targeted Contexts (`UserContext`, `EmoteContext`, `PostContext`) to encapsulate domain-specific logic.
* This approach minimizes unnecessary re-renders, improves code locality, and handles real-time-feeling engagement systems (like dynamic emote counting) efficiently.

### 4. Scalable SCSS Module Architecture
* Utilizes **SCSS Modules** to maintain a strictly locally-scoped class namespace, preventing global CSS collisions.
* Supported by a foundational design token system (`_variables.scss`), reusable component mixins (`_mixins.scss`), and a custom media-query library (`_media.scss`) to ensure a fluid, mobile-first responsive design without layout thrashing.

## 🛠️ Tech Stack

* **Core:** React 18, TypeScript (Strict Mode), Vite
* **Routing:** React Router DOM v6
* **Validation & Types:** Zod, custom `@blogfolio/types` package
* **Styling:** SCSS Modules, CSS Flexbox/Grid
* **Network:** Axios (Wrapped for strict endpoint typing)
* **Editor:** UIW React Markdown Editor (with HTML sanitization)

## 📂 Architecture & Directory Structure

```text
src/
├── components/          # Reusable UI elements, route views, and scoped SCSS modules
├── contexts/            # Granular state providers (User, Emote, Post) avoiding global store bloat
├── hooks/               # Custom React hooks (e.g., useRefinedState, useAuth)
├── scss/                # Global mixins, custom media query library, and design tokens
├── services/api/        # Strictly typed Axios wrappers mapping to backend endpoints
├── App.tsx              # Root component & declarative React Router configuration
└── main.tsx             # DOM mounting and provider wrapping
```

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* npm (or yarn)
* The [Blogfolio Server](https://github.com/KhaledElmorsy/blogfolio-server) running locally (optional, but required for full API functionality).

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Proxy:**
   By default, the Vite dev server is configured to proxy `/api` requests to `http://localhost:3000/v1` (the default local backend port). If your backend is running elsewhere, adjust the proxy settings in `vite.config.ts`.

3. **Start the Development Server:**
   Runs the Vite server with HMR (Hot Module Replacement).
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   Compiles TypeScript and bundles the app for deployment.
   ```bash
   npm run build
   ```
