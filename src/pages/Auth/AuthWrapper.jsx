import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthWrapper = () => {
  const [view, setView] = useState("login");

  return view === "login" ? (
    <LoginPage onNavigate={setView} />
  ) : (
    <SignupPage onNavigate={setView} />
  );
};

export default AuthWrapper;
