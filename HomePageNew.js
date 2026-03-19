import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../../redux/companySlice.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  alpha,
  Fade,
  Slide
} from "@mui/material";
import {
  School,
  BusinessCenter,
  CalendarToday,
  TrendingUp,
  AccountCircle,
  Notifications,
  Logout,
  Dashboard,
  Work,
  QuestionAnswer,
  Star
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar.js";

const theme = createTheme({
  palette: {
    primary: {
      main: '#001f3f',
      light: '#003366',
    },
    secondary: {
      main: '#0066cc',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
        },
      },
    },
  },
});

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const [currentUser, setCurrentUser] = useState(null);
  const [placementStatus, setPlacementStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    upcomingInterviews: 0,
    placementRate: 0,
    activeApplications: 0
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify").then((res) => {
      if (!res.data.status) {
        navigate("/");
      }
    });

    axios
      .get("http://localhost:3001/auth/currentUser")
      .then((res) => {
        setCurrentUser(res.data.user);
        fetchPlacementStatus(res.data.user._id);
        fetchUserStats(res.data.user._id);
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  const fetchPlacementStatus = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/placementStatus/${userId}`);
      setPlacementStatus(response.data);
    } catch (error) {
      console.error("Error fetching placement status:", error);
    }
  };

  const fetchUserStats = async (userId) => {
    try {
      // Mock stats for now - replace with actual API calls
      setStats({
        totalCompanies: companies.length,
        upcomingInterviews: Math.floor(Math.random() * 5),
        placementRate: 85,
        activeApplications: Math.floor(Math.random() * 10) + 1
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getCompanies");
        dispatch(getCompanies(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post("http://localhost:3001/auth/logout")
      .then(() => {
        navigate("/");
      })
      .catch(err => console.log(err));
    handleMenuClose();
  };

  const quickActions = [
    { title: "View Companies", icon: <BusinessCenter />, path: "/companylisting", color: "#001f3f" },
    { title: "Scheduled Interviews", icon: <CalendarToday />, path: "/scheduledInterview", color: "#0066cc" },
    { title: "Interview Experiences", icon: <QuestionAnswer />, path: "/interviewexperience", color: "#2e7d32" },
    { title: "FAQs", icon: <Star />, path: "/faq", color: "#ed6c02" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="fixed" sx={{ bgcolor: 'primary.main', boxShadow: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Toolbar>
            <School sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              PlaceX
            </Typography>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Notifications />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ 
                bgcolor: alpha('#fff', 0.1),
                '&:hover': { bgcolor: alpha('#fff', 0.2) }
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { mt: 1, minWidth: 200 }
              }}
            >
              <MenuItem onClick={() => { navigate("/home"); handleMenuClose(); }}>
                <Dashboard sx={{ mr: 2 }} /> Dashboard
              </MenuItem>
              <MenuItem onClick={() => { navigate("/companylisting"); handleMenuClose(); }}>
                <Work sx={{ mr: 2 }} /> Companies
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 2 }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
          {/* Welcome Section */}
          <Slide in={true} direction="down" timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                background: 'linear-gradient(135deg, #001f3f 0%, #003366 50%, #0066cc 100%)',
                borderRadius: 4,
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                      Welcome back, {currentUser?.name}! 👋
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                      Your journey to career success continues here
                    </Typography>
                    
                    {placementStatus && placementStatus.status === "Placed" && (
                      <Fade in={true} timeout={1000}>
                        <Chip
                          icon={<Star />}
                          label={`🎉 Congratulations! Placed at ${placementStatus.companyName}`}
                          sx={{
                            bgcolor: 'success.main',
                            color: 'white',
                            fontSize: '1rem',
                            py: 2,
                            px: 1,
                            fontWeight: 'bold'
                          }}
                        />
                      </Fade>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: alpha('#fff', 0.2),
                        fontSize: '3rem',
                        mx: 'auto',
                        display: 'block'
                      }}
                    >
                      {currentUser?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Slide>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: "Total Companies", value: stats.totalCompanies, icon: <BusinessCenter />, color: "#001f3f" },
              { title: "Upcoming Interviews", value: stats.upcomingInterviews, icon: <CalendarToday />, color: "#0066cc" },
              { title: "Placement Rate", value: `${stats.placementRate}%`, icon: <TrendingUp />, color: "#2e7d32" },
              { title: "Active Applications", value: stats.activeApplications, icon: <Work />, color: "#ed6c02" }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={true} timeout={1000 + index * 200}>
                  <Card sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0, 31, 63, 0.15)'
                    }
                  }}>
                    <Avatar sx={{ 
                      bgcolor: stat.color, 
                      mx: 'auto', 
                      mb: 2,
                      width: 56,
                      height: 56
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions */}
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={true} timeout={1200 + index * 200}>
                  <Card 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      border: '2px solid transparent',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        borderColor: action.color,
                        boxShadow: '0 12px 40px rgba(0, 31, 63, 0.15)'
                      }
                    }}
                    onClick={() => navigate(action.path)}
                  >
                    <Avatar sx={{ 
                      bgcolor: action.color, 
                      mx: 'auto', 
                      mb: 2,
                      width: 56,
                      height: 56
                    }}>
                      {action.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {action.title}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Recent Activity
          </Typography>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No recent activity to display. Start exploring companies and applying for positions!
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
