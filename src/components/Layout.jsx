import React from "react";
import Tabs from "./Tabs";
import SnootShakeTimer from "./SnootShakeTimer";
import QuoteRotator from "./QuoteRotator";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

const Layout = ({ tabs, activeTab, onTabChange, children, onNavigate, profileView }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) onNavigate(option);
  };

  return (
    <div
      className="layout"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        margin: 0,
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          boxSizing: "border-box",
          fontFamily: "'Poppins', sans-serif",
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: "#fff"
        }}
      >
        {/* LEFT: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "2px", ml: 5 }}>
          <img
            src={logo}
            alt="SnootShake Logo"
            style={{ height: "75px" }}
          />
        </Box>

        {/* CENTER: Tabs */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        </Box>

        {/* RIGHT: Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mr: 5 }}>
          <Avatar
            sx={{ width: 50, height: 50, cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
          <Typography variant="body1" sx={{ color: "#1B1F3B", fontWeight: 500 }}>
            Harper
          </Typography>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose("profile")}>Profile</MenuItem>
            <MenuItem onClick={() => handleClose("signout")}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Timer above dashboard cards */}
      {activeTab === "Dashboard" && !profileView && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
            zIndex: 1,
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <SnootShakeTimer />
        </Box>
      )}

      {/* Dashboard area with framed background box */}
      {activeTab === "Dashboard" && !profileView ? (
        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "24px",
          }}
        >
          {/* Background Frame Box */}
          <Box
            sx={{
              position: "absolute",
              top: "16px",
              width: "85%",
              height: "calc(100% - 32px)",
              backgroundColor: "#C8D6F0",
              borderRadius: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              zIndex: 0,
            }}
          />

          {/* Foreground content (cards only) */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <main style={{ flex: 1 }}>{children}</main>
          </Box>
        </Box>
      ) : (
        <main style={{ flex: 1 }}>{children}</main>
      )}

      {/* Quote Rotator - only show on Dashboard tab */}
      {activeTab === "Dashboard" && !profileView && <QuoteRotator />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

