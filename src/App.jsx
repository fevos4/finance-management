// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Dashboard from "./Components/Dashboard/Dashboard"; // Make sure this page exists

export default function App() {
  return (
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
      </Routes>
    </Router>
  );
}
