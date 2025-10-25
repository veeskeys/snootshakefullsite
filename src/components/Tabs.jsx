import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme, active }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: active ? 600 : 400,            // Semi-bold active, regular inactive
  color: active ? "#1B1F3B": "#4B4F6B",     // Active = brand cyan, inactive = brand purple
  textTransform: "none",
  margin: "0 9px",
  position: "relative",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#00bff4",                         
    backgroundColor: "transparent",
  },
  "&::after": active
    ? {
        content: '""',
        position: "absolute",
        bottom: -3,                           // slightly below the text
        left: 0,
        width: "100%",
        height: "3px",
        background: "#FFE60B", 
        borderRadius: "2px",
      }
    : {},
}));

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {tabs.map((tab) => (
        <StyledButton
          key={tab}
          active={activeTab === tab ? 1 : 0}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </StyledButton>
      ))}
    </Box>
  );
};

export default Tabs;
