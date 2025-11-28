Overview
--------

This repository follows a clear separation of concerns for a real-time chat application:

- backend/ keeps server-side logic (HTTP + real-time) and is a small, easy-to-read Node.js app.
- frontend/ is a single-page application (SPA) written using React + TypeScript built with Vite.
- common/ holds shared type definitions used by both frontend and backend.

Real-time communication is provided by Socket.IO. The frontend is an SPA that connects to the backend socket endpoint and emits/receives chat events.

Design goals
------------
- Small, readable files (no file > 200 lines).
- Reusable components on the frontend (ChatInput, MessageList, MessageItem).
- Minimal, explicit API surface on the backend (health endpoint + socket events).

ARCHITECTURE:

CHAT-WEB-APP
|
|---backend
  |--index.js
  |--node_modules
|---frontend
  |--src
    |--assets
    |--common
    |--modules
      |--styles
        |--ChatInput.scss
        |--Messages.scss
      |--components
        |--chatinput
          |--ChatInput.tsx
        |--messages
          |--MessageItem.tsx
          |--MessageList.tsx
  |--node_modules
|---docs
  |--ARCHITECTURE.md
  |--TECHSTACK.md
  |--README.md
