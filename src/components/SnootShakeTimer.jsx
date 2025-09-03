import React, { useState, useEffect, useRef } from "react";
import { Play, Square, AlertTriangle, Phone } from "lucide-react";

const SnootShakeTimer = () => {
  const [ictalTime, setIctalTime] = useState(0);
  const [ictalRunning, setIctalRunning] = useState(false);
  const [phase, setPhase] = useState("ready"); // ready, ictal, complete
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [emergencyDismissed, setEmergencyDismissed] = useState(false);

  const ictalInterval = useRef(null);

  useEffect(() => {
    if (ictalRunning) {
      ictalInterval.current = setInterval(() => {
        setIctalTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= 3000 && !emergencyDismissed) {
            setEmergencyAlert(true);
            if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 500]);
          }
          return newTime;
        });
      }, 100);
    } else clearInterval(ictalInterval.current);

    return () => clearInterval(ictalInterval.current);
  }, [ictalRunning, emergencyDismissed]);

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
    setIctalRunning(true);
    setPhase("ictal");
  };

  const stopIctal = () => {
    setIctalRunning(false);
    setPhase("complete");
  };

  const resetTimer = () => {
    setIctalTime(0);
    setIctalRunning(false);
    setPhase("ready");
    setEmergencyAlert(false);
    setEmergencyDismissed(false);
    clearInterval(ictalInterval.current);
  };

  const saveSeizureData = () => {
    const wasEmergency = ictalTime >= 3000;
    alert(
      `Seizure recorded!${wasEmergency ? " ⚠️ EMERGENCY SEIZURE" : ""}\nIctal: ${formatTime(
        ictalTime
      )}`
    );
    resetTimer();
  };

  const dismissEmergencyAlert = () => {
    setEmergencyAlert(false);
    setEmergencyDismissed(true);
  };

  const callEmergencyVet = () => {
    if (window.confirm("This will call your emergency vet. Continue?")) {
      window.open("tel:+1234567890", "_self");
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2 animate-pulse"
        >
          <span className="font-mono">{formatTime(ictalTime)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-4 relative">
      {/* Emergency Modal */}
      {emergencyAlert && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-2xl animate-pulse">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-red-600 mb-2">
              EMERGENCY ALERT
            </h2>
            <p className="text-lg font-semibold text-gray-800 mb-2">5+ Minute Seizure</p>
            <p className="text-sm text-gray-700 mb-6">
              This is life-threatening. Get emergency veterinary care immediately.
            </p>

            <div className="space-y-3">
              <button
                onClick={callEmergencyVet}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-6 h-6" />
                CALL EMERGENCY VET
              </button>

              <button
                onClick={dismissEmergencyAlert}
                className="w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50"
              >
                I'm handling this - Dismiss
              </button>
            </div>

            <div className="text-xs text-gray-500 mt-4">
              Timer continues running in background
            </div>
          </div>
        </div>
      )}

      {/* Ictal Timer Display */}
      <div className="text-center mb-4">
        <div
          className={`text-4xl font-mono font-bold mb-1 ${
            ictalTime >= 3000 ? "text-red-600 animate-pulse" : "text-gray-800"
          }`}
        >
          {formatTime(ictalTime)}
        </div>
        <div className="text-sm text-gray-600">minutes:seconds.tenths</div>
        {ictalTime >= 2400 && ictalTime < 3000 && (
          <div className="text-orange-600 font-semibold text-sm mt-1 animate-pulse">
            ⚠️ Approaching 5 minutes
          </div>
        )}
        {ictalTime >= 3000 && (
          <div className="text-red-600 font-bold text-sm mt-1 animate-pulse">
            🚨 EMERGENCY - Over 5 minutes
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {phase === "ready" && (
          <button
            onClick={startIctal}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        )}

        {phase === "ictal" && (
          <button
            onClick={stopIctal}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center gap-2"
          >
            <Square className="w-5 h-5" />
            Stop
          </button>
        )}

        {phase === "complete" && (
          <button
            onClick={saveSeizureData}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
          >
            Save
          </button>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(true)}
        className="absolute top-2 right-2 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200"
      >
        Collapse
      </button>
    </div>
  );
};

export default SnootShakeTimer;


