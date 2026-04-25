import { useState } from 'react';
import {
  Fab, Tooltip, Box, Paper, Typography, IconButton,
  TextField, Button, Divider,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// ─── Placeholder chatbot UI ───────────────────────────────────────────────
// Replace the `sendMessage` function with a real API call when ready.
// The backend endpoint is already scaffolded at POST /api/chat

const BOT_INTRO = "Hi! I'm Mani's portfolio assistant. I can answer questions about his experience, skills, and projects. How can I help?";

export default function ChatbotFAB() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: BOT_INTRO }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    // ── TODO: replace this stub with a real API call ──────────────────────
    // import { sendChatMessage } from '../services/api';
    // const res = await sendChatMessage([...messages, userMsg]);
    // const reply = res.data.reply;
    // ─────────────────────────────────────────────────────────────────────

    // Stub reply for now
    await new Promise((r) => setTimeout(r, 700));
    const reply = "Thanks for reaching out! I'm currently being set up. For now, please use the Contact Me button to send Manisankar a message directly.";
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <Paper
          elevation={0}
          sx={{
            position: 'fixed', bottom: 90, right: 24, zIndex: 1300,
            width: { xs: 'calc(100vw - 48px)', sm: 360 },
            maxHeight: 480, display: 'flex', flexDirection: 'column',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 3, overflow: 'hidden',
            background: '#0c1427',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 24px 80px rgba(0,0,0,.6)',
          }}
        >
          {/* Header */}
          <Box sx={{
            px: 2.5, py: 1.8, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(127,90,240,.2), rgba(0,194,255,.1))',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <SmartToyIcon sx={{ color: '#7f5af0' }} />
              <Box>
                <Typography fontWeight={700} fontSize="0.92rem">Portfolio Assistant</Typography>
                <Typography variant="caption" color="text.secondary">Powered by AI · Coming soon</Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg,#7f5af0,#00c2ff)'
                    : 'rgba(255,255,255,0.06)',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  px: 2, py: 1.2,
                }}
              >
                <Typography fontSize="0.87rem" lineHeight={1.6}>{m.content}</Typography>
              </Box>
            ))}
            {loading && (
              <Box sx={{ alignSelf: 'flex-start', px: 2, py: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '16px 16px 16px 4px' }}>
                <Typography fontSize="0.87rem" color="text.secondary">Typing…</Typography>
              </Box>
            )}
          </Box>

          {/* Input */}
          <Box sx={{ p: 1.5, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 1 }}>
            <TextField
              size="small" fullWidth
              placeholder="Ask about skills, projects…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <IconButton
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              sx={{
                background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
                color: '#fff', borderRadius: 2,
                '&:hover': { opacity: 0.9 },
                '&.Mui-disabled': { opacity: 0.4 },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* FAB */}
      <Tooltip title={open ? 'Close' : 'Chat with AI assistant'} placement="left">
        <Fab
          onClick={() => setOpen((o) => !o)}
          sx={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 1300,
            background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
            color: '#fff',
            boxShadow: '0 6px 24px rgba(127,90,240,.45)',
            '&:hover': { transform: 'scale(1.08)', boxShadow: '0 10px 36px rgba(127,90,240,.6)' },
            transition: 'all .2s',
          }}
        >
          {open ? <CloseIcon /> : <SmartToyIcon />}
        </Fab>
      </Tooltip>
    </>
  );
}
