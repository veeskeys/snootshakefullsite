import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Link,
} from "@mui/material";

const placeholderDogPhoto = "https://via.placeholder.com/150";

const ProfilePage = () => {
  const [showDogForm, setShowDogForm] = useState(false);
  const [editOwner, setEditOwner] = useState(false);
  const [editVet, setEditVet] = useState(false);

  // Dog info
  const [dogName, setDogName] = useState("Buddy");
  const [dogAge, setDogAge] = useState("5");
  const [dogBreed, setDogBreed] = useState("Golden Retriever");
  const [epilepsyType, setEpilepsyType] = useState("Idiopathic");
  const [diagnosisYear, setDiagnosisYear] = useState("2020");
  const [dogPhoto, setDogPhoto] = useState(placeholderDogPhoto);

  // Owner info
  const [ownerName, setOwnerName] = useState("Harper");
  const [ownerEmail, setOwnerEmail] = useState("harper@example.com");
  const [ownerPhone, setOwnerPhone] = useState("555-123-4567");

  // Vet info
  const [vetClinic, setVetClinic] = useState("Happy Paws Veterinary");
  const [vetName, setVetName] = useState("Dr. Smith");
  const [vetPhone, setVetPhone] = useState("555-987-6543");
  const [vetEmail, setVetEmail] = useState("vet@example.com");

  const [newDogPhoto, setNewDogPhoto] = useState(null);

  const handleDogPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewDogPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = () => {
    setShowDogForm(false);
    setEditOwner(false);
    setEditVet(false);
    setNewDogPhoto(null);
  };

  // Handle dog profile delete (reset values + confirmation)
  const handleDeleteDog = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this canine profile? This action cannot be undone."
    );
    if (confirmDelete) {
      setDogName("");
      setDogAge("");
      setDogBreed("");
      setEpilepsyType("");
      setDiagnosisYear("");
      setDogPhoto(placeholderDogPhoto);
    }
  };

  // Handle vet info delete (reset values + confirmation)
  const handleDeleteVet = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this veterinarian’s information? This action cannot be undone."
    );
    if (confirmDelete) {
      setVetClinic("");
      setVetName("");
      setVetPhone("");
      setVetEmail("");
    }
  };

  return (
    <Box sx={{ width: "100%", fontFamily: "Poppins, sans-serif", py: 4 }}>
      {/* Top Card: Dog Profile */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          p: 4,
          borderRadius: 1,
          mb: 4,
          position: "relative",
        }}
      >
        {!showDogForm ? (
          <>
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <Link sx={{ cursor: "pointer" }} onClick={() => setShowDogForm(true)}>
                Edit
              </Link>
              <Link
                sx={{ cursor: "pointer", color: "error.main" }}
                onClick={handleDeleteDog}
              >
                Delete
              </Link>
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
            >
              Canine Profile
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minWidth: 250,
                }}
              >
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Name:</strong> {dogName}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Age:</strong> {dogAge}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Breed:</strong> {dogBreed}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Epilepsy Type:</strong> {epilepsyType}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Diagnosis Year:</strong> {diagnosisYear}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", p: 2, mr: 15, mt: -7 }}>
                <Avatar
                  src={dogPhoto}
                  alt="Dog Profile"
                  sx={{ width: 175, height: 175 }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                  {dogName}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          // Dog edit form
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Box
              sx={{
                flex: 1,
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder="Name"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
              />
              <TextField
                fullWidth
                type="number"
                placeholder="Age"
                value={dogAge}
                onChange={(e) => setDogAge(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Breed"
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Epilepsy Type"
                value={epilepsyType}
                onChange={(e) => setEpilepsyType(e.target.value)}
              />
              <TextField
                fullWidth
                type="number"
                placeholder="Diagnosis Year"
                value={diagnosisYear}
                onChange={(e) => setDiagnosisYear(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                p: 1,
              }}
            >
              <Avatar
                src={newDogPhoto || placeholderDogPhoto}
                alt="New Dog Profile"
                sx={{ width: 150, height: 150 }}
              />
              <Button variant="outlined" component="label">
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleDogPhotoChange}
                />
              </Button>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleCancel}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Bottom Row: Owner + Vet */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 5,
          maxWidth: 900,
          width: "100%",
          ml: 5,
        }}
      >
        {/* Owner Info */}
        <Paper elevation={3} sx={{ p: 3.5, borderRadius: 1, position: "relative" }}>
          {!editOwner ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
                  Owner Information
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Name:</strong> {ownerName}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Email:</strong> {ownerEmail}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Phone:</strong> {ownerPhone}
                </Typography>
              </Box>
              <Link
                sx={{ cursor: "pointer", alignSelf: "start" }}
                onClick={() => setEditOwner(true)}
              >
                Edit
              </Link>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Edit Owner Information
              </Typography>
              <TextField
                fullWidth
                placeholder="Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Phone"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
              />
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCancel}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Vet Info */}
        <Paper elevation={3} sx={{ p: 3.5, borderRadius: 1, position: "relative" }}>
          {!editVet ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
                  Vet Information
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Clinic:</strong> {vetClinic}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Vet Name:</strong> {vetName}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Phone:</strong> {vetPhone}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <strong>Email:</strong> {vetEmail}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignSelf: "start" }}>
                <Link sx={{ cursor: "pointer" }} onClick={() => setEditVet(true)}>
                  Edit
                </Link>
                <Link
                  sx={{ cursor: "pointer", color: "error.main" }}
                  onClick={handleDeleteVet}
                >
                  Delete
                </Link>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Edit Vet Information
              </Typography>
              <TextField
                fullWidth
                placeholder="Clinic Name"
                value={vetClinic}
                onChange={(e) => setVetClinic(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Vet Name"
                value={vetName}
                onChange={(e) => setVetName(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Phone"
                value={vetPhone}
                onChange={(e) => setVetPhone(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Email"
                value={vetEmail}
                onChange={(e) => setVetEmail(e.target.value)}
              />
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCancel}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;


