# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WhatsApp chat module (sw-console-chat) built with React and TypeScript that integrates with [GREEN-API](https://green-api.com) for WhatsApp messaging functionality. The app can run standalone or embedded as an iframe within a parent application.

## Common Commands

```bash
npm install       # Install dependencies
npm run dev       # Start Vite development server
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint with TypeScript support
npm run preview   # Preview production build
```

## Architecture

### State Management
- **Redux Toolkit** with RTK Query for API calls and state management
- **redux-persist** for persisting specific state to localStorage (with 3-minute timestamp expiry)
- Store slices: `userReducer`, `chatReducer`, `themeReducer`, `instancesReducer`, `messageMenuReducer`, `qrInstructionReducer`

### API Services (RTK Query)
- `appAPI` (`src/services/app/`) - Internal app API for auth, instances, profile
- `greenAPI` (`src/services/green-api/`) - GREEN-API WhatsApp endpoints (messaging, groups, accounts, WABA)
- `persistedMethods` - Cached/persisted API methods

### Key Types
- `InstanceInterface` - WhatsApp instance credentials (mediaUrl)
- `ChatType` - App display modes: `tab`, `console-page`, `instance-view-page`, `partner-iframe`, `one-chat-only`
- `MessageInterface` - WhatsApp message structure
- `TariffsEnum` - Subscription tiers (DEVELOPER, BUSINESS, BUSINESS_USD, BUSINESS_KZT)

### Authorization Modes
1. **postMessage API** - Parent window sends `INIT` message with credentials to iframe
2. **URL Parameters** - `idInstance`, `apiTokenInstance`, `apiUrl`, `mediaUrl` (+ optional `lng`, `dsc`, `logo`, `chatId`)

### Path Aliases (tsconfig baseUrl)
Imports resolve from `./src`, so use bare imports like:
```typescript
import { useAppSelector } from 'hooks';
import { selectUser } from 'store/slices/user.slice';
```

### Internationalization
- i18next with HTTP backend loading translations from `/public/locales_0.0.68/{lng}/translation.json`
- Supported languages: `en`, `ru`, `he`
- RTL support via `i18n.dir()`

### UI Framework
- **Ant Design** with custom theming (default/dark themes in `src/configs/themes/`)
- **SCSS** for component styles
- **SVGR** for SVG imports as React components

## Code Style

- ESLint + Prettier with strict TypeScript rules
- `@typescript-eslint/no-explicit-any: error` - avoid `any` types
- Import order: react first, then external, then internal (alphabetized)
- Single quotes, 2-space tabs, trailing commas in ES5 contexts, 100 char print width
