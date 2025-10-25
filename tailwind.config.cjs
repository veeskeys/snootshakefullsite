/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",       // Main brand red
        primaryDark: "#D62839",
        secondary: "#F4A261",     // Warning / accent
        secondaryDark: "#E07B3F",
        success: "#2A9D8F",       // Save / positive
        successDark: "#21867A",
        darkText: "#264653",      // Dark gray for text
        lightBg: "#FFF8F0",       // Soft cream background
        timerBg: "#F1FAEE",       // Timer card background
        timerBorder: "#A8DADC"    // Timer border color
      },
    },
  },
  plugins: [],
};
