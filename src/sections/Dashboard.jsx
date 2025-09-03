import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Recent Seizures</h2>
        <p className="text-gray-600 text-sm">
          View the most recent seizure events and durations.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Medication Summary</h2>
        <p className="text-gray-600 text-sm">
          See upcoming doses and current medications.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Health Insights</h2>
        <p className="text-gray-600 text-sm">
          Quick stats on seizure frequency and patterns.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Tips & Advice</h2>
        <p className="text-gray-600 text-sm">
          Safety tips and reminders for managing canine epilepsy.
        </p>
      </div>
    </div>
  );
}


