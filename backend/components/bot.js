const crypto = require('crypto');

function generateBotReply(userText) {
  const trimmed = (userText || '').trim();
  const canned = [
    'Interesting — tell me more.',
    'I see. Can you expand on that?',
    "Thanks for sharing that — here's what I think.",
    'Nice — I like that.',
    "Got it. What's the next step?",
    "Hmm, that's a good point.",
    "I'll remember that.",
  ];

  if (!trimmed) return "I'm listening...";
  if (trimmed.endsWith('?')) return `Good question — here's a quick thought: ${canned[Math.floor(Math.random() * canned.length)]}`;
  if (trimmed.length < 40) return `You said: "${trimmed}" — that's neat!`;
  return canned[Math.floor(Math.random() * canned.length)];
}

function scheduleBotResponse(io, userText) {
  const reply = generateBotReply(userText);

  // notify all connected clients that 'computer' is typing
  io.emit('user:typing', { username: 'computer', typing: true });

  const delay = 1000 + Math.floor(Math.random() * 900);
  setTimeout(() => {
    io.emit('user:typing', { username: 'computer', typing: false });
    const msg = { id: crypto.randomUUID(), username: 'computer', text: reply, createdAt: new Date().toISOString() };
    io.emit('message', msg);
  }, delay);

  return { scheduled: true, delay };
}

module.exports = { generateBotReply, scheduleBotResponse };
