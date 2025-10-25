import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import finalogo from "../../assets/finalogo.png";

const primaryColor = "#7CC6FE";
const secondaryColor = "#FFB347";
const bgGradient = "linear-gradient(135deg, #E6F2FA 0%, #F0FAFF 100%)";

const SignUpPage = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [hasViewedTerms, setHasViewedTerms] = useState(false); // Track if user has seen the T&C

  const handleSignUp = () => {
    if (!agreeTerms) {
      alert("You must agree to the terms and conditions to sign up.");
      return;
    }
    console.log("Signing up:", { name, email, phone, password });
    // placeholder for backend signup logic
  };

  const handleCheckboxChange = (e) => {
    if (!hasViewedTerms) {
      // Force modal open if user hasn't viewed terms yet
      setOpenTerms(true);
    } else {
      setAgreeTerms(e.target.checked);
    }
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
    setHasViewedTerms(true);
    setAgreeTerms(true); // Automatically check box after viewing
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
        pt: 2,
        fontFamily: "'Poppins', sans-serif",
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
          mt: -7,
        }}
      >
        {/* Logo & Welcome */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={finalogo}
            alt="SnootShake Logo"
            width={250}
            style={{ marginTop: "-40px" }}
          />
          <Typography
            variant="h5"
            mt={-7}
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Sign Up
          </Typography>
          <Typography variant="body1" mt={0.1} sx={{ color: "#555" }}>
            Create your account to get started
          </Typography>
        </Box>

        {/* Owner Sign Up Fields */}
        <Box mt={2}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
            InputLabelProps={{ sx: { fontFamily: "'Poppins', sans-serif" } }}
          />
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
            label="Phone Number"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={handleCheckboxChange}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
              />
            }
            label={
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>
                I agree to the{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setOpenTerms(true)}
                  underline="hover"
                >
                  terms and conditions
                </Link>
              </Typography>
            }
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            sx={{
              mt: 2,
              color: "#888",
              fontFamily: "'Poppins', sans-serif",
            }}
            onClick={() => onNavigate("login")}
          >
            Already have an account? Log In
          </Button>
        </Box>
      </Paper>

      {/* Terms and Conditions Modal */}
      <Dialog open={openTerms} onClose={handleCloseTerms} maxWidth="sm" fullWidth>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">
            <strong>1. Acceptance of Terms</strong><br/>
            By accessing or using SnootShake, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, you may not use our services.<br/><br/>

            <strong>2. Eligibility</strong><br/>
            You must be at least 18 years old to use SnootShake. By signing up, you confirm that you meet this requirement.<br/><br/>

            <strong>3. Account Registration</strong><br/>
            - You are responsible for providing accurate and complete information during sign-up.<br/>
            - You are responsible for maintaining the confidentiality of your account credentials.<br/>
            - You are responsible for all activity under your account.<br/><br/>

            <strong>4. Use of the Service</strong><br/>
            - SnootShake is intended for tracking and managing your dog’s health information.<br/>
            - You agree not to use the service for any unlawful or unauthorized purpose.<br/>
            - You agree not to interfere with or disrupt SnootShake or its servers.<br/><br/>

            <strong>5. Medical Disclaimer</strong><br/>
            SnootShake is <strong>not a veterinarian, veterinary office, or any licensed healthcare provider</strong>. The information provided on this site, including guides, tips, articles, and tracking tools, is based on the <strong>personal experience of the creators</strong>, as well as <strong>cited research and publicly available resources</strong>.<br/>
            This information is provided for <strong>educational and informational purposes only</strong> and is <strong>not a substitute for professional veterinary advice, diagnosis, or treatment</strong>.<br/>
            You should <strong>always consult your veterinarian</strong> or other qualified animal health professional regarding any questions, concerns, or medical issues related to your dog’s health. SnootShake <strong>does not assume any liability</strong> for decisions made based on the information provided on this site.<br/><br/>

            <strong>6. Privacy</strong><br/>
            We take your privacy seriously. Please review our Privacy Policy to understand how we collect, use, and protect your information.<br/><br/>

            <strong>7. Intellectual Property</strong><br/>
            - All content, logos, trademarks, and software on SnootShake are the property of SnootShake or its licensors.<br/>
            - You may not copy, modify, distribute, or create derivative works from our content without permission.<br/><br/>

            <strong>8. Limitation of Liability</strong><br/>
            - SnootShake provides the service “as is” and makes no guarantees regarding accuracy, reliability, or availability.<br/>
            - We are not responsible for any direct, indirect, incidental, or consequential damages arising from your use of the service.<br/><br/>

            <strong>9. Termination</strong><br/>
            We may suspend or terminate your account if you violate these Terms. You may also terminate your account at any time.<br/><br/>

            <strong>10. Modifications to Terms</strong><br/>
            SnootShake may update these Terms at any time. Changes will be effective immediately upon posting. Continued use of the service constitutes acceptance of the updated Terms.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms} sx={{ fontFamily: "'Poppins', sans-serif" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUpPage;
