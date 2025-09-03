import React from "react";

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeTab === tab.name
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}

