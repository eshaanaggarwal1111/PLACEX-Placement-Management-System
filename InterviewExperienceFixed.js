import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TextField
} from "@mui/material";
import {
  Work,
  Business,
  Search,
  Add,
  Star,
  Visibility,
  ThumbUp,
  Comment
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

function InterviewExperienceFixed() {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    const filtered = interviews.filter((interview) =>
      interview.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewLevel?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterviews(filtered);
  }, [interviews, searchTerm]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/auth/fetchinterviewexperience');
      const data = await response.json();
      setInterviews(data.data || []);
      setError("");
    } catch (error) {
      console.error('Error fetching interview experiences:', error);
      setError("Failed to load interview experiences. Using demo data.");
      // Set comprehensive demo data
      setInterviews([
        {
          _id: "1",
          username: "Rahul Kumar",
          companyName: "Google",
          position: "Software Engineer",
          experience: "I had a great experience interviewing at Google. The process consisted of 4 rounds: Technical screening with data structures and algorithms, System design interview, Behavioral interview with hiring manager, and Final interview with team lead. The interviewers were very professional and helpful.",
          interviewLevel: "difficult",
          result: "Successful",
          date: "2024-02-10",
          likes: 45,
          views: 1200,
          comments: 12,
          rating: 4.8
        },
        {
          _id: "2",
          username: "Priya Sharma",
          companyName: "Microsoft",
          position: "Full Stack Developer",
          experience: "Microsoft interview was challenging but fair. The focus was on Technical Skills (React, Node.js, SQL), Problem Solving (3 coding questions), and System Design. The interviewers were very knowledgeable and provided good hints.",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-02-08",
          likes: 32,
          views: 890,
          comments: 8,
          rating: 4.6
        },
        {
          _id: "3",
          username: "Amit Patel",
          companyName: "Amazon",
          position: "Cloud Engineer",
          experience: "Amazon interview was very rigorous. Key areas covered: Cloud Services (AWS, Lambda, EC2, S3), System Design, and Leadership Principles. The bar was high, but the experience was valuable for learning.",
          interviewLevel: "difficult",
          result: "Fail",
          date: "2024-02-05",
          likes: 28,
          views: 750,
          comments: 15,
          rating: 4.2
        },
        {
          _id: "4",
          username: "Neha Gupta",
          companyName: "TCS",
          position: "System Engineer",
          experience: "TCS interview was straightforward and well-structured: Aptitude Test, Technical Interview, and HR Interview. Overall a good experience for freshers.",
          interviewLevel: "easy",
          result: "Successful",
          date: "2024-02-03",
          likes: 18,
          views: 620,
          comments: 6,
          rating: 4.0
        },
        {
          _id: "5",
          username: "Vikram Singh",
          companyName: "Infosys",
          position: "Software Developer",
          experience: "Infosys interview process was comprehensive: Written Test, Technical Round, and Managerial Round. Good company culture and growth opportunities.",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-02-01",
          likes: 22,
          views: 580,
          comments: 9,
          rating: 4.1
        },
        {
          _id: "6",
          username: "Anjali Reddy",
          companyName: "Apple",
          position: "iOS Developer",
          experience: "Apple interview focused on iOS development, Swift programming, and mobile app design. The process included technical assessment, portfolio review, and multiple interview rounds with team members.",
          interviewLevel: "difficult",
          result: "Successful",
          date: "2024-01-28",
          likes: 38,
          views: 920,
          comments: 11,
          rating: 4.7
        },
        {
          _id: "7",
          username: "Karan Mehta",
          companyName: "Meta",
          position: "Frontend Developer",
          experience: "Meta interview was focused on React, JavaScript, and web development. The process included coding challenges, system design, and behavioral interviews focusing on collaboration and innovation.",
          interviewLevel: "difficult",
          result: "Fail",
          date: "2024-01-25",
          likes: 25,
          views: 680,
          comments: 14,
          rating: 4.3
        },
        {
          _id: "8",
          username: "Sneha Patel",
          companyName: "Netflix",
          position: "Backend Engineer",
          experience: "Netflix interview emphasized distributed systems, microservices, and scalability. The process was technical with focus on real-world problem solving and system architecture.",
          interviewLevel: "difficult",
          result: "Successful",
          date: "2024-01-22",
          likes: 42,
          views: 1100,
          comments: 10,
          rating: 4.5
        },
        {
          _id: "9",
          username: "Rohit Sharma",
          companyName: "Adobe",
          position: "Software Engineer",
          experience: "Adobe interview covered creative software development, user experience design, and technical skills. The process was well-structured with focus on both technical and creative abilities.",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-01-20",
          likes: 30,
          views: 750,
          comments: 8,
          rating: 4.4
        },
        {
          _id: "10",
          username: "Divya Kumar",
          companyName: "Oracle",
          position: "Database Developer",
          experience: "Oracle interview focused on database management, SQL optimization, and enterprise software solutions. The process included technical assessments and problem-solving scenarios.",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-01-18",
          likes: 35,
          views: 820,
          comments: 9,
          rating: 4.5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'difficult':
        return 'error';
      default:
        return 'default';
    }
  };

  const getResultColor = (result) => {
    return result === 'Successful' ? 'success' : result === 'Fail' ? 'error' : 'warning';
  };

  const getStatistics = () => {
    const total = interviews.length;
    const successful = interviews.filter(i => i.result === 'Successful').length;
    const difficult = interviews.filter(i => i.interviewLevel === 'difficult').length;
    const avgRating = interviews.reduce((acc, i) => acc + (i.rating || 0), 0) / total || 0;
    
    return { total, successful, difficult, avgRating };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
          <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
            <Toolbar>
              <Work sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Interview Experiences
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
            <Work sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Interview Experiences
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
              p: 2,
              mb: 4,
              display: 'flex',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search experiences by name, company, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />
              }}
              sx={{ flexGrow: 1 }}
            />
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
                  Total Experiences
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
                  {stats.successful}
                </Typography>
                <Typography variant="body2">
                  Successful
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
                  {stats.difficult}
                </Typography>
                <Typography variant="body2">
                  Difficult
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {stats.avgRating.toFixed(1)}
                </Typography>
                <Typography variant="body2">
                  Average Rating
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Interview Experiences */}
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
                <Work sx={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No interview experiences found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or add your own experience!
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/addexperience')}
              >
                Add Your Experience
              </Button>
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
                      {/* Experience Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {interview.username?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {interview.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.position}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Company and Status */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Business sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          {interview.companyName}
                        </Typography>
                      </Box>

                      {/* Experience Preview */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxHeight: 100, overflow: 'hidden' }}>
                        {interview.experience?.substring(0, 150)}...
                      </Typography>

                      {/* Status Chips */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={interview.interviewLevel}
                          color={getDifficultyColor(interview.interviewLevel)}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                          label={interview.result}
                          color={getResultColor(interview.result)}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>

                      {/* Engagement Stats */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <Visibility sx={{ fontSize: 14 }} />
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {interview.views || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <ThumbUp sx={{ fontSize: 14 }} />
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {interview.likes || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <Comment sx={{ fontSize: 14 }} />
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {interview.comments || 0}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ fontSize: 16, color: '#ffc107' }} />
                        <Typography variant="body2" color="text.secondary">
                          {interview.rating || 0}/5.0
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, bgcolor: 'rgba(0,31,63,0.05)' }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert(`Full experience:\n\n${interview.experience}`)}
                        sx={{
                          py: 1.5,
                          fontWeight: 'bold',
                        }}
                      >
                        Read Full Experience
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Floating Action Button */}
          <Fab
            color="primary"
            aria-label="add experience"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
            }}
            onClick={() => navigate('/addexperience')}
          >
            <Add />
          </Fab>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default InterviewExperienceFixed;
