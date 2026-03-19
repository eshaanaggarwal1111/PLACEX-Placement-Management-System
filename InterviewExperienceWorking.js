import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  alpha
} from "@mui/material";
import {
  Work,
  Business,
  Search,
  Add,
  Book
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

function InterviewExperienceWorking() {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards");
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
          experience: "<h3>Google Software Engineer Interview Experience</h3><h4>Interview Process Overview</h4><p>I had a great experience interviewing at Google. The process consisted of 4 comprehensive rounds that tested both technical and behavioral skills.</p><h4>Round 1: Technical Screening (45 minutes)</h4><ul><li>Data Structures: Arrays, Trees, Graphs, Dynamic Programming</li><li>Algorithms: Sorting, Searching, Path Finding</li><li>Problem Solving: 2 medium-level coding questions</li><li>System Design: Basic scalability concepts</li></ul><h4>Round 2: System Design Interview (60 minutes)</h4><ul><li>Design a URL shortening service</li><li>Consider scalability, availability, and consistency</li><li>Database design and API design</li><li>Trade-offs and optimization strategies</li></ul><h4>Round 3: Behavioral Interview (45 minutes)</h4><ul><li>Leadership experience and team collaboration</li><li>Problem-solving approach and conflict resolution</li><li>Google's culture and values alignment</li><li>Previous project discussions</li></ul><h4>Round 4: Final Interview with Team Lead (60 minutes)</h4><ul><li>Deep dive into technical skills</li><li>Team fit and collaboration style</li><li>Compensation and role expectations</li><li>Q&A with the team</li></ul><h4>Tips for Success</h4><p><strong>Technical Preparation:</strong> Focus on data structures, algorithms, and system design fundamentals. Practice coding on whiteboard.</p><p><strong>Behavioral Preparation:</strong> Use STAR method for behavioral questions. Research Google's values.</p><p><strong>Overall:</strong> Be confident, ask clarifying questions, and show your problem-solving process.</p>",
          interviewLevel: "difficult",
          result: "Successful",
          date: "2024-02-10",
          likes: 45,
          views: 1200,
          comments: 12,
          rating: 4.8,
          helpful: 38,
          interviewRounds: 4,
          duration: "3.5 hours",
          location: "Bangalore, India",
          offerCTC: "45 LPA",
          interviewType: "On-site",
          preparationTime: "2 months"
        },
        {
          _id: "2",
          username: "Priya Sharma",
          companyName: "Microsoft",
          position: "Full Stack Developer",
          experience: "<h3>Microsoft Full Stack Developer Interview</h3><h4>Interview Process</h4><p>Microsoft interview was challenging but fair. The focus was on practical skills and problem-solving abilities.</p><h4>Technical Skills Assessment</h4><ul><li><strong>Frontend:</strong> React, JavaScript, CSS, HTML5</li><li><strong>Backend:</strong> Node.js, Express, REST APIs</li><li><strong>Database:</strong> SQL, NoSQL concepts</li><li><strong>Cloud:</strong> Azure basics and deployment</li></ul><h4>Problem Solving Round</h4><ul><li>3 coding questions of increasing difficulty</li><li>Array manipulation and string processing</li><li>Tree traversal and graph algorithms</li><li>Dynamic programming problems</li></ul><h4>System Design</h4><ul><li>Design a scalable web application</li><li>Database schema design</li><li>API architecture and microservices</li><li>Security considerations and best practices</li></ul><h4>Interview Experience</h4><p>The interviewers were very knowledgeable and provided good hints when I was stuck. They focused on understanding my thought process rather than just the final answer.</p><h4>Preparation Tips</h4><p><strong>Practice:</strong> LeetCode medium problems, system design basics</p><p><strong>Projects:</strong> Have 2-3 good projects ready to discuss</p><p><strong>Communication:</strong> Explain your approach clearly while coding</p>",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-02-08",
          likes: 32,
          views: 890,
          comments: 8,
          rating: 4.6,
          helpful: 25,
          interviewRounds: 3,
          duration: "2.5 hours",
          location: "Hyderabad, India",
          offerCTC: "35 LPA",
          interviewType: "Virtual",
          preparationTime: "1.5 months"
        },
        {
          _id: "3",
          username: "Amit Patel",
          companyName: "Amazon",
          position: "Cloud Engineer",
          experience: "<h3>Amazon Cloud Engineer Interview</h3><h4>Interview Process</h4><p>Amazon interview was very rigorous with focus on AWS services and leadership principles.</p><h4>Cloud Services Assessment</h4><ul><li><strong>Compute:</strong> EC2, Lambda, Elastic Beanstalk</li><li><strong>Storage:</strong> S3, EBS, Glacier</li><li><strong>Database:</strong> RDS, DynamoDB, Redshift</li><li><strong>Networking:</strong> VPC, CloudFront, Route 53</li></ul><h4>System Design Round</h4><ul><li>Design a cloud architecture for a startup</li><li>Cost optimization strategies</li><li>High availability and disaster recovery</li><li>Security implementation and compliance</li></ul><h4>Leadership Principles</h4><ul><li><strong>Customer Obsession:</strong> Customer-centric problem solving</li><li><strong>Ownership:</strong> Taking responsibility and initiative</li><li><strong>Invent and Simplify:</strong> Innovation and efficiency</li><li><strong>Are Right, A Lot:</strong> Data-driven decision making</li></ul><h4>Challenges Faced</h4><p>The bar was very high, and they expected deep knowledge of AWS services. Behavioral questions were situational and required specific examples.</p><h4>Learning Experience</h4><p>Despite not being selected, the experience was valuable for learning about cloud architecture and Amazon's interview process.</p><h4>Preparation Advice</h4><p><strong>AWS Certification:</strong> Get AWS Solutions Architect certification</p><p><strong>Leadership Stories:</strong> Prepare specific examples for each principle</p><p><strong>System Design:</strong> Practice designing scalable cloud solutions</p>",
          interviewLevel: "difficult",
          result: "Fail",
          date: "2024-02-05",
          likes: 28,
          views: 750,
          comments: 15,
          rating: 4.2,
          helpful: 20,
          interviewRounds: 4,
          duration: "4 hours",
          location: "Pune, India",
          offerCTC: "Not Selected",
          interviewType: "Virtual",
          preparationTime: "3 months"
        },
        {
          _id: "4",
          username: "Neha Gupta",
          companyName: "TCS",
          position: "System Engineer",
          experience: "<h3>TCS System Engineer Interview</h3><h4>Interview Process</h4><p>TCS interview was straightforward and well-structured, perfect for freshers.</p><h4>Round 1: Aptitude Test</h4><ul><li><strong>Quantitative:</strong> Percentages, ratios, profit & loss</li><li><strong>Logical Reasoning:</strong> Pattern recognition, series completion</li><li><strong>Verbal Ability:</strong> Reading comprehension, grammar</li><li><strong>Time Management:</strong> 60 minutes for 40 questions</li></ul><h4>Round 2: Technical Interview</h4><ul><li><strong>Programming:</strong> Java basics, OOP concepts</li><li><strong>Database:</strong> SQL queries, normalization</li><li><strong>Web Technologies:</strong> HTML, CSS, JavaScript basics</li><li><strong>Problem Solving:</strong> Simple algorithms and data structures</li></ul><h4>Round 3: HR Interview</h4><ul><li><strong>Career Goals:</strong> Short-term and long-term plans</li><li><strong>Team Skills:</strong> Collaboration and communication</li><li><strong>Company Knowledge:</strong> Understanding of TCS</li><li><strong>Salary Expectations:</strong> Discussion about compensation</li></ul><h4>Interview Experience</h4><p>The interviewers were friendly and supportive. They focused on understanding my thought process rather than just technical knowledge.</p><h4>Tips for Freshers</h4><p><strong>Preparation:</strong> Practice aptitude questions and basic programming</p><p><strong>Communication:</strong> Be confident and clear in your answers</p><p><strong>Attitude:</strong> Show willingness to learn and adapt</p>",
          interviewLevel: "easy",
          result: "Successful",
          date: "2024-02-03",
          likes: 18,
          views: 620,
          comments: 6,
          rating: 4.0,
          helpful: 15,
          interviewRounds: 3,
          duration: "2 hours",
          location: "Chennai, India",
          offerCTC: "8 LPA",
          interviewType: "On-site",
          preparationTime: "1 month"
        },
        {
          _id: "5",
          username: "Vikram Singh",
          companyName: "Infosys",
          position: "Software Developer",
          experience: "<h3>Infosys Software Developer Interview</h3><h4>Interview Process</h4><p>Infosys interview process was comprehensive with multiple assessment rounds.</p><h4>Round 1: Written Test</h4><ul><li><strong>Programming:</strong> C++, Java, Python basics</li><li><strong>Aptitude:</strong> Logical reasoning and quantitative analysis</li><li><strong>English:</strong> Grammar and vocabulary</li><li><strong>Duration:</strong> 90 minutes</li></ul><h4>Round 2: Technical Round</h4><ul><li><strong>Languages:</strong> Java, Python, web technologies</li><li><strong>Concepts:</strong> OOP, data structures, algorithms</li><li><strong>Database:</strong> SQL, basic database design</li><li><strong>Projects:</strong> Discussion of academic projects</li></ul><h4>Round 3: Managerial Round</h4><ul><li><strong>Team Collaboration:</strong> Working in team environments</li><li><strong>Problem Solving:</strong> Approach to technical challenges</li><li><strong>Communication:</strong> Client interaction skills</li><li><strong>Leadership:</strong> Taking initiative and responsibility</li></ul><h4>Company Culture</h4><p>Infosys has good training programs and growth opportunities. They focus on continuous learning and skill development.</p><h4>Selection Process</h4><p>The selection was based on overall performance in all rounds. They look for candidates with good technical skills and communication abilities.</p><h4>Preparation Tips</h4><p><strong>Technical:</strong> Focus on programming fundamentals and basic concepts</p><p><strong>Soft Skills:</strong> Develop communication and teamwork abilities</p><p><strong>Practice:</strong> Solve previous year questions and mock tests</p>",
          interviewLevel: "medium",
          result: "Successful",
          date: "2024-02-01",
          likes: 22,
          views: 580,
          comments: 9,
          rating: 4.1,
          helpful: 18,
          interviewRounds: 3,
          duration: "2.5 hours",
          location: "Bangalore, India",
          offerCTC: "10 LPA",
          interviewType: "On-site",
          preparationTime: "1.5 months"
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
              startIcon={<Book />}
              sx={{ minWidth: 120 }}
            >
              List
            </Button>
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
                  {interviews.length}
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
                  {interviews.filter(i => i.result === 'Successful').length}
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
                    const successRate = total > 0 ? ((successful / total) * 100).toFixed(1) : 0;
                    
                    return { 
                      total, 
                      successful, 
                      difficult, 
                      avgRating, 
                      totalViews, 
                      totalLikes, 
                      avgDuration,
                      successRate 
                    };
                  };
                  const statistics = getStatistics();
                  return (
                    <div>
                      <Typography variant="h4" fontWeight="bold">
                        {statistics.successRate}%
                      </Typography>
                      <Typography variant="body2">
                        Success Rate
                      </Typography>
                    </div>
                  );
                })()}
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
                  {filteredInterviews.length}
                </Typography>
                <Typography variant="body2">
                  Filtered Results
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
                        <div dangerouslySetInnerHTML={{ __html: interview.experience?.substring(0, 150) }} />
                      </Typography>

                      {/* Additional Details */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <strong>Location:</strong> {interview.location || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <strong>Duration:</strong> {interview.duration || 'N/A'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <strong>CTC:</strong> {interview.offerCTC || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <strong>Type:</strong> {interview.interviewType || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>

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
                        <Chip
                          label={`${interview.interviewRounds || 0} Rounds`}
                          variant="outlined"
                          size="small"
                          sx={{ fontSize: '0.7rem' }}
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
                    </CardContent>
                    <CardActions sx={{ p: 2, bgcolor: alpha('#001f3f', 0.05) }}>
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
          ) : (
            <Paper elevation={3} sx={{ p: 2 }}>
              {filteredInterviews.map((interview) => (
                <Box key={interview._id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {interview.username?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {interview.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {interview.companyName} • {interview.position}
                      </Typography>
                    </Box>
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
                  <Typography variant="body2" color="text.secondary">
                    {interview.experience}
                  </Typography>
                </Box>
              ))}
            </Paper>
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

export default InterviewExperienceWorking;
