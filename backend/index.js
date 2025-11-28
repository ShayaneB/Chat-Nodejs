// index.js — small readable Express + Socket.IO backend
// This used to be server.js; we've renamed to index.js to match the
// repository architecture (small, easy-to-discover entry point).

const path = require('path');
const fs = require('fs');
const express = require('express');
const http = require('http');
// modularized helpers
const { attachSocketHandlers } = require('./components/socketHandlers');
const { registerApiRoutes } = require('./components/apiRoutes');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

// static UI just while frontend is being developed
// Serve a tiny static page if `views` exists (helps testing GET /).
const viewsPath = path.join(__dirname, '..', 'views');
if (fs.existsSync(viewsPath)) {
  app.use('/', express.static(viewsPath));
} else {
  // When no static front-end exists at the backend, respond with a
  // small helpful message on GET / so the server doesn't return 404.
  app.get('/', (req, res) => res.send('<html><head><title>Chat API</title></head><body><h1>Chat Backend</h1><p>Socket server running — use the frontend client at its dev URL.</p></body></html>'));
}

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Attach socket handlers implemented in components/socketHandlers.js
attachSocketHandlers(io);

// Register API routes implemented in components/apiRoutes.js
registerApiRoutes(app, io);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
