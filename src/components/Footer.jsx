import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "@mui/material/Link";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

// Privacy Policy Modal
const PrivacyModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", color: "#7CC6FE" }}>
      Privacy Policy
    </DialogTitle>
    <DialogContent dividers>
      <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        <strong>Last Updated: 2025</strong>
        <br /><br />
        At SnootShake, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our app or website.
        <br /><br />
        <strong>1. Information We Collect</strong>
        <br />
        We may collect the following types of information:
        <ul>
          <li><strong>Account information:</strong> Name, email address, phone number, and password.</li>
          <li><strong>Dog health information:</strong> Seizure logs, medications, and other tracking details you enter.</li>
          <li><strong>Usage data:</strong> How you interact with the app, including pages visited, features used, and device information.</li>
          <li><strong>Cookies and analytics:</strong> Information from cookies or similar technologies to improve user experience.</li>
        </ul>
        <br />
        <strong>2. How We Use Your Information</strong>
        <br />
        Your information is used for purposes such as:
        <ul>
          <li>Creating and managing your account</li>
          <li>Allowing you to track your dog’s health and seizures</li>
          <li>Improving and personalizing your experience</li>
          <li>Sending important notifications or updates about the app</li>
          <li>Conducting analytics and research to improve our services</li>
        </ul>
        <br />
        <strong>3. How We Share Your Information</strong>
        <br />
        We do <strong>not sell or rent your personal information</strong>. Your personal data, such as your name, email, and contact details, will <strong>never be shared</strong>.
        <br />
        We may share <strong>anonymized information about your dog</strong>, including data such as breed, age, diagnosis, and other non-identifying health information, <strong>solely for research, analytics, and service improvement purposes</strong>. This data is aggregated so that individual users cannot be identified.
        <br />
        Additionally, we may share information:
        <ul>
          <li>With <strong>trusted third-party service providers</strong> who assist in operating the app (e.g., hosting, analytics)</li>
          <li>When <strong>required by law</strong> or to protect our rights</li>
        </ul>
        <br />
        <strong>4. Data Security</strong>
        <br />
        We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        <br /><br />
        <strong>5. Your Rights</strong>
        <br />
        You have the right to:
        <ul>
          <li>Access and review the personal information we hold about you</li>
          <li>Request corrections to your information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Opt out of certain communications</li>
        </ul>
        To exercise these rights, please contact us at <strong>info@snootshake.com</strong>.
        <br /><br />
        <strong>6. Children’s Privacy</strong>
        <br />
        SnootShake is intended for users <strong>18 years or older</strong>. We do not knowingly collect personal information from children under 18.
        <br /><br />
        <strong>7. Updates to This Policy</strong>
        <br />
        We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting, and we encourage you to review the policy regularly.
        <br /><br />
        <strong>8. Contact Us</strong>
        <br />
        If you have questions or concerns about this Privacy Policy, please contact us at <strong>info@snootshake.com</strong>.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} sx={{ color: "#7CC6FE" }}>Close</Button>
    </DialogActions>
  </Dialog>
);

// Terms and Conditions Modal
const TermsModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", color: "#7CC6FE" }}>
      Terms and Conditions
    </DialogTitle>
    <DialogContent dividers>
      <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif" }}>
        <strong>Last Updated: 2025</strong>
        <br /><br />
        Welcome to SnootShake. By using our app or website, you agree to these Terms and Conditions. Please read them carefully.
        <br /><br />
        <strong>1. Use of the App</strong>
        <br />
        The content and services provided by SnootShake are for informational purposes only. SnootShake is not a veterinarian, veterinarian office, or any licensed care provider. All information shown on this site is strictly from personal experience of the creators, cited research and articles, etc. Always consult your veterinarian for any questions, concerns, or issues regarding your dog.
        <br /><br />
        <strong>2. Account Responsibilities</strong>
        <br />
        Users are responsible for maintaining the confidentiality of their account credentials and for all activity under their account.
        <br /><br />
        <strong>3. Content Ownership</strong>
        <br />
        All content provided on SnootShake is the intellectual property of the creators and may not be reproduced without permission.
        <br /><br />
        <strong>4. Liability</strong>
        <br />
        SnootShake is not responsible for any loss, injury, or damages resulting from the use of the app or the information provided. Users assume all risk in using the app.
        <br /><br />
        <strong>5. Modifications</strong>
        <br />
        SnootShake reserves the right to update or modify these Terms and Conditions at any time. Continued use of the app constitutes acceptance of any changes.
        <br /><br />
        <strong>6. Contact Information</strong>
        <br />
        For questions regarding these Terms and Conditions, contact us at <strong>info@snootshake.com</strong>.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} sx={{ color: "#7CC6FE" }}>Close</Button>
    </DialogActions>
  </Dialog>
);

const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleOpenPrivacy = () => setPrivacyOpen(true);
  const handleClosePrivacy = () => setPrivacyOpen(false);
  const handleOpenTerms = () => setTermsOpen(true);
  const handleCloseTerms = () => setTermsOpen(false);

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 16px",
        backgroundColor: "#2C2F4A", 
        boxSizing: "border-box",
        fontFamily: "'Poppins', sans-serif",
        flexWrap: "wrap",
        mb: 0, // ensure no margin at the bottom
      }}
    >
      {/* Left side: copyright and links */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mb: { xs: 2, sm: 0 } }}>
        <Typography variant="body1" sx={{ color: "#fff", mb: 1, fontWeight: "bold" }}>
          &copy; 2025 SnootShake
        </Typography>
        <Box>
          <Link
            component="button"
            onClick={handleOpenTerms}
            underline="hover"
            sx={{
              mr: 2,
              color: "#7CC6FE",
              fontSize: 14,
              fontWeight: "bold",
              "&:hover": { color: "#FFB347" },
            }}
          >
            Terms and Conditions
          </Link>
          <Link
            component="button"
            onClick={handleOpenPrivacy}
            underline="hover"
            sx={{
              color: "#7CC6FE",
              fontSize: 14,
              fontWeight: "bold",
              "&:hover": { color: "#FFB347" },
            }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Box>

      {/* Right side: social icons */}
      <Box>
        <IconButton
          component="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mr: 1 }}
        >
          <FacebookIcon sx={{ color: "#FFE60B" }} />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon sx={{ color: "#FFE60B" }} />
        </IconButton>
      </Box>

      {/* Modals */}
      <PrivacyModal open={privacyOpen} onClose={handleClosePrivacy} />
      <TermsModal open={termsOpen} onClose={handleCloseTerms} />
    </Box>
  );
};

export default Footer;
