// MessageList.tsx — list of messages
// Light wrapper around MessageItem, keeps rendering logic small and readable.
import React from 'react';
import '@modules/styles/Messages.scss';
import type { ChatMessage } from '@src/common/types';
import MessageItem from '@modules/components/messages/MessageItem';

import TypingIndicator from '@modules/components/messages/TypingIndicator';

type Props = { messages: ChatMessage[]; current?: string; typingUsers?: string[] };

function MessageList({ messages, current, typingUsers }: Props): JSX.Element {
  return (
    <div className="message-list">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} mine={m.username === current} />
      ))}

      {/* typing indicator shown at end of messages */}
      <TypingIndicator users={typingUsers || []} />
    </div>
  );
}

export default MessageList;
