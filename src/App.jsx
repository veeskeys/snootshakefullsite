import React, { useState } from "react";
import Layout from "./components/Layout.jsx";
import Dashboard from "./sections/Dashboard.jsx";
import Medications from "./sections/Medications.jsx";
import SeizureLogging from "./sections/SeizureLogging.jsx";
import OurStory from "./sections/OurStory.jsx";
import ProfilePage from "./pages/Auth/ProfilePage.jsx"; // Placeholder profile page
import Labs from "./sections/Labs.jsx"; // <-- Make sure this is imported

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [profileView, setProfileView] = useState(false);

  const [medications, setMedications] = useState([]);
  const [seizures, setSeizures] = useState([]);

  const tabs = ["Dashboard", "Medications", "Seizure Logs", "Labs", "About Us"]; // <-- added Labs here

  const handleNavigate = (option) => {
    if (option === "profile") {
      setProfileView(true);
    } else if (option === "signout") {
      console.log("Sign out clicked");
      setProfileView(false);
      setActiveTab("Dashboard");
    }
  };

  const renderContent = () => {
    if (profileView) return <ProfilePage />;

    switch (activeTab) {
      case "Dashboard":
        return <Dashboard medications={medications} seizures={seizures} />;
      case "Medications":
        return <Medications medications={medications} setMedications={setMedications} />;
      case "Seizure Logs":
        return <SeizureLogging seizures={seizures} setSeizures={setSeizures} />;
      case "Labs": // <-- added this case
        return <Labs />;
      case "About Us":
        return <OurStory />;
      default:
        return <Dashboard medications={medications} seizures={seizures} />;
    }
  };

  return (
    <Layout
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        setProfileView(false); // leaving profile view when switching tabs
      }}
      onNavigate={handleNavigate}
      profileView={profileView}
    >
      {renderContent()}
    </Layout>
  );
}

