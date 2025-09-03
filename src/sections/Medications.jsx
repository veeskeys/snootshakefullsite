import React, { useState } from "react";

export default function Medications() {
  const [medications, setMedications] = useState([
    { name: "Phenobarbital", dose: "30 mg", frequency: "12h" },
    { name: "Potassium Bromide", dose: "100 mg", frequency: "24h" },
  ]);

  return (
    <div className="space-y-4">
      {medications.map((med, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-semibold text-gray-800">{med.name}</div>
            <div className="text-sm text-gray-600">
              {med.dose} • {med.frequency}
            </div>
          </div>
          <button className="text-red-500 font-semibold hover:underline text-sm">
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}


