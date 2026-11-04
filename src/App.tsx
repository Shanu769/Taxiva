/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Breadcrumb from "./components/Breadcrumb";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesOverview from "./pages/ServicesOverview";
import IndividualTax from "./pages/IndividualTax";
import BusinessTax from "./pages/BusinessTax";
import ForeignReporting from "./pages/ForeignReporting";
import IndianTax from "./pages/IndianTax";
import Pricing from "./pages/Pricing";
import TaxTools from "./pages/TaxTools";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import GetStartedForm from "./pages/GetStartedForm";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";

// Helper to scroll to top on route change or navigation
function ScrollToTop() {
  const { pathname, search, key } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, key]);
  return null;
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans text-[#0f172a] selection:bg-[#dbeafe] selection:text-[#0f172a]">
      <ScrollToTop />
      {!isDashboard && <Header />}
      {!isDashboard && <Breadcrumb />}
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/individual" element={<IndividualTax />} />
          <Route path="/individual-tax" element={<IndividualTax />} />
          <Route path="/services/business" element={<BusinessTax />} />
          <Route path="/business-tax" element={<BusinessTax />} />
          <Route path="/services/foreign-reporting" element={<ForeignReporting />} />
          <Route path="/foreign-reporting" element={<ForeignReporting />} />
          <Route path="/fbar" element={<ForeignReporting />} />
          <Route path="/services/indian-tax" element={<IndianTax />} />
          <Route path="/indian-tax" element={<IndianTax />} />
          <Route path="/nri-tax" element={<IndianTax />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tax-tools" element={<TaxTools />} />
          <Route path="/refund-status" element={<TaxTools />} />
          <Route path="/refund" element={<TaxTools />} />
          <Route path="/refunds" element={<TaxTools />} />
          <Route path="/payment-portal" element={<TaxTools />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStartedForm />} />
          <Route path="/get-in-touch" element={<GetStartedForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Wildcard catch-all fallback to Home page so external links never 404 or show blank */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}
      {!isDashboard && <WhatsAppFloatingButton />}
      <Chatbot />
    </div>
  );
}
