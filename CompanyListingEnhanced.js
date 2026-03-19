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
  alpha,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Tooltip,
  Badge,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import {
  Search,
  Business,
  LocationOn,
  AttachMoney,
  Work,
  CalendarToday,
  TrendingUp,
  FilterList,
  Star,
  People,
  AccessTime,
  School,
  CorporateFare,
  Computer,
  SupportAgent,
  Analytics,
  CloudQueue,
  Language,
  Devices,
  Storage,
  Security,
  Speed,
  Sort,
  ViewList,
  ViewModule,
  Bookmark,
  Share,
  Favorite,
  Close
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

function CompanyListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [sortBy, setSortBy] = useState("name"); // name, ctc, rating, date
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify").then((res) => {
      if (!res.data.status) {
        navigate("/");
      }
    });

    axios
      .get("http://localhost:3001/auth/currentUser")
      .then((res) => {
        // setCurrentUser(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
      });
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getCompanies"
        );
        dispatch(getCompanies(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let filtered = companies.filter((company) =>
      company.companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.jobprofile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ctc?.toString().includes(searchTerm) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (filterCategory !== "all") {
      filtered = filtered.filter(company => company.category === filterCategory);
    }
    if (filterType !== "all") {
      filtered = filtered.filter(company => company.type === filterType);
    }
    if (filterSize !== "all") {
      filtered = filtered.filter(company => company.size === filterSize);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.companyname.localeCompare(b.companyname);
        case "ctc":
          return parseFloat(b.ctc) - parseFloat(a.ctc);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "date":
          return new Date(a.doi) - new Date(b.doi);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, filterCategory, filterType, filterSize, sortBy]);

  const displayCompanies = searchTerm || filterCategory !== "all" || filterType !== "all" || filterSize !== "all" ? filteredCompanies : companies;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Tech Giant": return <CorporateFare />;
      case "IT Services": return <Computer />;
      case "Consulting": return <SupportAgent />;
      case "Startup": return <TrendingUp />;
      default: return <Business />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Tech Giant": return "primary";
      case "IT Services": return "secondary";
      case "Consulting": return "success";
      case "Startup": return "warning";
      default: return "default";
    }
  };

  const getTypeColor = (type) => {
    return type === "Product Based" ? "primary" : "secondary";
  };

  const toggleSaveCompany = (companyId) => {
    setSavedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterType("all");
    setFilterSize("all");
    setSortBy("name");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filterCategory !== "all") count++;
    if (filterType !== "all") count++;
    if (filterSize !== "all") count++;
    return count;
  };

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
            <Badge badgeContent={getActiveFiltersCount()} color="error">
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <FilterList />
              </IconButton>
            </Badge>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
                  {displayCompanies.length}
                </Typography>
                <Typography variant="body2">
                  Total Companies
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
                  {displayCompanies.filter(c => c.category === "Tech Giant").length}
                </Typography>
                <Typography variant="body2">
                  Tech Giants
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
                  {displayCompanies.filter(c => parseFloat(c.ctc) >= 20).length}
                </Typography>
                <Typography variant="body2">
                  Premium CTC (20LPA+)
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
                  {displayCompanies.filter(c => c.rating >= 4.5).length}
                </Typography>
                <Typography variant="body2">
                  Top Rated (4.5+)
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Search and Controls */}
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
              placeholder="Search companies by name, profile, CTC, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />
              }}
              sx={{ flexGrow: 1, minWidth: 300 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="ctc">CTC (High to Low)</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="date">Interview Date</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('grid')}
              startIcon={<ViewModule />}
              sx={{ minWidth: 100 }}
            >
              Grid
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

          {/* Company Cards/Grid */}
          {displayCompanies.length === 0 ? (
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
                <Business sx={{ fontSize: '3rem', color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No companies found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or filters
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                startIcon={<Close />}
                sx={{ mt: 2 }}
              >
                Clear All Filters
              </Button>
            </Box>
          ) : viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {displayCompanies.map((company, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
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
                        '&:hover': { bgcolor: 'background.default' }
                      }}
                      onClick={() => toggleSaveCompany(company.id)}
                    >
                      {savedCompanies.includes(company.id) ? 
                        <Favorite color="error" /> : 
                        <Bookmark />
                      }
                    </IconButton>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Company Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56,
                            mr: 2,
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {company.logo || company.companyname?.charAt(0)?.toUpperCase() || 'C'}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary" noWrap>
                            {company.companyname}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {company.jobprofile}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Rating and Reviews */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating 
                          value={company.rating || 4} 
                          precision={0.1} 
                          size="small" 
                          readOnly 
                        />
                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({company.reviews || 0})
                        </Typography>
                      </Box>

                      {/* Company Details */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AttachMoney sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            {company.ctc} LPA
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'secondary.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {company.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'warning.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {new Date(company.doi).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <People sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {company.size}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Status Chips */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={company.category}
                          color={getCategoryColor(company.category)}
                          size="small"
                          icon={getCategoryIcon(company.category)}
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                          label={company.type}
                          color={getTypeColor(company.type)}
                          size="small"
                          variant="outlined"
                        />
                        {parseFloat(company.ctc) >= 20 && (
                          <Chip
                            label="Premium"
                            size="small"
                            color="warning"
                            icon={<TrendingUp />}
                          />
                        )}
                        {company.rating >= 4.5 && (
                          <Chip
                            label="Top Rated"
                            size="small"
                            color="success"
                            icon={<Star />}
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
          ) : (
            <Paper elevation={3} sx={{ p: 2 }}>
              <List>
                {displayCompanies.map((company, index) => (
                  <ListItem key={company.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {company.logo || company.companyname?.charAt(0)?.toUpperCase() || 'C'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6">{company.companyname}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {company.jobprofile} • {company.ctc} LPA
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            {company.location} • {new Date(company.doi).toLocaleDateString()}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip label={company.category} size="small" />
                            <Chip label={company.type} size="small" variant="outlined" />
                          </Box>
                        </Box>
                      }
                    />
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/companypage/${company.id}`}
                      sx={{ ml: 2 }}
                    >
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Container>

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 300, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <Close />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Tech Giant">Tech Giants</MenuItem>
                <MenuItem value="IT Services">IT Services</MenuItem>
                <MenuItem value="Consulting">Consulting</MenuItem>
                <MenuItem value="Startup">Startups</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Company Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Company Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Product Based">Product Based</MenuItem>
                <MenuItem value="Service Based">Service Based</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Company Size</InputLabel>
              <Select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                label="Company Size"
              >
                <MenuItem value="all">All Sizes</MenuItem>
                <MenuItem value="1,000-10,000">1,000-10,000</MenuItem>
                <MenuItem value="5,000+">5,000+</MenuItem>
                <MenuItem value="10,000+">10,000+</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilters}
              sx={{ mb: 2 }}
            >
              Clear All Filters
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setDrawerOpen(false)}
              sx={{
                background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default CompanyListing;
