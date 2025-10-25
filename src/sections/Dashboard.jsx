import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Brand colors
const brandColors = ["#3a379a", "#ff233b", "#ffe60b", "#00bff4"];

// Animated counter for Milestones
const AnimatedDays = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second animation
    const stepTime = Math.max(Math.floor(duration / count), 20);
    const timer = setInterval(() => {
      start += 1;
      setDisplayCount(start);
      if (start >= count) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <Typography
      variant="h4"
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "bold",
        color: "#1B1F3B",
      }}
    >
      {displayCount}
    </Typography>
  );
};

const Dashboard = ({ medications, seizures }) => {
  const seizureData = seizures.length
    ? seizures
    : [
        { date: "09/08", duration: 30 },
        { date: "09/09", duration: 70 },
        { date: "09/10", duration: 45 },
        { date: "09/11", duration: 50 },
        { date: "09/12", duration: 60 },
      ];

  const medicationData = medications.length
    ? medications.map((med) => ({
        name: med.name,
        remaining: Number(med.remaining) || 0,
        dailyDose: Number(med.timesPerDay) || 0,
      }))
    : [
        { name: "Phenobarbital", remaining: 10, dailyDose: 2 },
        { name: "Levetiracetam", remaining: 45, dailyDose: 3 },
        { name: "Diazepam", remaining: 2, dailyDose: 1 },
      ];

  const getDaysLeft = (med) =>
    med.dailyDose > 0 ? Math.floor(med.remaining / med.dailyDose) : 0;

  const cardStyle = {
    width: "100%",
    height: 340,
    borderRadius: 9,
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  };

  const recentLabs = [
    { name: "TotalHealth", value: "95", status: "Normal" },
    { name: "Potassium Bromide", value: "120", status: "High" },
    { name: "Phenobarbital", value: "70", status: "Low" },
    { name: "Levetiracetam", value: "85", status: "Normal" },
  ];

  const latestLabDate = "10/11/2025";

  const getStatusColor = (status) => {
    if (status === "High") return "#ff4d4d";
    if (status === "Low") return "#ffcc00";
    return "#00bff4";
  };

  const getValueStyle = (status) => ({
    fontWeight: status === "High" ? "bold" : "normal",
    color: status === "High" ? "#ff4d4d" : "#000",
  });

  const lastSeizureDate =
    seizureData.length > 0
      ? new Date(seizureData[seizureData.length - 1].date)
      : null;
  const today = new Date();
  const daysSinceLastSeizure = lastSeizureDate
    ? Math.floor((today - lastSeizureDate) / (1000 * 60 * 60 * 24))
    : null;

  const displayDays = Math.min(daysSinceLastSeizure || 0, 30);

  return (
    <Box
      sx={{
        width: "100%",
        padding: 5,
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Inner container */}
      <Box sx={{ width: "100%", maxWidth: 1200, position: "relative" }}>
        {/* Background Frame */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#C8D6F0",
            borderRadius: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            zIndex: 0,
          }}
        />

        {/* Foreground content */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Top Row */}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(500px, 1fr))",
              gap: "48px 24px", // vertical 48px, horizontal 24px
              justifyContent: "center",
              alignItems: "start",
              marginBottom: "48px",
            }}
          >
            {/* Seizures Chart */}
            <Paper elevation={4} style={cardStyle}>
              <Typography variant="h6" gutterBottom>
                Recent Seizures
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={seizureData}
                    margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#555" }}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      label={{
                        value: "Duration (sec)",
                        angle: -90,
                        position: "insideLeft",
                        dx: -10,
                        style: { textAnchor: "middle", fill: "#555", fontSize: 12 },
                      }}
                      tick={{ fontSize: 12, fill: "#555" }}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        borderColor: "#ddd",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="duration"
                      stroke="url(#colorLine)"
                      strokeWidth={3}
                      dot={{ fill: "#3a379a", stroke: "#fff", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* Medication Summary */}
            <Paper elevation={4} style={cardStyle}>
              <Typography variant="h6" gutterBottom>
                Medication Summary
              </Typography>
              <Box sx={{ display: "flex", height: "100%", gap: 2 }}>
                {/* Pie Chart */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ResponsiveContainer width="90%" height="90%">
                    <PieChart>
                      <Pie
                        data={medicationData}
                        dataKey="remaining"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        label={false}
                      >
                        {medicationData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={brandColors[index % brandColors.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Medication List */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <List dense>
                    {medicationData.map((med, index) => {
                      const daysLeft = getDaysLeft(med);
                      let statusIcon = "✅";
                      let statusText = "Safe";
                      if (daysLeft < 7) {
                        statusIcon = "⚠️";
                        statusText = "Refill soon";
                      } else if (daysLeft < 14) {
                        statusIcon = "🟠";
                        statusText = "Running low";
                      }

                      const color = brandColors[index % brandColors.length];

                      return (
                        <ListItem
                          key={index}
                          sx={{
                            pl: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: color,
                              mr: 1.5,
                            }}
                          />
                          <ListItemText
                            primary={`${med.name}: ${med.remaining} doses left`}
                            secondary={
                              <span style={{ color: "#333" }}>
                                {statusIcon} {daysLeft} days left — {statusText}
                              </span>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Bottom Row */}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(500px, 1fr))",
              gap: "48px 24px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            {/* Milestones Card */}
            <Paper elevation={4} style={cardStyle}>
              <Typography variant="h6" gutterBottom>
                Milestones
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <AnimatedDays count={displayDays} />
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontFamily: "'Poppins', sans-serif" }}
                >
                  Days since last seizure 🎉
                </Typography>
              </Box>
            </Paper>

            {/* Labs Summary Card */}
            <Paper elevation={4} style={cardStyle}>
              <Typography variant="h6" gutterBottom>
                Labs Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Latest Labs: {latestLabDate}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1.5,
                  maxHeight: 270,
                }}
              >
                {recentLabs.map((lab, index) => (
                  <Paper
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      padding: 1,
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: getStatusColor(lab.status),
                      }}
                    />
                    <Typography variant="body2" sx={getValueStyle(lab.status)}>
                      {lab.name}: {lab.value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;








