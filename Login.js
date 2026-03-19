import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Avatar,
  CssBaseline
} from "@mui/material";
import { LockOutlined, School } from "@mui/icons-material";
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

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      setLoading(false);
      return;
    }

    const userData = { email, password };
    try {
      const result = await axios.post("http://localhost:3001/auth", userData);
      if (result.data === "Success") {
        navigate("/home");
      } else if (result.data === "Password Incorrect") {
        setErrorMessage("Incorrect Password");
      } else if (result.data === "Admin") {
        navigate("/admin");
      } else {
        setErrorMessage("Invalid User");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                <School fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
                PlaceX
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Placement Management System
              </Typography>
            </Box>

            <Typography component="h2" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
              Login to Portal
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                {errorMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #001f3f 30%, #003366 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #003366 30%, #001f3f 90%)',
                  }
                }}
                disabled={loading}
                startIcon={<LockOutlined />}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/register")}
                    sx={{ py: 1.5 }}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => navigate("/forgotpassword")}
                    sx={{ py: 1.5 }}
                  >
                    Forgot Password?
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
