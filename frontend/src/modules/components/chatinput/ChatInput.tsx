// ChatInput.tsx — small controlled input component
// - Keeps internal state for the text input
// - Calls onSend(text) when the message should be sent
import React, { useState, useRef } from 'react';

type Props = { onSend: (text: string) => void; onTyping?: (typing: boolean) => void };

function ChatInput({ onSend, onTyping }: Props): JSX.Element {
  const [text, setText] = useState('');

  const typingTimer = useRef<number | null>(null);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    if (onTyping) onTyping(false);
  };

  // Keep this component focused — UI only and minimal validation
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setText(v);
    if (!onTyping) return;
    // user is typing — notify, debounce stop-typing
    onTyping(true);
    if (typingTimer.current) window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => onTyping && onTyping(false), 700);
  };

  return (
    <form className="chat-input" onSubmit={submit}>
      <input value={text} onChange={onChange} placeholder="Type a message" />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
