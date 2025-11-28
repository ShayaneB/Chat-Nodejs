// presence.js — small utility to track online username => socket id sets
const users = new Map();

function addUserSocket(username, socketId) {
  if (!username) return;
  const set = users.get(username) || new Set();
  set.add(socketId);
  users.set(username, set);
}

function removeUserSocket(username, socketId) {
  if (!username) return;
  const set = users.get(username);
  if (!set) return;
  set.delete(socketId);
  if (set.size === 0) users.delete(username);
  else users.set(username, set);
}

function currentUsers() {
  // Always include the 'computer' virtual user so the UI shows two
  // participants even when no socket is connected for that persona.
  return Array.from(new Set([...users.keys(), 'computer']));
}

module.exports = { addUserSocket, removeUserSocket, currentUsers };
