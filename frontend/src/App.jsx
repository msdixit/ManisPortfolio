import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import theme from './theme';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import {
  About, Experience, Skills, Certifications,
  Accomplishments, Education, Contact, Footer,
} from './components/Sections';
import ContactModal from './components/ContactModal';
import ChatbotFAB from './components/ChatbotFAB';

function ScrollTop() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 400 });
  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 1200,
          background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(127,90,240,.4)',
          '&:hover': { transform: 'translateY(-3px)' },
          transition: 'transform .2s',
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParticleCanvas />
      <Navbar />

      <Box component="main">
        <Hero onContactClick={() => setContactOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Accomplishments />
        <Education />
        <Contact onContactClick={() => setContactOpen(true)} />
      </Box>

      <Footer />

      {/* Contact modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Scroll to top */}
      <ScrollTop />

      {/* Chatbot FAB — ready for real AI integration */}
      <ChatbotFAB />
    </ThemeProvider>
  );
}
