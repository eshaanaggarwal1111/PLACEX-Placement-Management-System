import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  useTheme,
  alpha,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Alert,
  Fab,
  TextField
} from "@mui/material";
import {
  Event,
  Business,
  AccessTime,
  LocationOn,
  VideoCall,
  Phone,
  Email,
  Today,
  Upcoming,
  Add,
  CalendarToday,
  Schedule,
  FilterList,
  Search
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function ScheduledInterview() {
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [viewMode, setViewMode] = useState("cards"); // cards, calendar, list
  const navigate = useNavigate();

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
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchScheduledInterviews = async () => {
        try {
          const userId = currentUser._id;
          
          // Mock data for now - replace with actual API call
          const mockInterviews = [
            {
              id: "1",
              companyName: "Google",
              jobProfile: "Software Engineer",
              interviewDate: "2024-02-15",
              interviewTime: "10:00 AM",
              interviewMode: "Online",
              location: "Virtual - Google Meet",
              interviewer: "John Smith",
              status: "upcoming",
              type: "Technical Interview",
              duration: "60 minutes",
              notes: "Focus on data structures and algorithms"
            },
            {
              id: "2",
              companyName: "Microsoft",
              jobProfile: "Full Stack Developer",
              interviewDate: "2024-02-18",
              interviewTime: "2:00 PM",
              interviewMode: "Offline",
              location: "Microsoft Office, Hyderabad",
              interviewer: "Sarah Johnson",
              status: "upcoming",
              type: "Technical + HR Round",
              duration: "90 minutes",
              notes: "Prepare React and Node.js concepts"
            },
            {
              id: "3",
              companyName: "Amazon",
              jobProfile: "Cloud Engineer",
              interviewDate: "2024-02-22",
              interviewTime: "11:00 AM",
              interviewMode: "Online",
              location: "Virtual - Zoom",
              interviewer: "Mike Wilson",
              status: "upcoming",
              type: "System Design",
              duration: "75 minutes",
              notes: "Focus on AWS services and architecture"
            },
            {
              id: "4",
              companyName: "IBM",
              jobProfile: "Cloud Architect",
              interviewDate: "2024-02-25",
              interviewTime: "3:00 PM",
              interviewMode: "Offline",
              location: "IBM Office, Bangalore",
              interviewer: "Emily Davis",
              status: "upcoming",
              type: "Managerial Round",
              duration: "45 minutes",
              notes: "Discuss project experience and leadership"
            },
            {
              id: "5",
              companyName: "Accenture",
              jobProfile: "Technology Consultant",
              interviewDate: "2024-03-01",
              interviewTime: "10:30 AM",
              interviewMode: "Online",
              location: "Virtual - Teams",
              interviewer: "Robert Brown",
              status: "upcoming",
              type: "Case Study",
              duration: "60 minutes",
              notes: "Business problem-solving scenario"
            }
          ];

          setScheduledInterviews(mockInterviews);
          
          // Original API call (uncomment when backend is ready)
          /*
          const response = await axios.get(
            `http://localhost:3001/auth/scheduledInterviews/${userId}`
          );
          setScheduledInterviews(response.data.scheduledInterviews);
          */
        } catch (error) {
          console.error(error);
        }
      };

      fetchScheduledInterviews();
    }
  }, [currentUser]);

  useEffect(() => {
    const filtered = scheduledInterviews.filter((interview) =>
      interview.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobProfile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewMode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterviews(filtered);
  }, [scheduledInterviews, searchTerm]);

  const displayInterviews = searchTerm ? filteredInterviews : scheduledInterviews;

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'success';
      case 'completed': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getModeIcon = (mode) => {
    return mode === 'Online' ? <VideoCall /> : <LocationOn />;
  };

  const formatInterviewDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const interviewDate = new Date(dateString);
    return interviewDate.toDateString() === today.toDateString();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Event sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              PlaceX - Scheduled Interviews
            </Typography>
            <IconButton color="inherit">
              <FilterList />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Stats and Search Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {displayInterviews.length}
                </Typography>
                <Typography variant="body2">
                  Total Interviews
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ed6c02 0%, #d97706 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {displayInterviews.filter(i => isToday(i.interviewDate)).length}
                </Typography>
                <Typography variant="body2">
                  Today's Interviews
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {displayInterviews.filter(i => i.status === 'upcoming').length}
                </Typography>
                <Typography variant="body2">
                  Upcoming
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Search and View Mode */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search interviews by company, profile, or mode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />
              }}
              sx={{ flexGrow: 1, minWidth: 300 }}
            />
            <Button
              variant={viewMode === 'cards' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('cards')}
              startIcon={<Schedule />}
              sx={{ minWidth: 120 }}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('list')}
              startIcon={<List />}
              sx={{ minWidth: 120 }}
            >
              List
            </Button>
          </Paper>

          {/* Interview Cards/List */}
          {displayInterviews.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar
                sx={{
                  bgcolor: alpha('#001f3f', 0.1),
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  fontSize: '3rem'
                }}
              >
                <CalendarToday sx={{ fontSize: '3rem', color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No interviews scheduled
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your scheduled interviews will appear here once companies schedule them.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Business />}
                sx={{ mt: 3 }}
                onClick={() => navigate('/companylisting')}
              >
                Browse Companies
              </Button>
            </Box>
          ) : viewMode === 'cards' ? (
            <Grid container spacing={3}>
              {displayInterviews.map((interview, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={interview.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 31, 63, 0.15)',
                      },
                      borderRadius: 3,
                      borderLeft: isToday(interview.interviewDate) ? `4px solid ${theme.palette.success.main}` : 'none'
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Interview Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                            mr: 2,
                            fontSize: '1.2rem'
                          }}
                        >
                          {interview.companyName?.charAt(0)?.toUpperCase() || 'I'}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {interview.companyName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.jobProfile}
                          </Typography>
                        </Box>
                        <Chip
                          label={interview.status}
                          color={getStatusColor(interview.status)}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>

                      {/* Interview Details */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {formatInterviewDate(interview.interviewDate)}
                          </Typography>
                          {isToday(interview.interviewDate) && (
                            <Chip label="Today" color="success" size="small" sx={{ ml: 1 }} />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTime sx={{ fontSize: 16, mr: 1, color: 'secondary.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {interview.interviewTime}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {getModeIcon(interview.interviewMode)}
                          <Typography variant="body2" sx={{ flexGrow: 1, ml: 1 }}>
                            {interview.interviewMode}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'warning.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1, ml: 1 }}>
                            {interview.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Business sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1, ml: 1 }}>
                            {interview.type}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Interviewer Info */}
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          Interviewer:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {interview.interviewer}
                        </Typography>
                      </Box>

                      {/* Notes */}
                      {interview.notes && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: alpha('#001f3f', 0.05), borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Notes:</strong> {interview.notes}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>

                    <CardActions sx={{ p: 2, bgcolor: alpha('#001f3f', 0.05) }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<VideoCall />}
                        sx={{
                          background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #003366 30%, #001f3f 90%)',
                          },
                          py: 1.5,
                          fontWeight: 'bold',
                        }}
                      >
                        Join Interview
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper elevation={3} sx={{ p: 2 }}>
              <List>
                {displayInterviews.map((interview, index) => (
                  <ListItem key={interview.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {interview.companyName?.charAt(0)?.toUpperCase() || 'I'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6">{interview.companyName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.jobProfile}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {formatInterviewDate(interview.interviewDate)} at {interview.interviewTime}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.interviewMode} • {interview.location}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={interview.status}
                      color={getStatusColor(interview.status)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
          }}
        >
          <Add />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}

export default ScheduledInterview;
