import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  Paper,
  useTheme,
  alpha,
  Fab,
  IconButton,
  Tooltip,
  Badge,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  Rating,
  useMediaQuery
} from '@mui/material';
import {
  Work,
  Business,
  TrendingUp,
  School,
  Event,
  QuestionAnswer,
  Search,
  Add,
  Star,
  People,
  Assessment,
  Timeline as TimelineIcon,
  CheckCircle,
  Schedule,
  Notifications,
  Bookmark,
  PlayArrow,
  Speed,
  Target,
  Lightbulb,
  EmojiEvents,
  Groups,
  Article,
  Help,
  Settings,
  Refresh,
  ArrowForward,
  Launch,
  FilterList,
  ViewList,
  ViewModule,
  CalendarToday,
  AttachMoney,
  LocationOn,
  AccessTime,
  Person,
  CorporateFare,
  Computer,
  SupportAgent
} from '@mui/icons-material';
import NavbarEnhanced from './HomeComponents/NavbarEnhanced.js';
import FooterEnhanced from './HomeComponents/FooterEnhanced.js';

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
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function HomeEnhanced() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [placementStatus, setPlacementStatus] = useState('Not Placed');
  const [companies, setCompanies] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify user
        const verifyRes = await axios.get("http://localhost:3001/auth/verify");
        if (verifyRes.data.status) {
          const userRes = await axios.get("http://localhost:3001/auth/currentUser");
          setCurrentUser(userRes.data.user || { name: "Student User", email: "student@placex.com" });
        }

        // Fetch data
        const [companiesRes, interviewsRes, experiencesRes] = await Promise.all([
          axios.get("http://localhost:3001/auth/getCompanies"),
          axios.get("http://localhost:3001/auth/getScheduledInterviews"),
          axios.get("http://localhost:3001/auth/fetchinterviewexperience")
        ]);

        setCompanies(companiesRes.data.slice(0, 6) || []);
        setInterviews(interviewsRes.data.slice(0, 3) || []);
        setExperiences(experiencesRes.data.data?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set mock data for demo
        setCurrentUser({ name: "Student User", email: "student@placex.com" });
        setCompanies([]);
        setInterviews([]);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickActions = [
    { 
      title: 'Search Jobs', 
      icon: <Search />, 
      color: '#0066cc', 
      path: '/companylisting',
      description: 'Browse 20+ companies'
    },
    { 
      title: 'Add Experience', 
      icon: <Article />, 
      color: '#2e7d32', 
      path: '/addexperience',
      description: 'Share your interview experience'
    },
    { 
      title: 'View Schedule', 
      icon: <Event />, 
      color: '#ed6c02', 
      path: '/scheduledinterview',
      description: 'Check upcoming interviews'
    },
    { 
      title: 'Browse FAQs', 
      icon: <QuestionAnswer />, 
      color: '#d32f2f', 
      path: '/faqs',
      description: 'Get your questions answered'
    },
  ];

  const stats = [
    { 
      label: 'Total Companies', 
      value: '20', 
      icon: <Business />, 
      color: '#0066cc',
      change: '+8 this month',
      trend: 'up'
    },
    { 
      label: 'Interviews Scheduled', 
      value: '5', 
      icon: <Event />, 
      color: '#2e7d32',
      change: '+2 this week',
      trend: 'up'
    },
    { 
      label: 'Experiences Shared', 
      value: '5', 
      icon: <Article />, 
      color: '#ed6c02',
      change: '+3 this week',
      trend: 'up'
    },
    { 
      label: 'Profile Completion', 
      value: '85%', 
      icon: <Assessment />, 
      color: '#d32f2f',
      change: '+15% this month',
      trend: 'up'
    },
  ];

  const recentActivities = [
    { 
      title: 'New Company Added', 
      description: 'Spotify is now hiring Data Engineers', 
      time: '2 hours ago',
      icon: <Business />,
      color: '#0066cc'
    },
    { 
      title: 'Interview Experience', 
      description: 'New experience shared by Amit Patel from Amazon', 
      time: '5 hours ago',
      icon: <Article />,
      color: '#2e7d32'
    },
    { 
      title: 'Interview Scheduled', 
      description: 'Your interview with Microsoft is confirmed for Feb 18', 
      time: '1 day ago',
      icon: <Event />,
      color: '#ed6c02'
    },
  ];

  const upcomingDeadlines = [
    { 
      title: 'Microsoft Interview', 
      date: 'Feb 18, 2024', 
      time: '2:00 PM',
      type: 'Interview',
      priority: 'high'
    },
    { 
      title: 'Google Application', 
      date: 'Feb 20, 2024', 
      time: '11:59 PM',
      type: 'Application',
      priority: 'medium'
    },
    { 
      title: 'Resume Workshop', 
      date: 'Feb 22, 2024', 
      time: '4:00 PM',
      type: 'Workshop',
      priority: 'low'
    },
  ];

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavbarEnhanced />

        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #001f3f 0%, #003366 50%, #0066cc 100%)',
            color: 'white',
            py: 8,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
                  Welcome back, {currentUser?.name || 'Student'}! 👋
                </Typography>
                <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                  Your placement journey continues. Track your progress and discover new opportunities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/companylisting"
                    startIcon={<Search />}
                    sx={{
                      bgcolor: 'white',
                      color: '#001f3f',
                      '&:hover': {
                        bgcolor: alpha('#ffffff', 0.9),
                      },
                    }}
                  >
                    Browse Companies
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/scheduledinterview"
                    startIcon={<Event />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: alpha('#ffffff', 0.1),
                      },
                    }}
                  >
                    View Schedule
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 200,
                      height: 200,
                      bgcolor: alpha('#ffffff', 0.2),
                      fontSize: '4rem',
                      mx: 'auto',
                      border: '4px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    {currentUser?.name?.charAt(0)?.toUpperCase() || 'S'}
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {placementStatus}
                  </Typography>
                  <Chip 
                    label="Active Job Seeker" 
                    sx={{ 
                      mt: 1, 
                      bgcolor: alpha('#ffffff', 0.2), 
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Container maxWidth="xl" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'white',
                    boxShadow: '0 8px 32px rgba(0,31,63,0.1)',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0,31,63,0.15)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main">
                      {stat.change}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} lg={8}>
              {/* Tabs Section */}
              <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="Recent Companies" />
                    <Tab label="Upcoming Interviews" />
                    <Tab label="Latest Experiences" />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={2}>
                    {companies.map((company) => (
                      <Grid item xs={12} sm={6} key={company.id}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {company.companyname?.charAt(0) || 'C'}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {company.companyname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {company.jobprofile} • {company.ctc} LPA
                            </Typography>
                          </Box>
                          <IconButton component={Link} to={`/companypage/${company.id}`}>
                            <ArrowForward />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <List>
                    {interviews.map((interview) => (
                      <ListItem key={interview.id} divider>
                        <ListItemIcon>
                          <Event sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={interview.company}
                          secondary={`${interview.position} • ${interview.date} • ${interview.time}`}
                        />
                        <Chip label={interview.mode} size="small" />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <List>
                    {experiences.map((experience) => (
                      <ListItem key={experience._id} divider>
                        <ListItemIcon>
                          <Article sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${experience.companyName} - ${experience.position}`}
                          secondary={`By ${experience.username} • ${experience.interviewLevel} • ${experience.result}`}
                        />
                        <Chip 
                          label={experience.result} 
                          color={experience.result === 'Successful' ? 'success' : 'default'} 
                          size="small" 
                        />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              </Paper>

              {/* Quick Actions */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(0,31,63,0.15)',
                          },
                        }}
                        onClick={() => navigate(action.path)}
                      >
                        <Avatar sx={{ bgcolor: action.color, mx: 'auto', mb: 1 }}>
                          {action.icon}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} lg={4}>
              {/* Recent Activities */}
              <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Recent Activities
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: activity.color, width: 32, height: 32 }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              {/* Upcoming Deadlines */}
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Upcoming Deadlines
                </Typography>
                <List>
                  {upcomingDeadlines.map((deadline, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <Schedule 
                          sx={{ 
                            color: deadline.priority === 'high' ? 'error.main' : 
                                   deadline.priority === 'medium' ? 'warning.main' : 'success.main' 
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={deadline.title}
                        secondary={`${deadline.date} • ${deadline.time}`}
                      />
                      <Chip 
                        label={deadline.type} 
                        size="small" 
                        color={deadline.priority === 'high' ? 'error' : 
                               deadline.priority === 'medium' ? 'warning' : 'success'} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="quick actions"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
          }}
          onClick={() => setQuickActionsOpen(true)}
        >
          <Add />
        </Fab>

        {/* Quick Actions Dialog */}
        <Dialog
          open={quickActionsOpen}
          onClose={() => setQuickActionsOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Quick Actions</DialogTitle>
          <DialogContent>
            <List>
              {quickActions.map((action, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => {
                    navigate(action.path);
                    setQuickActionsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: action.color, width: 40, height: 40 }}>
                      {action.icon}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={action.title}
                    secondary={action.description}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQuickActionsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <FooterEnhanced />
      </Box>
    </ThemeProvider>
  );
}

export default HomeEnhanced;
