import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const medicationOptions = [
  "Phenobarbital",
  "Keppra",
  "Potassium Bromide",
  "Other",
];
const dosageUnits = ["mg", "ml", "tablets"];
const frequencyUnits = ["day", "week", "month"];

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [medicationHistory, setMedicationHistory] = useState([]);
  const [form, setForm] = useState({
    name: "",
    otherName: "",
    dosage: "",
    unit: "",
    quantity: "",
    quantityUnit: "ml",
    frequencyNumber: "",
    frequencyUnit: "day",
    times: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Reminder modal state
  const [reminderOpen, setReminderOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [reminderCount, setReminderCount] = useState(0);
  const [scheduledTimeouts, setScheduledTimeouts] = useState([]);

  // ===== Form Handlers =====
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...form.times];
    updatedTimes[index] = value;
    setForm({ ...form, times: updatedTimes });
  };

  const handleAddClick = () => {
    setForm({
      name: "",
      otherName: "",
      dosage: "",
      unit: "",
      quantity: "",
      quantityUnit: "ml",
      frequencyNumber: "",
      frequencyUnit: "day",
      times: [],
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm({
      name: "",
      otherName: "",
      dosage: "",
      unit: "",
      quantity: "",
      quantityUnit: "ml",
      frequencyNumber: "",
      frequencyUnit: "day",
      times: [],
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setForm(medications[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const medName = form.name === "Other" ? form.otherName : form.name;
    if (!medName || !form.dosage || !form.unit || !form.frequencyNumber) return;

    const saveData = { ...form, name: medName };

    if (editIndex !== null) {
      const updated = [...medications];
      updated[editIndex] = saveData;
      setMedications(updated);
    } else {
      setMedications([...medications, saveData]);
    }

    setForm({
      name: "",
      otherName: "",
      dosage: "",
      unit: "",
      quantity: "",
      quantityUnit: "ml",
      frequencyNumber: "",
      frequencyUnit: "day",
      times: [],
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const renderTimePickers = () => {
    const count = parseInt(form.frequencyNumber) || 0;
    return Array.from({ length: count }).map((_, i) => (
      <TextField
        key={i}
        type="time"
        label={`Time ${i + 1}`}
        value={form.times[i] || ""}
        onChange={(e) => handleTimeChange(i, e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
    ));
  };

  // ===== PDF Download Function =====
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SnootShake Medications Report", 14, 20);

    // Current Medications
    if (!medications || medications.length === 0) {
      doc.setFontSize(12);
      doc.text("No medications saved yet.", 14, 30);
    } else {
      const tableBody = medications.map((med, idx) => [
        idx + 1,
        med.name,
        med.dosage,
        med.unit,
        med.quantity,
        med.quantityUnit,
        med.frequencyNumber,
        med.frequencyUnit,
        med.times.join(", "),
      ]);

      doc.autoTable({
        head: [
          ["#", "Name", "Dosage", "Unit", "Quantity", "Qty Unit", "Freq", "Freq Unit", "Times"],
        ],
        body: tableBody,
        startY: 35,
        styles: { fontSize: 10 },
      });
    }

    // Medication History
    if (medicationHistory.length === 0) {
      doc.setFontSize(12);
      doc.text(
        "No medication history yet.",
        14,
        doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50
      );
    } else {
      const historyBody = medicationHistory.map((log, idx) => [
        idx + 1,
        log.medName,
        log.status,
        log.timeGiven,
      ]);

      doc.autoTable({
        head: [["#", "Medication", "Status", "Time Recorded"]],
        body: historyBody,
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50,
        styles: { fontSize: 10 },
      });
    }

    doc.save("Medications_Report.pdf");
  };

  // ===== Reminder Scheduling =====
  useEffect(() => {
    scheduledTimeouts.forEach((t) => clearTimeout(t));
    setScheduledTimeouts([]);

    const newTimeouts = [];

    medications.forEach((med) => {
      med.times.forEach((timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        if (scheduledTime > now) {
          const timeout = setTimeout(() => {
            setCurrentReminder({ med, scheduledTime });
            setReminderCount(0);
            setReminderOpen(true);
          }, scheduledTime - now);
          newTimeouts.push(timeout);
        }
      });
    });

    setScheduledTimeouts(newTimeouts);

    return () => newTimeouts.forEach((t) => clearTimeout(t));
  }, [medications]);

  const handleReminderAction = (action, med = null) => {
    let logMed = med || currentReminder?.med;
    if (!logMed) return;

    let status = action === "given" ? "Given" : action === "missed" ? "Missed" : null;

    const logEntry = {
      medName: logMed.name,
      status,
      timeGiven:
        action === "given" || action === "missed"
          ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : null,
      scheduledTime: currentReminder?.scheduledTime,
    };

    if (logEntry.timeGiven) setMedicationHistory((prev) => [logEntry, ...prev]);

    if (action === "given" || action === "missed") {
      if (!med) {
        setReminderOpen(false);
        setCurrentReminder(null);
      }
      // Subtract quantity logic
      if (logMed.unit === "ml" || logMed.unit === "tablets") {
        const updated = medications.map((m) => {
          if (m.name === logMed.name) {
            const newQty = parseFloat(m.quantity) - parseFloat(m.dosage);
            return { ...m, quantity: newQty > 0 ? newQty : 0 };
          }
          return m;
        });
        setMedications(updated);
      }
    } else if (action === "snooze") {
      setReminderCount(reminderCount + 1);
      setReminderOpen(false);
      setTimeout(() => setReminderOpen(true), 10 * 60 * 1000); // 10 mins
    }
  };

  return (
    <Box sx={{position: "relative", width: "100%" }}> {/* Debugging border */}
      {/* + Add button at top right */}
      <Box sx={{ position: "absolute", top: 0, right: 0}}>
        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{ minWidth: "120px", height: "32px", textTransform: "none" }}
        >
          + Add
        </Button>
      </Box>

      <Box sx={{ width: "100%", paddingTop: "40px", boxSizing: "border-box" }}>
        {/* No medications message */}
        {medications.length === 0 && (
          <Typography
            variant="body1"
            sx={{ mt: 3, textAlign: "center", color: "#666" }}
          >
            There are currently no saved medications.
          </Typography>
        )}

        {/* Medication Form */}
        {showForm && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
              p: 2,
              border: "1px solid red", // Debug
              borderRadius: 1,
              width: "400px",
              margin: "0 auto",
            }}
          >
            <FormControl size="small">
              <InputLabel>Medication</InputLabel>
              <Select
                name="name"
                value={form.name}
                onChange={handleChange}
                label="Medication"
              >
                {medicationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {form.name === "Other" && (
              <TextField
                label="Medication Name"
                name="otherName"
                value={form.otherName}
                onChange={handleChange}
                size="small"
              />
            )}

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Dosage"
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                size="small"
              />
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  label="Unit"
                >
                  {dosageUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                size="small"
              />
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <InputLabel>Qty Unit</InputLabel>
                <Select
                  name="quantityUnit"
                  value={form.quantityUnit}
                  onChange={handleChange}
                  label="Qty Unit"
                >
                  <MenuItem value="ml">ml</MenuItem>
                  <MenuItem value="tablets">tablets</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                label="Frequency"
                name="frequencyNumber"
                type="number"
                inputProps={{ min: 1, max: 10 }}
                value={form.frequencyNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    frequencyNumber: value,
                    times: Array(Math.max(value, 0))
                      .fill("")
                      .slice(0, value),
                  }));
                }}
                size="small"
              />
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="frequencyUnit"
                  value={form.frequencyUnit}
                  onChange={handleChange}
                  label="Unit"
                >
                  {frequencyUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {renderTimePickers()}
            </Box>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        )}

        {/* Current Medications */}
        {medications.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              padding: 2,
              width: "90%",
              boxSizing: "border-box",
              margin: "0 auto",
              backgroundColor: "#C8D6F0",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Current Medications</Typography>
            {medications.map((med, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  width: "85%",
                  boxSizing: "border-box",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    textAlign="left"
                  >
                    {med.name}
                  </Typography>
                  <Typography variant="body2" textAlign="left">
                    Dosage: {med.dosage} {med.unit} | Quantity: {med.quantity} {med.quantityUnit} | Frequency:{" "}
                    {med.frequencyNumber} {med.frequencyUnit} | Times:{" "}
                    {med.times.join(", ")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
                  {/* Given/Missed buttons */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleReminderAction("given", med)}
                    >
                      Given
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReminderAction("missed", med)}
                    >
                      Missed
                    </Button>
                  </Box>

                  {/* Edit/Delete */}
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Typography>
                    <Typography>|</Typography>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "error.main",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Medication History */}
        {medications.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: 1,
              width: "90%",
              boxSizing: "border-box",
              margin: "0 auto",
              mt: 2,
              mb: 2,
              borderRadius: 2, 
              backgroundColor: "#C8D6F0"
            }}
          >
            <Typography variant="h6">Medication History</Typography>
            {medicationHistory.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#666" }}>
                No medication history yet.
              </Typography>
            ) : (
              medicationHistory.map((log, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  
                    borderRadius: 2,
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    width: "85%",
                    mb: 1,
                  }}
                >
                  <Typography fontWeight="bold">{log.medName}</Typography>
                  <Typography>
                    {log.status} at {log.timeGiven}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Download PDF button container at bottom right */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={generatePDF}
            sx={{ minWidth: "140px", height: "36px", textTransform: "none"}}
          >
            Download PDF
          </Button>
        </Box>
      </Box>

      {/* Reminder Modal */}
      <Modal open={reminderOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid red", // Debug
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">
            Time to give {currentReminder?.med.name}!
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            {reminderCount < 6 ? (
              <Button
                variant="outlined"
                onClick={() => handleReminderAction("snooze")}
              >
                Remind me in 10 mins
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handleReminderAction("missed")}
              >
                Missed Dose
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => handleReminderAction("given")}
            >
              Meds Given
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Medications;










