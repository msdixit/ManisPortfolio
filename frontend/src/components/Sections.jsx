// ─── Section Components ──────────────────────────────────────────────────────
import { useRef, useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Stack, IconButton,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import { motion, useInView } from 'framer-motion';
import {
  profile, stats, experience, skillGroups,
  certifications, accomplishments, education,
} from '../data/resumeData';

// ── Shared helpers ─────────────────────────────────────────────────────────
const GradText = ({ children, sx = {} }) => (
  <Box
    component="span"
    sx={{
      background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      ...sx,
    }}
  >
    {children}
  </Box>
);

const SectionHeader = ({ label, title }) => (
  <Box mb={5}>
    <Typography
      sx={{
        fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#00c2ff', fontWeight: 700, mb: 0.8,
      }}
    >
      {label}
    </Typography>
    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: 'text.primary' }}>
      {title}
    </Typography>
  </Box>
);

const RevealBox = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const sectionSx = (bg) => ({
  position: 'relative', zIndex: 1,
  py: { xs: 8, md: 11 },
  px: { xs: 3, md: 10 },
  background: bg,
});

// ── ABOUT ─────────────────────────────────────────────────────────────────
export function About() {
  return (
    <Box id="about" sx={sectionSx('rgba(12,20,39,0.9)')}>
      <RevealBox><SectionHeader label="Who I Am" title={<>About <GradText>Me</GradText></>} /></RevealBox>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={7}>
          <RevealBox direction="left">
            {profile.summary.map((p, i) => (
              <Typography key={i} color="text.secondary" sx={{ mb: 1.8, lineHeight: 1.85, fontSize: '1.03rem' }}>
                {p}
              </Typography>
            ))}
          </RevealBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <RevealBox direction="right">
            <Grid container spacing={1.5}>
              {stats.map((s) => (
                <Grid item xs={6} key={s.label}>
                  <Paper
                    sx={{
                      p: 2.5, textAlign: 'center', borderRadius: 3,
                      transition: 'transform .2s, border-color .2s',
                      '&:hover': { transform: 'translateY(-4px)', borderColor: '#7f5af0' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Syne",sans-serif', fontWeight: 800, fontSize: '2.1rem',
                        background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {s.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: 'block' }}>
                      {s.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </RevealBox>
        </Grid>
      </Grid>
    </Box>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────────────
export function Experience() {
  return (
    <Box id="experience" sx={sectionSx('transparent')}>
      <RevealBox><SectionHeader label="Career" title={<><GradText>Experience</GradText> &amp; Projects</>} /></RevealBox>
      <Box sx={{ position: 'relative', maxWidth: 1100, mx: 'auto' }}>
        {/* Timeline spine */}
        <Box sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 2, background: 'linear-gradient(to bottom, #7f5af0, #00c2ff)',
          transform: 'translateX(-50%)',
        }} />
        {/* Mobile spine */}
        <Box sx={{
          display: { md: 'none' },
          position: 'absolute', left: 18, top: 0, bottom: 0,
          width: 2, background: 'linear-gradient(to bottom, #7f5af0, #00c2ff)',
        }} />

        {experience.map((exp, i) => (
          <RevealBox key={exp.company} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: i % 2 === 0 ? 'row-reverse' : 'row' },
                gap: { xs: 0, md: 3 },
                mb: 4,
                position: 'relative',
                pl: { xs: 5, md: 0 },
              }}
            >
              {/* Dot */}
              <Box sx={{
                position: 'absolute',
                left: { xs: 10, md: 'calc(50% - 8px)' },
                top: 24,
                width: 16, height: 16, borderRadius: '50%',
                background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
                border: '3px solid #070d1a',
                boxShadow: '0 0 16px rgba(127,90,240,.6)',
                zIndex: 2,
              }} />

              {/* Spacer (desktop alternating) */}
              <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />

              {/* Card */}
              <Paper
                sx={{
                  flex: 1, p: { xs: 2.5, md: 3 }, borderRadius: 3,
                  transition: 'transform .2s, border-color .2s, box-shadow .2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: '#7f5af0',
                    boxShadow: '0 14px 44px rgba(127,90,240,.15)',
                  },
                }}
              >
                <Typography variant="h6" fontWeight={700} color="text.primary">{exp.role}</Typography>
                <Typography sx={{
                  fontWeight: 600, fontSize: '0.9rem', mt: 0.3, mb: 0.2,
                  background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {exp.company}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  📅 {exp.period} {exp.location && `· ${exp.location}`}
                </Typography>
                {exp.projects.map((proj, pi) => (
                  <Box key={pi} sx={{ mt: pi > 0 ? 2 : 0 }}>
                    <Typography sx={{
                      fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: '#00c2ff', mb: 0.8,
                    }}>
                      {proj.name}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2.2, m: 0 }}>
                      {proj.bullets.map((b, bi) => (
                        <Box component="li" key={bi} sx={{ color: 'text.secondary', fontSize: '0.88rem', mb: 0.5, lineHeight: 1.65 }}>
                          {b}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Box>
          </RevealBox>
        ))}
      </Box>
    </Box>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────────────
const CHIP_COLORS = ['primary', 'secondary'];

export function Skills() {
  return (
    <Box id="skills" sx={sectionSx('rgba(12,20,39,0.9)')}>
      <RevealBox><SectionHeader label="Expertise" title={<>Technical <GradText>Skills</GradText></>} /></RevealBox>
      <Grid container spacing={2}>
        {skillGroups.map((g, i) => (
          <Grid item xs={12} sm={6} lg={4} key={g.label}>
            <RevealBox delay={i * 0.05}>
              <Paper sx={{
                p: 2.5, borderRadius: 3, height: '100%',
                transition: 'border-color .2s',
                '&:hover': { borderColor: '#7f5af0' },
              }}>
                <Typography sx={{
                  fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#00c2ff', fontWeight: 700, mb: 1.5,
                }}>
                  {g.label}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {g.skills.map((sk, si) => (
                    <Chip
                      key={sk}
                      label={sk}
                      size="small"
                      sx={{
                        fontSize: '0.76rem', fontWeight: 500,
                        background: si % 2 === 0 ? 'rgba(127,90,240,.12)' : 'rgba(0,194,255,.10)',
                        border: `1px solid ${si % 2 === 0 ? 'rgba(127,90,240,.28)' : 'rgba(0,194,255,.25)'}`,
                        color: 'text.primary',
                        transition: 'all .2s',
                        '&:hover': {
                          background: si % 2 === 0 ? '#7f5af0' : '#00c2ff',
                          color: si % 2 === 0 ? '#fff' : '#070d1a',
                          boxShadow: `0 0 14px ${si % 2 === 0 ? 'rgba(127,90,240,.5)' : 'rgba(0,194,255,.5)'}`,
                          borderColor: 'transparent',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </RevealBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ── CERTIFICATIONS ───────────────────────────────────────────────────────
export function Certifications() {
  return (
    <Box id="certifications" sx={sectionSx('transparent')}>
      <RevealBox><SectionHeader label="Learning" title={<><GradText>Certifications</GradText></>} /></RevealBox>
      <Grid container spacing={2}>
        {certifications.map((c, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={c.name}>
            <RevealBox delay={i * 0.08}>
              <Paper sx={{
                p: 3, textAlign: 'center', borderRadius: 3, height: '100%',
                transition: 'transform .2s, border-color .2s, box-shadow .2s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  borderColor: '#00c2ff',
                  boxShadow: '0 14px 44px rgba(0,194,255,.15)',
                },
              }}>
                <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>{c.icon}</Typography>
                <Typography fontWeight={700} sx={{ fontSize: '0.92rem', lineHeight: 1.4, mb: 0.6 }}>{c.name}</Typography>
                <Typography variant="caption" color="text.secondary">{c.issuer}</Typography>
              </Paper>
            </RevealBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ── ACCOMPLISHMENTS ──────────────────────────────────────────────────────
export function Accomplishments() {
  return (
    <Box id="accomplishments" sx={sectionSx('rgba(12,20,39,0.9)')}>
      <RevealBox><SectionHeader label="Recognition" title={<>Awards &amp; <GradText>Accomplishments</GradText></>} /></RevealBox>
      <Grid container spacing={2}>
        {accomplishments.map((a, i) => (
          <Grid item xs={12} sm={6} md={3} key={a.title}>
            <RevealBox delay={i * 0.08}>
              <Paper sx={{
                p: 3, textAlign: 'center', borderRadius: 3, height: '100%',
                position: 'relative', overflow: 'hidden',
                '&::before': {
                  content: '""', position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(127,90,240,.08), transparent 60%)',
                  pointerEvents: 'none',
                },
                transition: 'transform .2s, border-color .2s',
                '&:hover': { transform: 'translateY(-6px)', borderColor: '#7f5af0' },
              }}>
                <Typography sx={{ fontSize: '2.4rem', mb: 1.2 }}>{a.icon}</Typography>
                <Typography fontWeight={700} sx={{ fontFamily: '"Syne",sans-serif', mb: 0.7 }}>{a.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>{a.desc}</Typography>
              </Paper>
            </RevealBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ── EDUCATION ────────────────────────────────────────────────────────────
export function Education() {
  return (
    <Box id="education" sx={sectionSx('transparent')}>
      <RevealBox><SectionHeader label="Academics" title={<><GradText>Education</GradText></>} /></RevealBox>
      <Box sx={{ maxWidth: 680, mx: 'auto' }}>
        <RevealBox>
          <Paper sx={{
            p: { xs: 3.5, md: 5 }, textAlign: 'center', borderRadius: 4,
            transition: 'transform .2s, border-color .2s',
            '&:hover': { transform: 'translateY(-4px)', borderColor: '#00c2ff' },
          }}>
            <SchoolIcon sx={{ fontSize: '3rem', color: '#7f5af0', mb: 1.5 }} />
            <Typography variant="h5" fontWeight={800} sx={{ mb: 0.8 }}>{education.degree}</Typography>
            <Typography sx={{
              fontWeight: 600, fontSize: '1rem', mb: 0.5,
              background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {education.institution}
            </Typography>
            <Typography variant="body2" color="text.secondary">Class of {education.year}</Typography>
          </Paper>
        </RevealBox>
      </Box>
    </Box>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────
export function Contact({ onContactClick }) {
  const links = [
    { icon: <EmailIcon />,    label: profile.email,        href: `mailto:${profile.email}` },
    { icon: <PhoneIcon />,    label: profile.phones[0],    href: `tel:${profile.phones[0].replace(/\s/g,'')}` },
    { icon: <PhoneIcon />,    label: profile.phones[1],    href: `tel:${profile.phones[1].replace(/\s/g,'')}` },
    { icon: <LocationOnIcon />, label: profile.location,   href: '#' },
    { icon: <LinkedInIcon />, label: 'LinkedIn',            href: profile.social.linkedin },
  ];

  return (
    <Box id="contact" sx={{ ...sectionSx('rgba(12,20,39,0.9)'), textAlign: 'center' }}>
      <RevealBox><SectionHeader label="Get In Touch" title={<>Let's <GradText>Connect</GradText></>} /></RevealBox>
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        <RevealBox>
          <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.05rem', lineHeight: 1.85 }}>
            Whether you're looking to hire, collaborate on a project, or just say hello — my inbox is always open. Based in Singapore, open to opportunities worldwide.
          </Typography>
        </RevealBox>
        <RevealBox delay={0.1}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {links.map((l) => (
              <Box
                key={l.label}
                component="a"
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 99, px: 2.5, py: 1,
                  color: 'text.primary', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                  backdropFilter: 'blur(12px)',
                  transition: 'all .2s',
                  '& svg': { color: '#00c2ff', fontSize: '1.1rem' },
                  '&:hover': {
                    borderColor: '#00c2ff',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0,194,255,.2)',
                  },
                }}
              >
                {l.icon} {l.label}
              </Box>
            ))}
          </Box>
        </RevealBox>
      </Box>
    </Box>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────
export function Footer() {
  const socials = [
    { icon: <LinkedInIcon />, href: profile.social.linkedin },
    { icon: <GitHubIcon />,   href: profile.social.github   },
    { icon: <CodeIcon />,     href: profile.social.hackerrank },
    { icon: <ArticleIcon />,  href: profile.social.medium   },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative', zIndex: 1,
        background: '#070d1a',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        px: { xs: 3, md: 10 }, py: 3.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Built by{' '}
        <Box component="span" sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg,#7f5af0,#00c2ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Manisankar Dixit
        </Box>
        {' '}· 2025
      </Typography>
      <Stack direction="row" gap={0.5}>
        {socials.map((s, i) => (
          <IconButton
            key={i}
            component="a"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: '#00c2ff' } }}
          >
            {s.icon}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}
