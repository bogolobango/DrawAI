# DrawAI

AI-powered architectural floor plan generator with UE5 visualization, Revit integration, and APS cloud services.

## Project Overview

DrawAI is a monorepo that provides a React-based web dashboard for managing AI-generated architectural floor plans. It also includes (non-runnable on Replit) a Revit plugin and Unreal Engine 5 visualization project.

## Architecture

- **`apps/web/`** — React 19 + Vite 6 frontend (runs on Replit)
- **`packages/core/`** — Shared TypeScript types and core logic (`@drawai/core`)
- **`packages/aps-client/`** — Autodesk Platform Services API client (`@drawai/aps-client`)
- **`apps/revit-plugin/`** — C# Revit 2025 plugin (not runnable on Replit)
- **`apps/unreal/`** — Unreal Engine 5.4 visualization project (not runnable on Replit)
- **`data/mock/`** — Mock JSON architectural data for Healthcare and Education templates

## Tech Stack

- **Runtime:** Node.js 20
- **Package Manager:** npm with workspaces
- **Frontend:** React 19, Vite 6, React Router 7, Tailwind CSS 4
- **Language:** TypeScript
- **Build:** tsc for packages, Vite for web app

## Setup

```bash
npm install
npm run build:core
npm run build:aps
npm run dev
```

## Development

The web app runs on port 5000 (configured in `apps/web/vite.config.ts`), host `0.0.0.0`, with `allowedHosts: true` for Replit proxy compatibility.

The workflow "Start application" runs `npm run dev` which starts the Vite dev server.

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `apps/web/dist`

## Key Notes

- The shared packages (`@drawai/core`, `@drawai/aps-client`) must be built before running the web app
- `packages/aps-client` requires `@types/node` as a dev dependency (added during Replit setup)
- The Revit and Unreal Engine components are not deployable in the Replit environment
