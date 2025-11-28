// App.tsx — top-level SPA component
// This simple app demonstrates a single chat view using Socket.IO.
// Responsibilities:
// - create and own the socket connection
// - track user/session state
// - coordinate UI components (MessageList, ChatInput)
import React from 'react';
import { io, Socket } from 'socket.io-client';
import ChatInput from '@modules/components/chatinput/ChatInput';
import MessageList from '@modules/components/messages/MessageList';
import type { ChatMessage } from '@common/types';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function getCompactUserList(users: string[]) {
  if (!users || users.length === 0) return '';
  if (users.length <= 3) return users.join(', ');
  return `${users[0]}, ${users[1]} and ${users.length - 2} others`;
}

function App(): JSX.Element {
  const [socket, setSocket] = React.useState(null as Socket | null);
  const [username, setUsername] = React.useState('');
  const [messages, setMessages] = React.useState([] as ChatMessage[]);
  const [onlineUsers, setOnlineUsers] = React.useState(['computer'] as string[]);
  const [typingUsers, setTypingUsers] = React.useState([] as string[]);

  React.useEffect(() => {
    const s = io(BACKEND);
    setSocket(s);

    // Avoid duplicate messages (e.g. when we optimistically add the message
    // locally and the server later re-broadcasts the same payload). If a
    // message with the same id is already present, skip adding it again.
    s.on('message', (msg: ChatMessage) =>
      setMessages((m: ChatMessage[]) => (m.some((x) => x.id === msg.id) ? m : [...m, msg]))
    );
    s.on('user:joined', (payload: any) =>
      setMessages((m: ChatMessage[]) => [
        ...m,
        { id: crypto.randomUUID(), username: 'system', text: `${payload.username} joined`, createdAt: new Date().toISOString() }
      ])
    );

    // presence snapshots (array of usernames). Ensure the simulated 'computer'
    // user is always present so the UI shows two participants.
    s.on('presence', (payload: { users: string[] }) => {
      const users = payload.users || [];
      setOnlineUsers((prev: string[]) => {
        // Merge server users while guaranteeing 'computer' exists in list
        const merged = Array.from(new Set(['computer', ...users]));
        return merged;
      });
    });

    // typing indicator events
    s.on('user:typing', ({ username, typing }: { username: string; typing: boolean }) =>
      setTypingUsers((prev: string[]) => {
        if (typing) return prev.includes(username) ? prev : [...prev, username];
        return prev.filter((u: string) => u !== username);
      })
    );

    return () => { s.disconnect(); };
  }, []);

  // Join the chat with a local username and announce via socket
  const join = (name: string) => {
    setUsername(name);
    socket?.emit('join', { username: name });
  };

  // Build a ChatMessage and emit it to the server, also append locally.
  // After sending, call the backend API so the server will generate a
  // computer reply (server emits typing + message events).
  const send = async (text: string) => {
    const msg: ChatMessage = { id: crypto.randomUUID(), text, username, createdAt: new Date().toISOString() };
    socket?.emit('message', msg);
    setMessages((m: ChatMessage[]) => [...m, msg]);

    // Ask backend to generate a reply for 'computer'. The server will
    // emit typing and message events which the client listens for.
    try {
      fetch(`${BACKEND}/api/reply`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) });
    } catch (err) {
      // best-effort network call — continue silently if it fails
      console.warn('failed to call /api/reply', err);
    }
  };

  // Bot simulation was moved to the backend; frontend receives server
  // typing + message events and no longer generates responses locally.

  // Render a concise, reusable SPA. All presentation logic lives in
  // modules/components to keep files short and testable.
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="title">Simple real-time chat</div>
        <div className="status">
          <div className="avatars">
            {onlineUsers.slice(0, 3).map((u: string) => (
              <div className="avatar small" key={u}>{u.charAt(0).toUpperCase()}</div>
            ))}
          </div>
          <span className="online-count">{onlineUsers.length} online</span>

          {onlineUsers.length ? (
            <span className="online-list"> — {getCompactUserList(onlineUsers)}</span>
          ) : null}
        </div>
      </header>
      {!username ? (
        <div className="join-box">
          <input placeholder="Enter a user name" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') join((e.target as HTMLInputElement).value); }} />
        </div>
      ) : (
        <main>
          <MessageList messages={messages} current={username} typingUsers={typingUsers} />
          <ChatInput
            onSend={send}
            onTyping={(typing) => {
              // notify server so other real clients see our typing
              socket?.emit('typing', { username, typing });

              // show local typing in message list (so typing appears to the user)
              setTypingUsers((prev: string[]) => {
                if (typing) return prev.includes(username) ? prev : [...prev, username];
                return prev.filter((u: string) => u !== username);
              });
            }}
          />
        </main>
      )}
    </div>
  );
}

export default App;
