import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";

// Home Components
import Home from "./pages/Home";


// Auth Pages
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

// Publisher Pages
import PublisherDashboard from "./pages/Publisher/Dashboard";
import Products from "./pages/Publisher/Products";
import Promos from "./pages/Publisher/Promos";
import Orders from "./pages/Publisher/Orders";
import Profile from "./pages/Publisher/Profile";
import Withdraw from "./pages/Publisher/Withdraw";
import Balance from "./pages/Publisher/Balance";
import Deposit from "./components/Forms/Deposit";
import Faq from "./pages/Publisher/Faq";
import AddWebsiteForm from "./components/Forms/AddWebsiteForm";

// Advertiser Pages
import AdvertiserDashboard from "./pages/Advertiser/Dashboard";
import Projects from "./pages/Advertiser/Projects";
import Catalogue from "./pages/Advertiser/Catalogue";
import AdvertiserOrders from "./pages/Advertiser/Orders";
import Favorite from "./pages/Advertiser/Favorite";
import Cart from "./pages/Advertiser/Cart";
import AdvertiserDeposit from "./pages/Advertiser/Deposit";
import AdvertiserBalance from "./pages/Advertiser/Balance";
import AdvertiserFaq from "./pages/Advertiser/Faq";
import CreateProject from "./components/Forms/CreateProject";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/publisher/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const [mode, setMode] = useState("Publisher");
  const { checkAuth, isCheckingAuth, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMode = () => setMode((prev) => (prev === "Publisher" ? "Advertiser" : "Publisher"));

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Home Route */}
        <Route 
          path="/" 
          element={
            <RedirectAuthenticatedUser>
              <Home setIsAuthenticated={setIsAuthenticated} />
            </RedirectAuthenticatedUser>
          } 
        />

        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoutes>
              <DashboardLayout mode={mode} toggleMode={toggleMode} />
            </ProtectedRoutes>
          }
        >
          {/* Balance related routes */}
          <Route path="/balance" element={<Balance />} />
          <Route path="/balance/deposit" element={<Deposit />} />
          <Route path="/balance/withdraw" element={<Withdraw />} />

          {/* Publisher routes */}
          {mode === "Publisher" ? (
            <>
              <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
              <Route path="/publisher/products" element={<Products toggleMode={toggleMode} />} />
              <Route path="/publisher/products/add" element={<AddWebsiteForm />} />
              <Route path="/publisher/promos" element={<Promos />} />
              <Route path="/publisher/orders" element={<Orders />} />
              <Route path="/publisher/profile" element={<Profile />} />
              <Route path="/publisher/faq" element={<Faq />} />
            </>
          ) : (
            <>
              <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
              <Route path="/advertiser/projects" element={<Projects />} />
              <Route path="/advertiser/projects/create" element={<CreateProject />} />
              <Route path="/advertiser/catalogue" element={<Catalogue />} />
              <Route path="/advertiser/orders" element={<AdvertiserOrders />} />
              <Route path="/advertiser/favorite" element={<Favorite />} />
              <Route path="/advertiser/profile" element={<Profile />} />
              <Route path="/advertiser/cart" element={<Cart />} />
              <Route path="/advertiser/deposit" element={<AdvertiserDeposit />} />
              <Route path="/advertiser/balance" element={<AdvertiserBalance />} />
              <Route path="/advertiser/faq" element={<AdvertiserFaq />} />
            </>
          )}

          {/* Default redirects */}
          <Route
            path="*"
            element={<Navigate to={mode === "Publisher" ? "/publisher/dashboard" : "/advertiser/dashboard"} />}
          />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;