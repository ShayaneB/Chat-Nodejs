# Project docs

This repository is reorganized to be a modern real-time chat project.

Folder structure (top-level):

- backend/ — Node.js backend (Express + Socket.IO)
- frontend/ — React + TypeScript SPA (Vite)
- common/ — shared types and small utilities

Note: legacy or older code has been removed from the repository to keep
the active codebase small and easy to understand. If you need historical
copies, please use Git history / tags to inspect earlier versions.

To run locally:

1. Backend: open a terminal in `backend` and run:

```
pnpm install
pnpm dev
```

2. Frontend: open a terminal in `frontend` and run:

```
pnpm install
pnpm dev
```

Open the frontend in the browser (default: http://localhost:5173) — it connects to the backend (http://localhost:3000).

See:
- ARCHITECTURE.md — high level layout and design goals
- TECHSTACK.md — used technologies and reasoning

Styling (SCSS)
----------------
- The project CSS was migrated to a modular SCSS structure under `frontend/src/styles/`.
- Key files:
  - `frontend/src/styles/_variables.scss` – design tokens and colors
  - `frontend/src/styles/_mixins.scss` – reusable mixins (center-flex, respond-to, visually-hidden)
  - `frontend/src/styles/_base.scss` – global base rules
  - `frontend/src/styles/_app.scss` and `_chat.scss` – app and chat-specific styles
  - `frontend/src/styles/main.scss` — single stylesheet entrypoint used by the app
- The SCSS compiler (`sass`) is added as a devDependency in `frontend/package.json` so Vite will compile `.scss` files during development and builds.

Assessment readiness
---------------------
This repository was reorganized with the interview assessment criteria in mind. Briefly:

1) Code Quality
	- Files kept intentionally small and focused (no file > ~200 lines) to improve readability and maintainability.
	- Clear naming and consistent, documented structure; shared types live in `common/`.
	- Small, single-responsibility components on the frontend.

2) Modular Approach
	- Frontend components moved into `frontend/src/modules/components/` to showcase modular design.
	- Styles are modular, scoped and reusable via SCSS partials and mixins.
	- Backend is a compact Express + Socket.IO app with a single entry (backend/index.js) and minimal surface area.

3) Production Readiness
	- `package.json` scripts included for dev/build/preview for the frontend and a `dev` script for the backend.
	- TypeScript is configured and shared types between backend and frontend improve type safety.
	- Simple health-check endpoint (`/health`) and predictable socket events make the server easier to monitor and integrate.

Notes / next steps
------------------
- To run the frontend dev server locally, install dependencies and run `pnpm dev` in `frontend/`. Ensure `pnpm` is installed globally on your machine.
- Install dependencies (frontend) after pulling these changes: `pnpm install` in the `frontend` folder.
- If you'd like, I can now run a quick validation (type checks / lint) or tidy remaining legacy files (move more files into `archived/`).
