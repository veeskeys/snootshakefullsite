import React, { useState } from "react";

export default function SeizureLogging() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState("");

  const addLog = () => {
    if (newLog.trim() === "") return;
    setLogs([{ time: new Date().toLocaleString(), note: newLog }, ...logs]);
    setNewLog("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2"
          placeholder="Add seizure note"
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
        />
        <button
          onClick={addLog}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl p-3 flex justify-between items-center"
          >
            <div>
              <div className="text-gray-700 text-sm">{log.note}</div>
              <div className="text-gray-400 text-xs">{log.time}</div>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gray-500 text-sm">No seizure logs yet.</div>
        )}
      </div>
    </div>
  );
}


