import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Parties from "./pages/Parties";
import Wedding from "./pages/Wedding";
import Services from "./pages/Services";
import Destinations from "./pages/Destinations";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import PrivateRoute from "./PrivateRoute";


const AppWrapper: React.FC = () => {
  const location = useLocation();

  const hideHeaderFooter = ["/admin-login", "/admin-panel"];
  return (
    <>
      <ScrollToTop />
      {!hideHeaderFooter.includes(location.pathname) && <Header />}
   
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/wedding" element={<Wedding />} />
              <Route path="/services" element={<Services />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin-panel"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
      {!hideHeaderFooter.includes(location.pathname) && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <AppWrapper />
      </div>
    </HelmetProvider>
  );
};

export default App;