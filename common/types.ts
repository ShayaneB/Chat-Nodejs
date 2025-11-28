// Shared TypeScript types used by frontend and backend
// Keep these small and unopinionated so both sides can import them.

/**
 * ChatMessage represents a single chat message that will be exchanged
 * between clients and the server. Keep fields minimal and serializable.
 */
export interface ChatMessage {
  id: string;
  text: string;
  username: string;
  createdAt: string; // ISO timestamp
}

/**
 * Sent when a user joins a chatroom/session. Currently only a username
 * is required, but it can be extended later (e.g. userId, avatar).
 */
export interface JoinPayload {
  username: string;
}
