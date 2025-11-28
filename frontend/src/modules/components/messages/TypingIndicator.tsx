import React from 'react';

type Props = { users: string[] };

function Avatar({ name }: { name: string }) {
  const initial = name?.trim().charAt(0).toUpperCase() || '?';
  return <div className="avatar small">{initial}</div>;
}

export default function TypingIndicator({ users }: Props): JSX.Element {
  if (!users || users.length === 0) return <></>;

  // Build a compact display string. If there are many users, show two
  // names and "and N others" so the text remains concise.
  let display = '';
  if (users.length <= 3) display = users.join(', ');
  else display = `${users[0]}, ${users[1]} and ${users.length - 2} others`;

  return (
    <div className="typing-indicator">
      <div className="avatars">
        {users.slice(0, 3).map((u) => (
          <Avatar key={u} name={u} />
        ))}
      </div>

      <div className="typing-text">
        <span className="names">{display}</span>
        <span className="dots" aria-hidden>
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </span>
      </div>
    </div>
  );
}
