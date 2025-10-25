import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const quotes = [
  "Dogs do speak, but only to those who know how to listen. 🐾",
  "Every seizure logged is a step toward understanding. 🐶",
  "Patience and love are the best medicine. 💛", // yellow heart
];

const QuoteRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const visibleTime = 5000; // quote fully visible for 5 seconds
    const fadeTime = 2000;    // fade duration 2 seconds

    const interval = setInterval(() => {
      setFade(false); // start fading out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setFade(true); // fade in new quote
      }, fadeTime);
    }, visibleTime + fadeTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "85%",
        maxWidth: "1200px",
        height: "250px",
        margin: "32px auto",
        padding: 4,
        borderRadius: 4,
        background: "linear-gradient(to right, rgba(255,35,59,0.45), rgba(255,230,11,0.45))",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "2rem",
          color: "#EEF2F5",
          opacity: fade ? 1 : 0,
          transition: `opacity 2s ease-in-out`,
        }}
        dangerouslySetInnerHTML={{ __html: quotes[currentIndex] }}
      />
    </Box>
  );
};

export default QuoteRotator;







