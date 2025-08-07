import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import MyCoursesPage from "./Pages/MyCourses";

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
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<MyCoursesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
