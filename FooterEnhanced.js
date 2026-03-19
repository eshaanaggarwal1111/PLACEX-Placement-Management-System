import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Business,
  Help,
  Security,
  TrendingUp,
  Star,
  ArrowUpward
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001f3f',
      light: '#003366',
    },
    secondary: {
      main: '#0066cc',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function FooterEnhanced() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Platform',
      icon: <Work />,
      links: [
        { text: 'Dashboard', path: '/home' },
        { text: 'Company Listing', path: '/companylisting' },
        { text: 'Scheduled Interviews', path: '/scheduledinterview' },
        { text: 'Interview Experiences', path: '/interviewexperience' },
      ]
    },
    {
      title: 'Resources',
      icon: <School />,
      links: [
        { text: 'FAQs', path: '/faqs' },
        { text: 'Career Guidance', path: '/guidance' },
        { text: 'Interview Tips', path: '/tips' },
        { text: 'Resume Builder', path: '/resume' },
      ]
    },
    {
      title: 'Company',
      icon: <Business />,
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' },
        { text: 'Partners', path: '/partners' },
      ]
    },
    {
      title: 'Support',
      icon: <Help />,
      links: [
        { text: 'Help Center', path: '/help' },
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Cookie Policy', path: '/cookies' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook', color: '#1877f2' },
    { icon: <Twitter />, name: 'Twitter', color: '#1da1f2' },
    { icon: <LinkedIn />, name: 'LinkedIn', color: '#0077b5' },
    { icon: <Instagram />, name: 'Instagram', color: '#e4405f' },
    { icon: <YouTube />, name: 'YouTube', color: '#ff0000' },
  ];

  const stats = [
    { label: 'Companies', value: '20+', icon: <Business /> },
    { label: 'Students', value: '10K+', icon: <School /> },
    { label: 'Placements', value: '5K+', icon: <TrendingUp /> },
    { label: 'Rating', value: '4.8', icon: <Star /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          bgcolor: '#001f3f',
          color: 'white',
          mt: 'auto',
          position: 'relative',
        }}
      >
        {/* Stats Section */}
        <Box
          sx={{
            bgcolor: alpha('#0066cc', 0.1),
            py: 3,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      {React.cloneElement(stat.icon, { sx: { fontSize: 24, color: '#0066cc' } })}
                      <Typography variant="h4" fontWeight="bold" sx={{ ml: 1 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main Footer Content */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Work sx={{ mr: 1, fontSize: 32, color: '#0066cc' }} />
                  <Typography variant="h5" fontWeight="bold">
                    PlaceX
                  </Typography>
                  <Chip 
                    label="PRO" 
                    size="small" 
                    sx={{ 
                      ml: 1, 
                      bgcolor: '#0066cc', 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }} 
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
                  Your comprehensive placement management platform. Connect with top companies, 
                  prepare for interviews, and accelerate your career journey.
                </Typography>
                
                {/* Contact Info */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ mr: 1, fontSize: 18, color: '#0066cc' }} />
                    <Typography variant="body2">support@placex.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ mr: 1, fontSize: 18, color: '#0066cc' }} />
                    <Typography variant="body2">+91 98765 43210</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, fontSize: 18, color: '#0066cc' }} />
                    <Typography variant="body2">Bangalore, India</Typography>
                  </Box>
                </Box>

                {/* Social Links */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Follow Us
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={social.name}
                        sx={{
                          bgcolor: alpha(social.color, 0.1),
                          color: social.color,
                          '&:hover': {
                            bgcolor: social.color,
                            color: 'white',
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {React.cloneElement(section.icon, { sx: { fontSize: 20, color: '#0066cc', mr: 1 } })}
                    <Typography variant="h6" fontWeight="bold">
                      {section.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.path}
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          '&:hover': {
                            color: '#0066cc',
                          },
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Bottom Footer */}
        <Box
          sx={{
            bgcolor: alpha('#000000', 0.3),
            py: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  © 2024 PlaceX. All rights reserved. Made with ❤️ for students.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                  <Link
                    href="/privacy"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        color: '#0066cc',
                      },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        color: '#0066cc',
                      },
                    }}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/cookies"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        color: '#0066cc',
                      },
                    }}
                  >
                    Cookie Policy
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Scroll to Top Button */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            bgcolor: '#0066cc',
            color: 'white',
            '&:hover': {
              bgcolor: '#0052a3',
            },
            boxShadow: '0 4px 12px rgba(0,102,204,0.3)',
          }}
        >
          <ArrowUpward />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default FooterEnhanced;
