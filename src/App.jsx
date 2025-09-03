import React, { useState } from "react";
import Dashboard from "./sections/Dashboard";
import Medications from "./sections/Medications";
import SeizureLogging from "./sections/SeizureLogging";
import OurStory from "./sections/OurStory";
import SnootShakeTimer from "./components/SnootShakeTimer";
import logo from "./assets/logo.png"; // Use your uploaded logo

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Medications":
        return <Medications />;
      case "Seizure Logging":
        return <SeizureLogging />;
      case "About Us":
        return <OurStory />;
      default:
        return <Dashboard />;
    }
  };

  const tabs = ["Dashboard", "Medications", "Seizure Logging", "About Us"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logo and title */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SnootShake Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800">SnootShake</h1>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center bg-gray-100 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Timer */}
      <SnootShakeTimer />

      {/* Tab content */}
      <main className="p-4">{renderContent()}</main>
    </div>
  );
}





