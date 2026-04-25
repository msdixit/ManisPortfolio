import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, Alert, CircularProgress,
  IconButton, Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { sendContactEmail } from '../services/api';

const INITIAL = { senderName: '', senderEmail: '', subject: '', message: '' };

export default function ContactModal({ open, onClose }) {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState(null); // 'success' | 'error'

  const validate = () => {
    const e = {};
    if (!form.senderName.trim())    e.senderName  = 'Name is required.';
    if (!form.senderEmail.trim())   e.senderEmail = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.senderEmail)) e.senderEmail = 'Enter a valid email.';
    if (!form.subject.trim())       e.subject     = 'Subject is required.';
    if (!form.message.trim())       e.message     = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setStatus(null);
    try {
      await sendContactEmail(form);
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStatus(null);
    setForm(INITIAL);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#0c1427',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
          borderRadius: 4,
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ fontFamily: '"Syne",sans-serif', mb: 0.4 }}>
              Send a Message
            </Typography>
            <Typography variant="body2" color="text.secondary">
              I'll get back to you within 24 hours.
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2.5 }}>
        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
            ✅ Message sent successfully! I'll be in touch shortly.
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            ❌ Something went wrong. Please try emailing me directly at manisankardixit@gmail.com
          </Alert>
        )}

        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Your Name"
              name="senderName"
              value={form.senderName}
              onChange={handleChange}
              error={!!errors.senderName}
              helperText={errors.senderName}
              fullWidth
              autoFocus
            />
            <TextField
              label="Your Email"
              name="senderEmail"
              type="email"
              value={form.senderEmail}
              onChange={handleChange}
              error={!!errors.senderEmail}
              helperText={errors.senderEmail}
              fullWidth
            />
          </Stack>
          <TextField
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
            fullWidth
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            multiline
            rows={5}
            fullWidth
            placeholder="Tell me about the opportunity, project, or just say hello..."
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button onClick={handleClose} color="inherit" sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send Message'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
