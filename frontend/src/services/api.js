import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Contact / Email ──────────────────────────────────────────────
export const sendContactEmail = (payload) =>
  api.post('/contact', payload);
// payload: { senderEmail, senderName, subject, message }

// ── Chatbot (future integration) ────────────────────────────────
export const sendChatMessage = (messages) =>
  api.post('/chat', { messages });
// messages: [{ role: 'user'|'assistant', content: '...' }]

export default api;
