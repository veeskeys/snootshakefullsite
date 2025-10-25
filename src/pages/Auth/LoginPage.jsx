import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import finalogo from "../../assets/finalogo.png";

const primaryColor = "#7CC6FE";
const secondaryColor = "#FFB347";
const bgGradient = "linear-gradient(135deg, #E6F2FA 0%, #F0FAFF 100%)";

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
  };

  return (
    <Box
      sx={{
        background: bgGradient,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2, // overall top padding for the page
        fontFamily: "'Poppins', sans-serif", // apply Poppins globally
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#ffffff",
          p: 5,
          mx: "auto",
          mt: 0, // keep your change
        }}
      >
        {/* Logo & Welcome */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={finalogo}
            alt="SnootShake Logo"
            width={250}
            style={{ marginTop: "-40px" }} // your logo adjustment
          />
          <Typography
            variant="h5"
            mt={-7} // keep your custom spacing
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Welcome!
          </Typography>
          <Typography variant="body1" mt={0.1} sx={{ color: "#555" }}>
            Log in or Sign up to get started.
          </Typography>
        </Box>

        {/* Login Fields */}
        <Box mt={2}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
            InputLabelProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
            InputLabelProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
          />

          {/* Buttons */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: "#5bb0e6" },
              fontFamily: "'Poppins', sans-serif",
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: secondaryColor,
              color: secondaryColor,
              "&:hover": { backgroundColor: secondaryColor, color: "#fff" },
              fontFamily: "'Poppins', sans-serif",
            }}
            onClick={() => onNavigate("signup")}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            sx={{ mt: 2, color: "#888", fontFamily: "'Poppins', sans-serif" }}
            onClick={() => console.log("Forgot Password clicked")}
          >
            Forgot Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
