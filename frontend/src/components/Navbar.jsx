import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Box, useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NAV_LINKS = [
  { label: 'About',          href: '#about'           },
  { label: 'Experience',     href: '#experience'      },
  { label: 'Skills',         href: '#skills'          },
  { label: 'Certifications', href: '#certifications'  },
  { label: 'Awards',         href: '#accomplishments' },
  { label: 'Education',      href: '#education'       },
  { label: 'Contact',        href: '#contact'         },
];

export default function Navbar() {
  const [drawer, setDrawer]   = useState(false);
  const [active, setActive]   = useState('');
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setDrawer(false);
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(7,13,26,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'all .3s ease',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 6 }, minHeight: 68 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: '1.35rem',
              background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              cursor: 'pointer',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            MD.
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {NAV_LINKS.map((l) => (
              <Button
                key={l.href}
                onClick={() => handleNav(l.href)}
                sx={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: active === l.href.replace('#', '') ? '#00c2ff' : 'text.secondary',
                  borderRadius: 2,
                  px: 1.5,
                  '&:hover': { color: '#00c2ff', background: 'rgba(0,194,255,0.06)' },
                  transition: 'color .2s',
                  fontWeight: active === l.href.replace('#', '') ? 700 : 500,
                }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          {/* Mobile toggle */}
          <IconButton
            sx={{ display: { md: 'none' }, color: 'text.primary' }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}
        PaperProps={{ sx: { background: '#0c1427', width: 240, pt: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
          <IconButton onClick={() => setDrawer(false)} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((l) => (
            <ListItem key={l.href} disablePadding>
              <ListItemButton onClick={() => handleNav(l.href)}>
                <ListItemText
                  primary={l.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem', fontWeight: 500,
                    color: active === l.href.replace('#', '') ? '#00c2ff' : '#7a88a8',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
