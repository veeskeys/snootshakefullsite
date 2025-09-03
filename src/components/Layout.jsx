import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-gray-800">SnootShake</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}


