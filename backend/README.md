# Chat backend (Node.js + Socket.IO)

Start the development server:

```powershell
cd backend
pnpm install
node server.js
```

API
- GET /health — simple health endpoint

Socket events
- join — { username }
- message — ChatMessage payload (see ../common/types.ts)
