import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  useTheme,
  alpha,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  Work,
  Business,
  Person,
  ArrowBack,
  Save,
  TrendingUp,
  School,
  CheckCircle,
  Cancel,
  Schedule
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

function AddExperience() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    companyName: '',
    position: '',
    experience: '',
    interviewLevel: '',
    result: ''
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify").then((res) => {
      if (res.data.status) {
        // User is authenticated, proceed
      } else {
        navigate("/interviewexperience");
      }
    }).catch(err => {
      console.error("Auth verification failed:", err);
      navigate("/interviewexperience");
    });
  }, [navigate]);

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleExperienceChange = (value) => {
    handleChange('experience', value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience description is required';
    } else if (formData.experience.length < 50) {
      newErrors.experience = 'Please provide at least 50 characters of experience';
    }
    
    if (!formData.interviewLevel) {
      newErrors.interviewLevel = 'Interview level is required';
    }
    
    if (!formData.result) {
      newErrors.result = 'Result is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlertMessage('Please fix the errors below');
      setAlertSeverity('error');
      return;
    }

    setLoading(true);
    setAlertMessage('');
    
    try {
      const response = await axios.post('http://localhost:3001/auth/add-interview', formData);
      console.log('Response:', response.data);
      
      // Reset form
      setFormData({
        username: '',
        companyName: '',
        position: '',
        experience: '',
        interviewLevel: '',
        result: ''
      });
      
      setAlertMessage('Interview experience added successfully!');
      setAlertSeverity('success');
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/interviewexperience');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting experience:', error);
      setAlertMessage('Error submitting your interview experience. Please try again.');
      setAlertSeverity('error');
    } finally {
      setLoading(false);
    }
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

  const getResultIcon = (result) => {
    switch (result) {
      case 'Successful':
        return <CheckCircle />;
      case 'Fail':
        return <Cancel />;
      case 'Pending':
        return <Schedule />;
      default:
        return <Schedule />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate('/interviewexperience')}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Work sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Add Interview Experience
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          {/* Alert Message */}
          {alertMessage && (
            <Alert 
              severity={alertSeverity} 
              sx={{ mb: 3 }}
              onClose={() => setAlertMessage('')}
            >
              {alertMessage}
            </Alert>
          )}

          {/* Main Form Card */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 31, 63, 0.1)',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Form Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    fontSize: '2rem'
                  }}
                >
                  <Work fontSize="large" />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  Share Your Interview Experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Help others prepare by sharing your interview journey
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Username Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="username"
                      value={formData.username}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      error={!!errors.username}
                      helperText={errors.username}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                      }}
                    />
                  </Grid>

                  {/* Company Name Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      error={!!errors.companyName}
                      helperText={errors.companyName}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Business sx={{ mr: 1, color: 'primary.main' }} />
                      }}
                    />
                  </Grid>

                  {/* Position Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Position/Role"
                      name="position"
                      value={formData.position}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      error={!!errors.position}
                      helperText={errors.position}
                      required
                      variant="outlined"
                      placeholder="e.g., Software Engineer, Data Analyst, etc."
                      InputProps={{
                        startAdornment: <Work sx={{ mr: 1, color: 'primary.main' }} />
                      }}
                    />
                  </Grid>

                  {/* Experience Editor */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Interview Experience *
                    </Typography>
                    <Box
                      sx={{
                        border: errors.experience ? '2px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 1,
                        '& .ql-container': {
                          minHeight: '200px',
                          fontFamily: 'Roboto, Arial, sans-serif'
                        },
                        '& .ql-toolbar': {
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          borderBottom: '1px solid rgba(0, 0, 0, 0.23)'
                        }
                      }}
                    >
                      <ReactQuill
                        value={formData.experience}
                        onChange={handleExperienceChange}
                        placeholder="Describe your interview experience in detail... Include questions asked, your preparation, tips for others, etc."
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['clean']
                          ]
                        }}
                      />
                    </Box>
                    {errors.experience && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.experience}
                      </Typography>
                    )}
                  </Grid>

                  {/* Interview Level and Result */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.interviewLevel}>
                      <InputLabel>Interview Difficulty *</InputLabel>
                      <Select
                        name="interviewLevel"
                        value={formData.interviewLevel}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        label="Interview Difficulty *"
                      >
                        <MenuItem value="">
                          <em>Select Difficulty</em>
                        </MenuItem>
                        <MenuItem value="easy">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <School sx={{ mr: 1, fontSize: 16, color: 'success.main' }} />
                            Easy
                          </Box>
                        </MenuItem>
                        <MenuItem value="medium">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Work sx={{ mr: 1, fontSize: 16, color: 'warning.main' }} />
                            Medium
                          </Box>
                        </MenuItem>
                        <MenuItem value="difficult">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrendingUp sx={{ mr: 1, fontSize: 16, color: 'error.main' }} />
                            Difficult
                          </Box>
                        </MenuItem>
                      </Select>
                      {errors.interviewLevel && (
                        <Typography variant="caption" color="error">
                          {errors.interviewLevel}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.result}>
                      <InputLabel>Result *</InputLabel>
                      <Select
                        name="result"
                        value={formData.result}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        label="Result *"
                      >
                        <MenuItem value="">
                          <em>Select Result</em>
                        </MenuItem>
                        <MenuItem value="Successful">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle sx={{ mr: 1, fontSize: 16, color: 'success.main' }} />
                            Successful
                          </Box>
                        </MenuItem>
                        <MenuItem value="Fail">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Cancel sx={{ mr: 1, fontSize: 16, color: 'error.main' }} />
                            Not Selected
                          </Box>
                        </MenuItem>
                        <MenuItem value="Pending">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Schedule sx={{ mr: 1, fontSize: 16, color: 'warning.main' }} />
                            Pending
                          </Box>
                        </MenuItem>
                      </Select>
                      {errors.result && (
                        <Typography variant="caption" color="error">
                          {errors.result}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate('/interviewexperience')}
                        disabled={loading}
                        sx={{ py: 1.5, px: 4 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                        sx={{
                          py: 1.5,
                          px: 6,
                          background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #003366 30%, #001f3f 90%)',
                          },
                        }}
                      >
                        {loading ? 'Submitting...' : 'Share Experience'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Paper
            elevation={2}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              bgcolor: alpha('#001f3f', 0.02)
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              💡 Tips for Sharing Your Experience
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Be specific about the interview process and rounds</li>
                <li>Include questions that were asked (if allowed)</li>
                <li>Share your preparation strategy</li>
                <li>Mention the timeline from application to result</li>
                <li>Provide helpful tips for future candidates</li>
              </ul>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AddExperience;
