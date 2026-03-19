import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../../redux/companySlice.jsx";
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
  InputAdornment,
  TextField,
  Paper,
  useTheme,
  alpha
} from "@mui/material";
import {
  Search,
  Business,
  LocationOn,
  AttachMoney,
  Work,
  CalendarToday,
  TrendingUp,
  FilterList
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

function CompanyListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getCompanies");
        dispatch(getCompanies(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.jobprofile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ctc?.toString().includes(searchTerm)
    );
    setFilteredCompanies(filtered);
  }, [companies, searchTerm]);

  const displayCompanies = searchTerm ? filteredCompanies : companies;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Modern Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Business sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              PlaceX - Company Listings
            </Typography>
            <IconButton color="inherit">
              <FilterList />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Search and Filter Section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search companies by name, profile, or CTC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                  {displayCompanies.length} Companies Available
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Company Cards Grid */}
          <Grid container spacing={4}>
            {displayCompanies.map((company, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={company.id || index}>
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
                    overflow: 'hidden',
                  }}
                  >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Company Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                          mr: 2,
                          fontSize: '1.5rem'
                        }}
                      >
                        {company.companyname?.charAt(0)?.toUpperCase() || 'C'}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {company.companyname || 'Company Name'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.jobprofile || 'Job Profile'}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Company Details */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Work sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {company.jobprofile || 'Software Engineer'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AttachMoney sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          {company.ctc || '8-12'} LPA
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, mr: 1, color: 'secondary.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {company.location || 'Mumbai, Pune'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'warning.main' }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {company.doi ? new Date(company.doi).toLocaleDateString() : 'TBD'}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Status Chips */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label="Active"
                        size="small"
                        color="success"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Chip
                        label="On-Campus"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {company.ctc && company.ctc > 10 && (
                        <Chip
                          label="Premium"
                          size="small"
                          color="warning"
                          icon={<TrendingUp />}
                        />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, bgcolor: alpha('#001f3f', 0.05) }}>
                    <Button
                      fullWidth
                      variant="contained"
                      component={Link}
                      to={`/companypage/${company.id}`}
                      sx={{
                        background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #003366 30%, #001f3f 90%)',
                        },
                        py: 1.5,
                        fontWeight: 'bold',
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* No Companies Found */}
          {displayCompanies.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {searchTerm ? 'No companies found matching your search.' : 'No companies available at the moment.'}
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default CompanyListing;
