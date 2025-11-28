// MessageItem.tsx — render a single chat message
// This file is intentionally small and focused. Presentation only.
import React from 'react';
import type { ChatMessage } from '@src/common/types';

type Props = { message: ChatMessage; mine?: boolean };

function InitialAvatar({ name }: { name: string }) {
  const initial = name?.trim().charAt(0).toUpperCase() || '?';
  return <div className="avatar">{initial}</div>;
}

function MessageItem({ message, mine = false }: Props): JSX.Element {
  return (
    <div className={"message-item " + (mine ? 'mine' : '')}>
      <InitialAvatar name={message.username} />

      <div className="content">
        <div className="meta">
          <span className="user">{message.username}</span>
          <span className="time">{new Date(message.createdAt).toLocaleTimeString()}</span>
        </div>
        <div className="text">{message.text}</div>
      </div>
    </div>
  );
}

export default MessageItem;
