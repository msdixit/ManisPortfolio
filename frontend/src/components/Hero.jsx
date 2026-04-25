import { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Chip, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CallIcon from '@mui/icons-material/Call';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';       // HackerRank placeholder
import ArticleIcon from '@mui/icons-material/Article'; // Medium placeholder
import { motion } from 'framer-motion';
import { profile } from '../data/resumeData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

function useTyping(phrases) {
  const [text, setText] = useState('');
  const [pi, setPi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const phrase = phrases[pi];
    let timer;
    if (!del) {
      if (ci < phrase.length) {
        timer = setTimeout(() => setCi((c) => c + 1), 90);
      } else {
        timer = setTimeout(() => setDel(true), 1600);
      }
    } else {
      if (ci > 0) {
        timer = setTimeout(() => setCi((c) => c - 1), 55);
      } else {
        setDel(false);
        setPi((p) => (p + 1) % phrases.length);
      }
    }
    setText(phrase.slice(0, ci));
    return () => clearTimeout(timer);
  }, [ci, del, pi, phrases]);

  return text;
}

export default function Hero({ onContactClick }) {
  const typed = useTyping(profile.titles);

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 10 },
        pt: 12,
        pb: 8,
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <Box sx={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,90,240,.32) 0%, transparent 70%)',
        filter: 'blur(100px)', top: -140, left: -160, pointerEvents: 'none',
        animation: 'floatA 9s ease-in-out infinite',
        '@keyframes floatA': { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(40px,28px)' } },
      }} />
      <Box sx={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,194,255,.22) 0%, transparent 70%)',
        filter: 'blur(100px)', bottom: -80, right: -100, pointerEvents: 'none',
        animation: 'floatB 11s ease-in-out infinite',
        '@keyframes floatB': { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(-28px,-20px)' } },
      }} />

      <Box sx={{ maxWidth: 860, position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 7, height: 7, borderRadius: '50%', bgcolor: '#00c2ff',
                  animation: 'pulse 1.8s infinite',
                  '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
                }} />
                {profile.tagline}
              </Box>
            }
            sx={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#00c2ff',
              fontSize: '0.76rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 2.5,
              height: 34,
              backdropFilter: 'blur(10px)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.div {...fadeUp(0.1)}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.4rem' },
              background: 'linear-gradient(135deg, #fff 30%, #a0b4d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.05,
              mb: 1,
            }}
          >
            {profile.name}
          </Typography>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div {...fadeUp(0.2)}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.9rem' },
              color: '#00c2ff',
              fontFamily: '"Syne", sans-serif',
              fontWeight: 600,
              minHeight: '2.4rem',
              mb: 2.5,
            }}
          >
            {typed}
            <Box
              component="span"
              sx={{
                display: 'inline-block', width: 2, height: '1em',
                bgcolor: '#00c2ff', ml: '3px', verticalAlign: 'middle',
                animation: 'blink .7s infinite',
                '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
              }}
            />
          </Typography>
        </motion.div>

        {/* Summary */}
        <motion.div {...fadeUp(0.3)}>
          <Typography
            sx={{ color: 'text.secondary', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.85, mb: 3.5 }}
          >
            {profile.summary[0]}
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.4)}>
          <Stack direction="row" flexWrap="wrap" gap={1.5} mb={3.5}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CallIcon />}
              onClick={onContactClick}
            >
              Contact Me
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              href={profile.resume}
              download
            >
              Download Resume
            </Button>
          </Stack>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fadeUp(0.5)}>
          <Stack direction="row" gap={1.2}>
            {[
              { icon: <LinkedInIcon fontSize="small" />, href: profile.social.linkedin,   label: 'LinkedIn'   },
              { icon: <GitHubIcon fontSize="small" />,   href: profile.social.github,     label: 'GitHub'     },
              { icon: <CodeIcon fontSize="small" />,     href: profile.social.hackerrank, label: 'HackerRank' },
              { icon: <ArticleIcon fontSize="small" />,  href: profile.social.medium,     label: 'Medium'     },
            ].map((s) => (
              <IconButton
                key={s.label}
                component="a"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                sx={{
                  width: 44, height: 44,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'text.secondary',
                  backdropFilter: 'blur(10px)',
                  transition: 'all .2s',
                  '&:hover': {
                    color: '#00c2ff',
                    borderColor: '#00c2ff',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(0,194,255,.22)',
                  },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
}
