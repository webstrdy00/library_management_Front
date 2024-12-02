import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembershipPage from "./pages/membership/MembershipPage";
import PaymentSuccessPage from "./pages/membership/PaymentSuccessPage";
import PaymentFailPage from "./pages/membership/PaymentFailPage";
import LoginPage from "./components/auth/LoginPage";
import OAuthCallback from "./components/auth/OAuthCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/membership/success" element={<PaymentSuccessPage />} />
        <Route path="/membership/fail" element={<PaymentFailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
