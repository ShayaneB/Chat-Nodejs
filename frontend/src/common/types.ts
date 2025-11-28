// Shared frontend types (copied from repository common/types.ts so frontend imports
// remain relative and self-contained under src/)

export interface ChatMessage {
  id: string;
  text: string;
  username: string;
  createdAt: string; // ISO timestamp
}

export interface JoinPayload {
  username: string;
}
