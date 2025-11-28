const presence = require('./presence');

function attachSocketHandlers(io) {
  io.on('connection', (socket) => {
    // Inform the new socket of the current presence list
    socket.emit('presence', { users: presence.currentUsers() });

    socket.on('join', ({ username }) => {
      socket.data.username = username;
      presence.addUserSocket(username, socket.id);
      // Broadcast new user and presence snapshot
      socket.broadcast.emit('user:joined', { username });
      io.emit('presence', { users: presence.currentUsers() });
    });

    socket.on('typing', ({ username, typing }) => {
      // broadcast typing status to everyone except sender
      socket.broadcast.emit('user:typing', { username, typing });
    });

    socket.on('message', (payload) => io.emit('message', payload));

    socket.on('disconnect', () => {
      const username = socket.data.username;
      presence.removeUserSocket(username, socket.id);
      if (username) io.emit('user:left', { username });
      io.emit('presence', { users: presence.currentUsers() });
    });
  });
}

module.exports = { attachSocketHandlers };
