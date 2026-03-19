import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Chip,
  InputBase,
  Card,
  CardContent,
  Grid,
  useMediaQuery
} from '@mui/material';
import {
  Home,
  Business,
  Work,
  Event,
  QuestionAnswer,
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Search,
  Dashboard,
  Settings,
  Logout,
  TrendingUp,
  School,
  Assessment,
  People,
  Bookmark,
  Star,
  Timeline,
  Assignment,
  Login,
  PersonAdd,
  Close,
  ArrowDropDown,
  Apps,
  Article,
  Forum,
  Help,
  Feedback,
  Security,
  AdminPanelSettings
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

function NavbarEnhanced() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify").then((res) => {
      if (res.data.status) {
        axios.get("http://localhost:3001/auth/currentUser")
          .then((userRes) => {
            setCurrentUser(userRes.data.user);
          })
          .catch(() => {
            setCurrentUser({ name: "Student User", email: "student@placex.com" });
          });
      }
    });
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:3001/auth/logout")
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/");
      });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/home', badge: null },
    { text: 'Companies', icon: <Business />, path: '/companylisting', badge: '20' },
    { text: 'Interviews', icon: <Event />, path: '/scheduledinterview', badge: '5' },
    { text: 'Experiences', icon: <Article />, path: '/interviewexperience', badge: '5' },
    { text: 'FAQs', icon: <QuestionAnswer />, path: '/faqs', badge: null },
  ];

  const userMenuItems = [
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'My Applications', icon: <Assignment />, path: '/applications' },
    { text: 'Saved Companies', icon: <Bookmark />, path: '/saved' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { divider: true },
    { text: 'Logout', icon: <Logout />, action: handleLogout },
  ];

  const quickActions = [
    { text: 'Search Jobs', icon: <Search />, path: '/companylisting' },
    { text: 'Add Experience', icon: <Article />, path: '/addexperience' },
    { text: 'View Schedule', icon: <Event />, path: '/scheduledinterview' },
    { text: 'Browse Companies', icon: <Business />, path: '/companylisting' },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/companylisting?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="fixed" 
        sx={{
          bgcolor: isScrolled ? alpha('#001f3f', 0.95) : '#001f3f',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 2px 10px rgba(0,31,63,0.2)' : 'none',
          transition: 'all 0.3s ease',
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ minHeight: '70px' }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Work sx={{ mr: 1, fontSize: 32, color: 'white' }} />
            <Typography 
              variant="h5" 
              component={Link} 
              to="/home"
              sx={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: isMobile ? '1.2rem' : '1.5rem'
              }}
            >
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

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1, ml: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: isActivePath(item.path) ? '#0066cc' : 'white',
                    bgcolor: isActivePath(item.path) ? alpha('#0066cc', 0.1) : 'transparent',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mx: 0.5,
                    '&:hover': {
                      bgcolor: alpha('#0066cc', 0.2),
                      color: 'white',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.text}
                  {item.badge && (
                    <Badge 
                      badgeContent={item.badge} 
                      color="secondary" 
                      sx={{ ml: 1 }}
                    >
                      <Box />
                    </Badge>
                  )}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          {!isMobile && (
            <Box sx={{ mr: 2, position: 'relative' }}>
              <InputBase
                placeholder="Search companies, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                sx={{
                  bgcolor: alpha('#ffffff', 0.15),
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  color: 'white',
                  width: '250px',
                  '&::placeholder': {
                    color: alpha('#ffffff', 0.7),
                  },
                  '&:hover': {
                    bgcolor: alpha('#ffffff', 0.25),
                  },
                  '&:focus': {
                    bgcolor: alpha('#ffffff', 0.25),
                  },
                }}
                startAdornment={<Search sx={{ mr: 1, color: alpha('#ffffff', 0.7) }} />}
              />
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton sx={{ color: 'white' }}>
                <Badge badgeContent={notifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="User Menu">
              <IconButton 
                onClick={(e) => setUserMenuOpen(e.currentTarget)}
                sx={{ color: 'white' }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#0066cc' }}>
                  {currentUser?.name?.charAt(0)?.toUpperCase() || 'S'}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Mobile Menu */}
            {isMobile && (
              <IconButton 
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* User Menu Dropdown */}
        <Menu
          anchorEl={userMenuOpen}
          open={Boolean(userMenuOpen)}
          onClose={() => setUserMenuOpen(null)}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,31,63,0.15)',
            }
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {currentUser?.name || 'Student User'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email || 'student@placex.com'}
            </Typography>
          </Box>
          {userMenuItems.map((item, index) => (
            item.divider ? (
              <Divider key={index} />
            ) : (
              <MenuItem
                key={item.text}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                  }
                  setUserMenuOpen(null);
                }}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            )
          ))}
        </Menu>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2, bgcolor: '#001f3f', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Work sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" fontWeight="bold">
                PlaceX
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <InputBase
            placeholder="Search..."
            fullWidth
            sx={{
              bgcolor: alpha('#001f3f', 0.1),
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
            startAdornment={<Search sx={{ mr: 1, color: '#001f3f' }} />}
          />
        </Box>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActivePath(item.path) ? alpha('#0066cc', 0.1) : 'transparent',
                '&:hover': {
                  bgcolor: alpha('#0066cc', 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ color: isActivePath(item.path) ? '#0066cc' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: isActivePath(item.path) ? '#0066cc' : 'inherit',
                    fontWeight: isActivePath(item.path) ? 'bold' : 'normal'
                  }
                }}
              />
              {item.badge && (
                <Badge badgeContent={item.badge} color="secondary" sx={{ ml: 'auto' }}>
                  <Box />
                </Badge>
              )}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2, my: 2 }} />

        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: 'text.secondary' }}>
          Quick Actions
        </Typography>
        <List sx={{ px: 1 }}>
          {quickActions.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: alpha('#0066cc', 0.1),
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: '70px' }} />
    </ThemeProvider>
  );
}

export default NavbarEnhanced;
