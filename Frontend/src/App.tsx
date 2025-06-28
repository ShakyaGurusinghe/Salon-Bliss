
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

// User Pages
import BookAppointment from "./pages/user/BookAppointment";
import MyAppointments from "./pages/user/MyAppointments";
import Vouchers from "./pages/user/Vouchers";
import Feedback from "./pages/user/Feedback";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageServices from "./pages/admin/ManageServices";
import ManageAppointments from "./pages/admin/ManageAppointments";
import ManageVouchers from "./pages/admin/ManageVouchers";
import ViewFeedback from "./pages/admin/ViewFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              
              {/* User Protected Routes */}
              <Route path="/book" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <BookAppointment />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <MyAppointments />
                </ProtectedRoute>
              } />
              <Route path="/vouchers" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Vouchers />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Feedback />
                </ProtectedRoute>
              } />
              
              {/* Admin Protected Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/services" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageServices />
                </ProtectedRoute>
              } />
              <Route path="/admin/appointments" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageAppointments />
                </ProtectedRoute>
              } />
              <Route path="/admin/vouchers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageVouchers />
                </ProtectedRoute>
              } />
              <Route path="/admin/feedback" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ViewFeedback />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
