import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Breadcrumbs,
  useMediaQuery
} from "@mui/material";
import {
  Work,
  Business,
  Person,
  Search,
  Add,
  TrendingUp,
  School,
  CheckCircle,
  Cancel,
  Schedule,
  FilterList,
  Star,
  Book,
  Visibility,
  ThumbUp,
  Comment,
  Bookmark,
  Refresh,
  Close,
  ExpandMore,
  CorporateFare
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`experience-tabpanel-${index}`}
      aria-labelledby={`experience-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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

function InterviewExperienceNew() {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  const [sortBy, setSortBy] = useState("recent");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [likedExperiences, setLikedExperiences] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    filterAndSortInterviews();
  }, [interviews, searchTerm, sortBy, filterDifficulty, filterResult]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/auth/fetchinterviewexperience');
      setInterviews(response.data.data || []);
      setError("");
    } catch (error) {
      console.error('Error fetching interview experiences:', error);
      setError("Failed to load interview experiences. Please try again.");
      // Set mock data for demo
      setInterviews([
        {
          _id: "1",
          username: "Rahul Kumar",
          companyName: "Google",
          position: "Software Engineer",
          experience: "<p>I had a great experience interviewing at Google. The process consisted of 4 rounds:</p><p><strong>Round 1:</strong> Technical screening with data structures and algorithms</p><p><strong>Round 2:</strong> System design interview</p><p><strong>Round 3:</strong> Behavioral interview with hiring manager</p><p><strong>Round 4:</strong> Final interview with team lead</p><p>The interviewers were very professional and helpful. They provided clear feedback and made me comfortable throughout the process.</p>",
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
          experience: "<p>Microsoft interview was challenging but fair. The focus was on:</p><p><strong>Technical Skills:</strong> React, Node.js, SQL</p><p><strong>Problem Solving:</strong> 3 coding questions</p><p><strong>System Design:</strong> Design a scalable web application</p><p>The interviewers were very knowledgeable and provided good hints when I was stuck.</p>",
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
          experience: "<p>Amazon interview was very rigorous. Key areas covered:</p><p><strong>Cloud Services:</strong> AWS, Lambda, EC2, S3</p><p><strong>System Design:</strong> Design a cloud architecture</p><p><strong>Leadership Principles:</strong> Behavioral questions based on Amazon LPs</p><p>The bar was high, but the experience was valuable for learning.</p>",
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
          experience: "<p>TCS interview was straightforward and well-structured:</p><p><strong>Aptitude Test:</strong> Quantitative and logical reasoning</p><p><strong>Technical Interview:</strong> Java, SQL, and basic programming</p><p><strong>HR Interview:</strong> General questions about career goals</p><p>Overall a good experience for freshers.</p>",
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
          experience: "<p>Infosys interview process was comprehensive:</p><p><strong>Written Test:</strong> Programming and aptitude</p><p><strong>Technical Round:</strong> Java, Python, and web technologies</p><p><strong>Managerial Round:</strong> Team collaboration and project management</p><p>Good company culture and growth opportunities.</p>",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-02-01",
          likes: 22,
          views: 580,
          comments: 9,
          rating: 4.1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortInterviews = () => {
    let filtered = interviews.filter((interview) =>
      interview.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewLevel?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (filterDifficulty !== "all") {
      filtered = filtered.filter(i => i.interviewLevel === filterDifficulty);
    }
    if (filterResult !== "all") {
      filtered = filtered.filter(i => i.result === filterResult);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date || "2024-01-01") - new Date(a.date || "2024-01-01");
        case "popular":
          return (b.likes || 0) - (a.likes || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "company":
          return a.companyName.localeCompare(b.companyName);
        default:
          return 0;
      }
    });

    setFilteredInterviews(filtered);
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

  const getLevelIcon = (level) => {
    switch (level) {
      case 'easy':
        return <School />;
      case 'medium':
        return <Work />;
      case 'difficult':
        return <TrendingUp />;
      default:
        return <Work />;
    }
  };

  const getCategoryIcon = (companyName) => {
    const techGiants = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'];
    if (techGiants.includes(companyName)) return <CorporateFare />;
    return <Business />;
  };

  const toggleSaveExperience = (experienceId) => {
    setSavedExperiences(prev => 
      prev.includes(experienceId) 
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    );
  };

  const toggleLikeExperience = (experienceId) => {
    setLikedExperiences(prev => 
      prev.includes(experienceId) 
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    );
  };

  const openExperienceDetail = (experience) => {
    setSelectedExperience(experience);
    setDetailModalOpen(true);
  };

  const getStatistics = () => {
    const total = interviews.length;
    const successful = interviews.filter(i => i.result === 'Successful').length;
    const difficult = interviews.filter(i => i.interviewLevel === 'difficult').length;
    const avgRating = interviews.reduce((acc, i) => acc + (i.rating || 0), 0) / total || 0;
    
    return { total, successful, difficult, avgRating };
  };

  const stats = getStatistics();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Work sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              PlaceX - Interview Experiences
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
                  background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {displayInterviews.length}
                </Typography>
                <Typography variant="body2">
                  Total Experiences
                </Typography>
              </Paper>
            </Grid>
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
                  {displayInterviews.filter(i => i.result === 'Successful').length}
                </Typography>
                <Typography variant="body2">
                  Successful
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
                  {displayInterviews.filter(i => i.interviewLevel === 'difficult').length}
                </Typography>
                <Typography variant="body2">
                  Difficult Interviews
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
              placeholder="Search experiences by name, company, position, or level..."
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
              startIcon={<Work />}
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

          {/* Interview Experience Cards/List */}
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
                <Work sx={{ fontSize: '3rem', color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No interview experiences found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Share your interview experience to help others prepare!
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
          ) : viewMode === 'cards' ? (
            <Grid container spacing={3}>
              {displayInterviews.map((interview, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={interview._id}>
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
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Experience Header */}
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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Business sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          {interview.companyName}
                        </Typography>
                      </Box>

                      {/* Experience Preview */}
                      <Box sx={{ mb: 2, maxHeight: 120, overflow: 'hidden' }}>
                        <Typography variant="body2" color="text.secondary">
                          <div dangerouslySetInnerHTML={{ __html: sanitizeContent(interview.experience) }} />
                        </Typography>
                      </Box>

                      {/* Status Chips */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={interview.interviewLevel}
                          color={getDifficultyColor(interview.interviewLevel)}
                          size="small"
                          icon={getLevelIcon(interview.interviewLevel)}
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                          label={interview.result}
                          color={getResultColor(interview.result)}
                          size="small"
                          icon={getResultIcon(interview.result)}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 2, bgcolor: alpha('#001f3f', 0.05) }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {/* TODO: Show full experience modal */}}
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
          ) : (
            <Paper elevation={3} sx={{ p: 2 }}>
              <List>
                {displayInterviews.map((interview, index) => (
                  <ListItem key={interview._id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {interview.username?.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6">{interview.username}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview.companyName} • {interview.position}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(interview.experience.substring(0, 200)) + '...' }} />
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={interview.interviewLevel}
                              color={getDifficultyColor(interview.interviewLevel)}
                              size="small"
                            />
                            <Chip
                              label={interview.result}
                              color={getResultColor(interview.result)}
                              size="small"
                            />
                          </Box>
                        </Box>
                      }
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
          onClick={() => navigate('/addexperience')}
        >
          <Add />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}

export default InterviewExperience;
