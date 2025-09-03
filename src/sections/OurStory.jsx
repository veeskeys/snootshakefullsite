import React from "react";

export default function OurStory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">About SnootShake</h2>
        <p className="text-gray-600 text-sm">
          SnootShake was created to help dog owners track and manage canine epilepsy
          efficiently. Our mission is to provide a user-friendly platform for monitoring
          seizures, medications, and overall health.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h2>
        <p className="text-gray-600 text-sm">
          We envision a world where every dog with epilepsy receives the attention and care
          they need, helping owners make informed decisions about their pets' health.
        </p>
      </div>
    </div>
  );
}


