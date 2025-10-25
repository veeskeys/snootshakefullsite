import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const seizureTypes = ["Generalized (myoclonic)", "Focal"];
const severityOptions = ["Mild", "Moderate", "Severe"];
const symptomOptions = ["Confused", "Restless", "Fearful", "Aggressive", "Other"];

const SeizureLogging = ({ seizures = [], setSeizures }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    durationUnit: "seconds",
    severity: "",
    notes: "",
    postDuration: "",
    postDurationUnit: "seconds",
    symptoms: [],
    postNotes: "",
    date: new Date().toLocaleString(),
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setFormData({
      type: "",
      duration: "",
      durationUnit: "seconds",
      severity: "",
      notes: "",
      postDuration: "",
      postDurationUnit: "seconds",
      symptoms: [],
      postNotes: "",
      date: new Date().toLocaleString(),
    });
    setTab(0);
    setEditIndex(null);
    setOpen(false);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSymptomToggle = (symptom) => {
    setFormData((prev) => {
      const isChecked = prev.symptoms.includes(symptom);
      const newSymptoms = isChecked
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom];
      return { ...prev, symptoms: newSymptoms };
    });
  };

  const handleSave = () => {
    const seizureEntry = {
      type: formData.type,
      duration: formData.duration,
      durationUnit: formData.durationUnit,
      severity: formData.severity,
      notes: formData.notes,
      post: {
        duration: formData.postDuration,
        durationUnit: formData.postDurationUnit,
        symptoms: formData.symptoms,
        notes: formData.postNotes,
      },
      date: formData.date,
    };

    if (editIndex !== null) {
      const updatedSeizures = [...seizures];
      updatedSeizures[editIndex] = seizureEntry;
      setSeizures(updatedSeizures);
    } else {
      setSeizures([...seizures, seizureEntry]);
    }

    handleClose();
  };

  const handleEdit = (index) => {
    const seizure = seizures[index];
    setFormData({
      type: seizure.type || "",
      duration: seizure.duration || "",
      durationUnit: seizure.durationUnit || "seconds",
      severity: seizure.severity || "",
      notes: seizure.notes || "",
      postDuration: seizure.post?.duration || "",
      postDurationUnit: seizure.post?.durationUnit || "seconds",
      symptoms: seizure.post?.symptoms || [],
      postNotes: seizure.post?.notes || "",
      date: seizure.date || new Date().toLocaleString(),
    });
    setEditIndex(index);
    setTab(0);
    handleOpen();
  };

  const handleDelete = (index) => {
    const updated = seizures.filter((_, i) => i !== index);
    setSeizures(updated);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SnootShake Seizure Report", 14, 20);

    if (!seizures || seizures.length === 0) {
      doc.setFontSize(12);
      doc.text("No seizures logged yet.", 14, 30);
    } else {
      doc.setFontSize(14);
      doc.text("Seizure Logs", 14, 30);

      const tableBody = seizures.map((s, idx) => [
        idx + 1,
        s.type,
        `${s.duration} ${s.durationUnit}`,
        s.severity,
        s.notes || "-",
        s.post?.duration ? `${s.post.duration} ${s.post.durationUnit}` : "-",
        s.post?.symptoms?.join(", ") || "-",
        s.post?.notes || "-",
        s.date,
      ]);

      doc.autoTable({
        head: [
          [
            "#",
            "Type",
            "Duration",
            "Severity",
            "Notes",
            "Post Duration",
            "Symptoms",
            "Post Notes",
            "Date Logged",
          ],
        ],
        body: tableBody,
        startY: 35,
        styles: { fontSize: 10 },
      });
    }

    doc.save("Seizure_Report.pdf");
  };

  return (
    <>
      {/* + Log button */}
      <Box
        sx={{
          position: "absolute",
          top: 130,
          right: 40,
          zIndex: 1400,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            minWidth: "120px",
            height: "32px",
            textTransform: "none",
          }}
        >
          + Log
        </Button>
      </Box>

      {/* Seizure History Table */}
      <Box sx={{ width: "100%", padding: 3 }}>
        {(!seizures || seizures.length === 0) ? (
          <Typography variant="body2" color="text.secondary">
            No seizures logged yet.
          </Typography>
        ) : (
          <Paper sx={{ width: "100%", overflowX: "auto" }}>
            <Table size="small" sx={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4} sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Seizure Log
                  </TableCell>
                  <TableCell align="center" colSpan={3} sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Post-Seizure Log
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Date Logged
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Actions
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Type</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Duration</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Severity</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Notes</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Duration</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Symptoms</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>Notes</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seizures.map((s, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <TableCell sx={{ border: "1px solid #ddd" }}>{s.type}</TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {s.duration} {s.durationUnit}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>{s.severity}</TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>{s.notes || "-"}</TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {s.post?.duration} {s.post?.durationUnit}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {s.post?.symptoms?.join(", ") || "-"}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>{s.post?.notes || "-"}</TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>{s.date}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #ddd",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          cursor: "pointer",
                          color: "primary.main",
                          "&:hover": { textDecoration: "underline" },
                          mr: 1,
                        }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Typography>
                      |
                      <Typography
                        component="span"
                        sx={{
                          cursor: "pointer",
                          color: "error.main",
                          "&:hover": { textDecoration: "underline" },
                          ml: 1,
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>

      {/* PDF Download */}
<Box
  sx={{
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    mt: 4,
    mb: 4,
  }}
>
  <Button
    variant="contained"
    color="secondary"
    onClick={generatePDF}
    sx={{
      minWidth: "140px",
      height: "36px",
      textTransform: "none",
      mr: 3,
    }}
  >
    Download PDF
  </Button>
</Box>


      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editIndex !== null ? "Edit Seizure" : "Log New Seizure"}</DialogTitle>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
          <Tab label="Seizure Log" />
          <Tab label="Post-Seizure Log" />
        </Tabs>
        <DialogContent dividers>
          {tab === 0 && (
            <>
              <TextField
                select
                label="Type"
                value={formData.type}
                onChange={handleChange("type")}
                fullWidth
                margin="dense"
              >
                {seizureTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <TextField
                  label="Duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange("duration")}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  select
                  label="Unit"
                  value={formData.durationUnit}
                  onChange={handleChange("durationUnit")}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem value="seconds">Seconds</MenuItem>
                  <MenuItem value="minutes">Minutes</MenuItem>
                </TextField>
              </Box>

              <TextField
                select
                label="Severity"
                value={formData.severity}
                onChange={handleChange("severity")}
                fullWidth
                margin="dense"
              >
                {severityOptions.map((sev) => (
                  <MenuItem key={sev} value={sev}>{sev}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Notes"
                value={formData.notes}
                onChange={handleChange("notes")}
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
            </>
          )}

          {tab === 1 && (
            <>
              <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                *To save post-seizure log info later, click save and return to edit later.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <TextField
                  label="Post Duration"
                  type="number"
                  value={formData.postDuration}
                  onChange={handleChange("postDuration")}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  select
                  label="Unit"
                  value={formData.postDurationUnit}
                  onChange={handleChange("postDurationUnit")}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem value="seconds">Seconds</MenuItem>
                  <MenuItem value="minutes">Minutes</MenuItem>
                </TextField>
              </Box>

              <FormGroup>
                {symptomOptions.map((symptom) => (
                  <FormControlLabel
                    key={symptom}
                    control={
                      <Checkbox
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomToggle(symptom)}
                      />
                    }
                    label={symptom}
                  />
                ))}
              </FormGroup>

              <TextField
                label="Notes"
                value={formData.postNotes}
                onChange={handleChange("postNotes")}
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          {tab === 0 ? (
            <Button onClick={() => setTab(1)} color="primary" variant="outlined">Next</Button>
          ) : (
            <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SeizureLogging;




