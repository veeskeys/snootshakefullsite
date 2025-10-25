import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MAX_DECIS = 3000;

const SnootShakeTimer = ({ onSave }) => {
  const [ictalTime, setIctalTime] = useState(0);
  const [ictalRunning, setIctalRunning] = useState(false);
  const [phase, setPhase] = useState("ready");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [notes, setNotes] = useState("");
  const [severity, setSeverity] = useState("");
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [endTimestamp, setEndTimestamp] = useState(null);

  const ictalInterval = useRef(null);

  useEffect(() => {
    if (ictalRunning) {
      ictalInterval.current = setInterval(() => setIctalTime((prev) => prev + 1), 100);
    } else clearInterval(ictalInterval.current);
    return () => clearInterval(ictalInterval.current);
  }, [ictalRunning]);

  useEffect(() => {
    if (ictalTime === MAX_DECIS && ictalRunning) setShowStatusModal(true);
  }, [ictalTime, ictalRunning]);

  const formatTime = (deciseconds) => {
    const totalSeconds = Math.floor(deciseconds / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ds = deciseconds % 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${ds}`;
  };

  const startIctal = () => {
    setStartTimestamp(new Date());
    setIctalRunning(true);
    setPhase("ictal");
    setIsCollapsed(false);
  };
  const stopIctal = () => {
    setEndTimestamp(new Date());
    setIctalRunning(false);
    setPhase("stop-options");
  };
  const resetTimer = () => {
    setIctalTime(0);
    setIctalRunning(false);
    setPhase("ready");
    setNotes("");
    setSeverity("");
    setStartTimestamp(null);
    setEndTimestamp(null);
    clearInterval(ictalInterval.current);
  };
  const quickSave = () => {
    if (onSave)
      onSave({
        date: new Date().toLocaleDateString(),
        startTime: startTimestamp?.toLocaleTimeString() || "N/A",
        endTime: endTimestamp?.toLocaleTimeString() || "N/A",
        duration: formatTime(ictalTime),
        severity: "",
        notes: "",
      });
    resetTimer();
    setIsCollapsed(true);
  };
  const saveWithDetails = () => {
    if (onSave)
      onSave({
        date: new Date().toLocaleDateString(),
        startTime: startTimestamp?.toLocaleTimeString() || "N/A",
        endTime: endTimestamp?.toLocaleTimeString() || "N/A",
        duration: formatTime(ictalTime),
        severity,
        notes,
      });
    setShowDetailsDialog(false);
    resetTimer();
    setIsCollapsed(true);
  };

  // COLLAPSED VIEW
  if (isCollapsed) {
    return (
      <Paper
        elevation={2}
        sx={{
          width: "85%",
          maxWidth: "1200px",
          margin: "20px auto",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
        }}
      >
        <Typography variant="h6" fontWeight="600" color="#1B1F3B">
          Seizure Timer
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => setIsCollapsed(false)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
    );
  }

  // EXPANDED VIEW
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "85%",
          maxWidth: "1200px",
          margin: "20px auto",
          padding: 3,
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={() => setIsCollapsed(true)}>
            <ExpandLessIcon />
          </IconButton>
        </Box>

        <Typography variant="h4" fontWeight="500" color="#1B1F3B" mb={2}>
          Seizure Timer
        </Typography>

        <Paper
          elevation={0}
          sx={{
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            minHeight: "60px",
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="600"
            color="#1B1F3B"
            sx={{ letterSpacing: "1px", fontFamily: "'Poppins', sans-serif" }}
          >
            {formatTime(ictalTime)}
          </Typography>
        </Paper>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {phase === "ready" && (
            <Button variant="contained" onClick={startIctal}>
              Start
            </Button>
          )}
          {phase === "ictal" && (
            <Button variant="contained" color="error" onClick={stopIctal}>
              Stop
            </Button>
          )}
          {phase === "stop-options" && (
            <>
              <Button variant="contained" onClick={quickSave}>
                Quick Save
              </Button>
              <Button variant="outlined" onClick={() => setShowDetailsDialog(true)}>
                Add Details
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <Dialog open={showStatusModal} onClose={() => setShowStatusModal(false)}>
        <DialogTitle>Seizure Time Exceeded</DialogTitle>
        <DialogContent>
          <Typography>
            The seizure duration has exceeded the maximum threshold. Please take appropriate action.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStatusModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDetailsDialog} onClose={() => setShowDetailsDialog(false)}>
        <DialogTitle>Add Seizure Details</DialogTitle>
        <DialogContent>
          <TextField select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)} fullWidth margin="dense">
            <MenuItem value="Mild">Mild</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Severe">Severe</MenuItem>
          </TextField>
          <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth margin="dense" multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetailsDialog(false)}>Cancel</Button>
          <Button onClick={saveWithDetails} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SnootShakeTimer;







