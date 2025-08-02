import React from "react";
import hero from "../assets/hero2.png"; 
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";


const Hero = () => {
     const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };
    return (
       <div>
        <Navbar />
         <div className="h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
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
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="slipNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Slip Number
                                </label>
                                <input 
                                    type="text" 
                                    id="slipNumber"
                                    placeholder="Enter your slip number" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Id Number
                                </label>
                                <input 
                                    type="text" 
                                    id="studentName"
                                    placeholder="Enter your id number" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                            onClick={handleSubmit}>
                                Access My Payment Info
                            </button>
                        </form>
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
    )
}

export default Hero;
