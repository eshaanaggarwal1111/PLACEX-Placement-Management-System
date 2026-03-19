import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating,
  Breadcrumbs,
  Skeleton,
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
  ExpandMore,
  Bookmark,
  ThumbUp,
  Comment,
  Visibility,
  CalendarToday,
  LocationOn,
  AccessTime,
  Sort,
  ViewList,
  ViewModule,
  Refresh,
  MoreVert,
  Flag,
  Report,
  Edit,
  Delete,
  Send,
  Favorite,
  Timeline,
  Group,
  Assessment,
  Psychology,
  Lightbulb,
  WorkHistory,
  Interview,
  QuestionAnswer,
  RateReview,
  Analytics,
  TrendingDown,
  People,
  CorporateFare,
  Computer,
  SupportAgent
} from "@mui/icons-material";

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

function InterviewExperienceComplete() {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // cards, list, grid
  const [sortBy, setSortBy] = useState("recent"); // recent, popular, rating, company
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  const [filterCompany, setFilterCompany] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [likedExperiences, setLikedExperiences] = useState([]);
  const [reportedExperiences, setReportedExperiences] = useState([]);
  const [shareMenuAnchor, setShareMenuAnchor] = useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    filterAndSortInterviews();
  }, [interviews, searchTerm, sortBy, filterDifficulty, filterResult, filterCompany]);

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
          rating: 4.8,
          helpful: 38
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
          rating: 4.6,
          helpful: 28
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
    if (filterCompany !== "all") {
      filtered = filtered.filter(i => i.companyName === filterCompany);
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

  const getResultIcon = (result) => {
    return result === 'Successful' ? <CheckCircle /> : result === 'Fail' ? <Cancel /> : <Schedule />;
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

  const handleShare = (event, experienceId) => {
    setShareMenuAnchor(event.currentTarget);
    setSelectedExperienceId(experienceId);
  };

  const handleMoreOptions = (event, experienceId) => {
    setMoreMenuAnchor(event.currentTarget);
    setSelectedExperienceId(experienceId);
  };

  const getUniqueCompanies = () => {
    const companies = [...new Set(interviews.map(i => i.companyName))];
    return companies.sort();
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
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card>
                    <CardContent>
                      <Skeleton variant="text" width="60%" height={32} />
                      <Skeleton variant="text" width="40%" height={24} />
                      <Skeleton variant="rectangular" width="100%" height={120} sx={{ mt: 2 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Work sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Interview Experiences
            </Typography>
            <IconButton color="inherit" onClick={fetchInterviews}>
              <Refresh />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={savedExperiences.length} color="secondary">
                <Bookmark />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Typography color="inherit" component={Link} to="/home">
              Home
            </Typography>
            <Typography color="text.primary">Interview Experiences</Typography>
          </Breadcrumbs>

          {/* Statistics Cards */}
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
                  Avg Rating
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Search and Filters */}
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
            
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                label="Difficulty"
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="difficult">Difficult</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Result</InputLabel>
              <Select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
                label="Result"
              >
                <MenuItem value="all">All Results</MenuItem>
                <MenuItem value="Successful">Successful</MenuItem>
                <MenuItem value="Fail">Not Selected</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Company</InputLabel>
              <Select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                label="Company"
              >
                <MenuItem value="all">All Companies</MenuItem>
                {getUniqueCompanies().map(company => (
                  <MenuItem key={company} value={company}>{company}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="views">Most Viewed</MenuItem>
                <MenuItem value="company">Company Name</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant={viewMode === 'cards' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('cards')}
              startIcon={<ViewModule />}
              sx={{ minWidth: 100 }}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('list')}
              startIcon={<ViewList />}
              sx={{ minWidth: 100 }}
            >
              List
            </Button>
          </Paper>

          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label={`All Experiences (${filteredInterviews.length})`} />
              <Tab label={`Saved (${savedExperiences.length})`} />
              <Tab label={`Popular`} />
              <Tab label={`Recent`} />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <TabPanel value={tabValue} index={0}>
            {filteredInterviews.length === 0 ? (
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
                {filteredInterviews.map((interview) => (
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
                        position: 'relative'
                      }}
                    >
                      {/* Save Button */}
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          boxShadow: 1,
                          '&:hover': { bgcolor: 'background.default' },
                          zIndex: 1
                        }}
                        onClick={() => toggleSaveExperience(interview._id)}
                      >
                        {savedExperiences.includes(interview._id) ? 
                          <Favorite color="error" /> : 
                          <Bookmark />
                        }
                      </IconButton>

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

                        {/* Company and Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                          {getCategoryIcon(interview.companyName)}
                          <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            {interview.companyName}
                          </Typography>
                          <Rating value={interview.rating || 4} size="small" readOnly />
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

                        {/* Engagement Stats */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Visibility sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption">{interview.views || 0}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThumbUp sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption">{interview.likes || 0}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Comment sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption">{interview.comments || 0}</Typography>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ p: 2, bgcolor: alpha('#001f3f', 0.05) }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => openExperienceDetail(interview)}
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
                  {filteredInterviews.map((interview) => (
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
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
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
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Typography variant="caption">
                                Views: {interview.views || 0}
                              </Typography>
                              <Typography variant="caption">
                                Likes: {interview.likes || 0}
                              </Typography>
                              <Typography variant="caption">
                                Rating: {interview.rating || 4}/5
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Button
                        variant="outlined"
                        onClick={() => openExperienceDetail(interview)}
                        sx={{ ml: 2 }}
                      >
                        Read More
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Saved Experiences
            </Typography>
            <Grid container spacing={3}>
              {interviews.filter(i => savedExperiences.includes(i._id)).map((interview) => (
                <Grid item xs={12} sm={6} md={4} key={interview._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{interview.username}</Typography>
                      <Typography variant="body2">{interview.companyName}</Typography>
                      <Typography variant="body2" color="text.secondary">{interview.position}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Popular Experiences
            </Typography>
            <Grid container spacing={3}>
              {interviews.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6).map((interview) => (
                <Grid item xs={12} sm={6} md={4} key={interview._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{interview.username}</Typography>
                      <Typography variant="body2">{interview.companyName}</Typography>
                      <Typography variant="body2" color="text.secondary">{interview.position}</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption">Likes: {interview.likes || 0}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Experiences
            </Typography>
            <Grid container spacing={3}>
              {interviews.sort((a, b) => new Date(b.date || "2024-01-01") - new Date(a.date || "2024-01-01")).slice(0, 6).map((interview) => (
                <Grid item xs={12} sm={6} md={4} key={interview._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{interview.username}</Typography>
                      <Typography variant="body2">{interview.companyName}</Typography>
                      <Typography variant="body2" color="text.secondary">{interview.position}</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption">Date: {interview.date || "Recent"}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Container>

        {/* Detail Modal */}
        <Dialog
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedExperience && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Interview Experience at {selectedExperience.companyName}
                  </Typography>
                  <IconButton onClick={() => setDetailModalOpen(false)}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {selectedExperience.username?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedExperience.username}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedExperience.position}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Chip
                      label={selectedExperience.interviewLevel}
                      color={getDifficultyColor(selectedExperience.interviewLevel)}
                      icon={getLevelIcon(selectedExperience.interviewLevel)}
                    />
                    <Chip
                      label={selectedExperience.result}
                      color={getResultColor(selectedExperience.result)}
                      icon={getResultIcon(selectedExperience.result)}
                    />
                    <Rating value={selectedExperience.rating || 4} readOnly />
                  </Box>

                  <Typography variant="body1" component="div">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeContent(selectedExperience.experience) }} />
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDetailModalOpen(false)}>Close</Button>
                <Button
                  variant="contained"
                  onClick={() => toggleLikeExperience(selectedExperience._id)}
                  startIcon={likedExperiences.includes(selectedExperience._id) ? <Favorite /> : <ThumbUp />}
                >
                  {likedExperiences.includes(selectedExperience._id) ? 'Liked' : 'Like'}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

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
      </Box>
    </ThemeProvider>
  );
}

export default InterviewExperienceComplete;
