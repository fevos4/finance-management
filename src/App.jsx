import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import MyCoursesPage from "./Pages/MyCourses";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChatBot from "./Pages/ChatBot";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Footer />
                <ChatBot />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
