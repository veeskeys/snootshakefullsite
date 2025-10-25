// sections/Labs.jsx
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
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const statusOptions = ["High", "Low", "Normal"];

const Labs = () => {
  const [labs, setLabs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    value: "",
    status: "Normal",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setFormData({
      name: "",
      date: new Date().toISOString().split("T")[0],
      value: "",
      status: "Normal",
    });
    setEditIndex(null);
    setOpen(false);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...labs];
      updated[editIndex] = formData;
      setLabs(updated);
    } else {
      setLabs([...labs, formData]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData(labs[index]);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = (index) => {
    const updated = [...labs];
    updated.splice(index, 1);
    setLabs(updated);
  };

  // Separate current labs (<1 year old) and history labs (>=1 year)
  const now = new Date();
  const currentLabs = labs.filter((lab) => {
    const labDate = new Date(lab.date);
    const oneYearLater = new Date(labDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return now < oneYearLater;
  });

  const historyLabs = labs.filter((lab) => {
    const labDate = new Date(lab.date);
    const oneYearLater = new Date(labDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return now >= oneYearLater;
  });

  const renderTable = (data) => (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <Paper sx={{ width: "100%", maxWidth: "95%", overflowX: "auto" }}>
        <Table size="small" sx={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>Lab Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>Value</TableCell>
              <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((lab, index) => {
              const fullIndex = labs.findIndex((l) => l === lab);
              return (
                <TableRow key={fullIndex} sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}>
                  <TableCell sx={{ border: "1px solid #ddd" }}>{lab.name}</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>{lab.date}</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>{lab.value}</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>{lab.status}</TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", whiteSpace: "nowrap" }}>
                    <Typography
                      component="span"
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        "&:hover": { textDecoration: "underline" },
                        mr: 1,
                      }}
                      onClick={() => handleEdit(fullIndex)}
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
                      onClick={() => handleDelete(fullIndex)}
                    >
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ width: "95%", padding: 3, position: "relative" }}>
      {/* + Add Lab button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          mr: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{ minWidth: "120px", height: "36px", textTransform: "none" }}
        >
          + Add
        </Button>
      </Box>

      {/* Current Labs */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Current Labs
      </Typography>
      {currentLabs.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          No current labs logged.
        </Typography>
      ) : (
        renderTable(currentLabs)
      )}

      {/* Labs History */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Labs History
      </Typography>
      {historyLabs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Labs older than 1 year will show here.
        </Typography>
      ) : (
        renderTable(historyLabs)
      )}

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editIndex !== null ? "Edit Lab" : "Add New Lab"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Lab Name"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange("date")}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Value"
            value={formData.value}
            onChange={handleChange("value")}
            fullWidth
            margin="dense"
          />
          <TextField
            select
            label="Status"
            value={formData.status}
            onChange={handleChange("status")}
            fullWidth
            margin="dense"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Labs;




