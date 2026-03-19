import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  Alert,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import {
  Event,
  Business,
  AccessTime,
  LocationOn,
  CalendarToday,
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
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function JoinInterview() {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    const filtered = interviews.filter((interview) =>
      interview.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterviews(filtered);
  }, [interviews, searchTerm]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      // Mock data for scheduled interviews
      setInterviews([
        {
          _id: "1",
          companyName: "Google",
          position: "Software Engineer",
          type: "Technical Interview",
          date: "2024-02-20",
          time: "10:00 AM",
          location: "Virtual - Google Meet",
          mode: "Online",
          duration: "1 hour",
          description: "Technical interview focusing on data structures, algorithms, and problem-solving skills.",
          requirements: "Strong programming skills, knowledge of data structures and algorithms",
          status: "Open",
          slots: 5,
          registered: 2,
          interviewer: "John Smith - Senior Engineer"
        },
        {
          _id: "2",
          companyName: "Microsoft",
          position: "Full Stack Developer",
          type: "System Design Interview",
          date: "2024-02-22",
          time: "2:00 PM",
          location: "Virtual - Teams",
          mode: "Online",
          duration: "1.5 hours",
          description: "System design interview focusing on scalable architecture and design patterns.",
          requirements: "Experience with system design, distributed systems, and cloud architecture",
          status: "Open",
          slots: 3,
          registered: 1,
          interviewer: "Sarah Johnson - Tech Lead"
        },
        {
          _id: "3",
          companyName: "Amazon",
          position: "Cloud Engineer",
          type: "Technical Assessment",
          date: "2024-02-25",
          time: "11:00 AM",
          location: "Virtual - Zoom",
          mode: "Online",
          duration: "2 hours",
          description: "Cloud engineering assessment with focus on AWS services and infrastructure.",
          requirements: "AWS certification preferred, strong cloud computing knowledge",
          status: "Open",
          slots: 4,
          registered: 3,
          interviewer: "Mike Davis - Cloud Architect"
        },
        {
          _id: "4",
          companyName: "TCS",
          position: "System Engineer",
          type: "HR Interview",
          date: "2024-02-28",
          time: "3:00 PM",
          location: "Bangalore Office",
          mode: "On-site",
          duration: "45 minutes",
          description: "HR interview focusing on cultural fit and career aspirations.",
          requirements: "Good communication skills, positive attitude",
          status: "Open",
          slots: 10,
          registered: 5,
          interviewer: "Priya Sharma - HR Manager"
        },
        {
          _id: "5",
          companyName: "Infosys",
          position: "Software Developer",
          type: "Technical Interview",
          date: "2024-03-01",
          time: "10:30 AM",
          location: "Hyderabad Office",
          mode: "On-site",
          duration: "1 hour",
          description: "Technical interview covering programming fundamentals and problem-solving.",
          requirements: "Strong programming skills, knowledge of software development lifecycle",
          status: "Open",
          slots: 8,
          registered: 4,
          interviewer: "Rajesh Kumar - Senior Developer"
        },
        {
          _id: "6",
          companyName: "Apple",
          position: "iOS Developer",
          type: "Technical Interview",
          date: "2024-03-03",
          time: "2:30 PM",
          location: "Virtual - FaceTime",
          mode: "Online",
          duration: "1.5 hours",
          description: "iOS development interview focusing on Swift, UIKit, and mobile app development.",
          requirements: "iOS development experience, Swift programming skills",
          status: "Open",
          slots: 3,
          registered: 1,
          interviewer: "Emily Chen - iOS Team Lead"
        },
        {
          _id: "7",
          companyName: "Meta",
          position: "Frontend Developer",
          type: "Coding Challenge",
          date: "2024-03-05",
          time: "11:30 AM",
          location: "Virtual - Meta Portal",
          mode: "Online",
          duration: "2 hours",
          description: "Frontend coding challenge with React, JavaScript, and CSS.",
          requirements: "Strong frontend skills, React experience, problem-solving ability",
          status: "Open",
          slots: 6,
          registered: 2,
          interviewer: "Alex Thompson - Frontend Lead"
        },
        {
          _id: "8",
          companyName: "Netflix",
          position: "Backend Engineer",
          type: "System Design",
          date: "2024-03-07",
          time: "1:00 PM",
          location: "Virtual - Netflix Platform",
          mode: "Online",
          duration: "1.5 hours",
          description: "Backend system design focusing on distributed systems and microservices.",
          requirements: "Backend development experience, system design knowledge",
          status: "Open",
          slots: 4,
          registered: 3,
          interviewer: "Lisa Wang - Backend Architect"
        }
      ]);
      setError("");
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setError("Failed to load interviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinInterview = (interview) => {
    setSelectedInterview(interview);
    setJoinDialogOpen(true);
  };

  const handleJoinSubmit = () => {
    // Validate form
    if (!joinForm.name || !joinForm.email || !joinForm.phone) {
      setError("Please fill in all required fields");
      return;
    }

    // Simulate joining interview
    alert(`Successfully joined interview for ${selectedInterview.companyName} - ${selectedInterview.position}!\n\nDetails:\nName: ${joinForm.name}\nEmail: ${joinForm.email}\nPhone: ${joinForm.phone}\n\nInterview Details:\nDate: ${selectedInterview.date}\nTime: ${selectedInterview.time}\nLocation: ${selectedInterview.location}`);
    
    // Update interview registered count
    setInterviews(prev => prev.map(interview => 
      interview._id === selectedInterview._id 
        ? { ...interview, registered: interview.registered + 1 }
        : interview
    ));
    
    // Reset form and close dialog
    setJoinForm({ name: '', email: '', phone: '', experience: '' });
    setJoinDialogOpen(false);
    setSelectedInterview(null);
    setError("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'Closed':
        return 'error';
      case 'Full':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getModeColor = (mode) => {
    return mode === 'Online' ? 'primary' : 'secondary';
  };

  const getStatistics = () => {
    const total = interviews.length;
    const open = interviews.filter(i => i.status === 'Open').length;
    const online = interviews.filter(i => i.mode === 'Online').length;
    const totalSlots = interviews.reduce((acc, i) => acc + i.slots, 0);
    const totalRegistered = interviews.reduce((acc, i) => acc + i.registered, 0);
    
    return { total, open, online, totalSlots, totalRegistered };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
          <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
            <Toolbar>
              <Event sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Join Interview
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Event sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Join Interview
            </Typography>
            <IconButton color="inherit" onClick={fetchInterviews}>
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Search Bar */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search interviews by company, position, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'primary.main' }} />
              }}
              sx={{ 
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
            
            {/* Quick Search */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Quick Search:
              </Typography>
              {['Google', 'Microsoft', 'Amazon', 'TCS', 'Online', 'On-site'].map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  variant="outlined"
                  clickable
                  onClick={() => setSearchTerm(term)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>

          {/* Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
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
                  {stats.total}
                </Typography>
                <Typography variant="body2">
                  Total Interviews
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                  {stats.open}
                </Typography>
                <Typography variant="body2">
                  Open for Registration
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {stats.online}
                </Typography>
                <Typography variant="body2">
                  Online Interviews
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                  {stats.totalRegistered}
                </Typography>
                <Typography variant="body2">
                  Total Registered
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Interview Cards */}
          {filteredInterviews.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  fontSize: '3rem'
                }}
              >
                <Event sx={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No interviews found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or check back later for new interviews.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredInterviews.map((interview) => (
                <Grid item xs={12} sm={6} md={4} key={interview._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,31,63,0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <Business />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {interview.companyName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.position}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Interview Type */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Event sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          {interview.type}
                        </Typography>
                      </Box>

                      {/* Date and Time */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {interview.date} at {interview.time}
                        </Typography>
                      </Box>

                      {/* Location */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {interview.location}
                        </Typography>
                      </Box>

                      {/* Duration */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Duration: {interview.duration}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxHeight: 60, overflow: 'hidden' }}>
                        {interview.description}
                      </Typography>

                      {/* Status Chips */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={interview.status}
                          color={getStatusColor(interview.status)}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                          label={interview.mode}
                          color={getModeColor(interview.mode)}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>

                      {/* Registration Info */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Slots: {interview.registered}/{interview.slots}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Interviewer: {interview.interviewer?.split(' - ')[0]}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, bgcolor: 'rgba(0,31,63,0.05)' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleJoinInterview(interview)}
                        disabled={interview.registered >= interview.slots}
                        sx={{
                          py: 1.5,
                          fontWeight: 'bold',
                          background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
                        }}
                      >
                        {interview.registered >= interview.slots ? 'Full' : 'Join Interview'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Join Interview Dialog */}
          <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Join Interview - {selectedInterview?.companyName}</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={joinForm.email}
                  onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={joinForm.phone}
                  onChange={(e) => setJoinForm({...joinForm, phone: e.target.value})}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Experience (Optional)"
                  multiline
                  rows={3}
                  value={joinForm.experience}
                  onChange={(e) => setJoinForm({...joinForm, experience: e.target.value})}
                  margin="normal"
                />
                
                {selectedInterview && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,31,63,0.05)', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>Interview Details:</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Business fontSize="small" /></ListItemIcon>
                        <ListItemText primary={selectedInterview.companyName} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Event fontSize="small" /></ListItemIcon>
                        <ListItemText primary={selectedInterview.type} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CalendarToday fontSize="small" /></ListItemIcon>
                        <ListItemText primary={`${selectedInterview.date} at ${selectedInterview.time}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><LocationOn fontSize="small" /></ListItemIcon>
                        <ListItemText primary={selectedInterview.location} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AccessTime fontSize="small" /></ListItemIcon>
                        <ListItemText primary={`Duration: ${selectedInterview.duration}`} />
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleJoinSubmit} variant="contained" color="primary">
                Join Interview
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default JoinInterview;
