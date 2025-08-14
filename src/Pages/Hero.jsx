import React, { useState } from "react";
import hero from "../assets/hero2.png";
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const [slipNumber, setSlipNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(slipNumber, idNumber); // Make sure login saves slipNumber in context!
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid slip number or ID number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="lg:min-h-screen bg-gray-50 flex items-start lg:items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Smart Payments for Smarter Futures
            </h1>
            <p className="text-gray-600 text-sm mb-8">
              Easily manage tuition, fees, and more all in one place
            </p>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="slipNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Slip Number
                  </label>
                  <input
                    type="text"
                    id="slipNumber"
                    placeholder="Enter your slip number"
                    value={slipNumber}
                    onChange={(e) => setSlipNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="idNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Id Number
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    placeholder="Enter your id number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="ml-3 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Access My Payment Info"
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Demo credentials: Slip Number:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    123
                  </span>
                  , ID:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    456
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 max-w-lg lg:max-w-none h-full flex items-center">
            <div className="relative w-full">
              <img
                src={hero}
                alt="Graduation celebration with students throwing caps in the air"
                className="w-full hidden lg:block max-h-[70vh] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
