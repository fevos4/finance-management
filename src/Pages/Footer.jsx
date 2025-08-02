import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 ">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <img src={logo} alt="UniPay Logo" className="h-16 w-auto scale-150" />
                        
                        <p className="text-gray-300 leading-relaxed max-w-sm">
                            Empowering students with secure and efficient financial management solutions.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4 ">
                        <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                        <div className="space-y-2 text-gray-300">
                            <p><span className="font-bold">Email:</span> finance@univerity.edu.et</p>
                            <p><span className="font-bold">Phone:</span> +251110987654</p>
                            <p><span className="font-bold">Address:</span> Adama,Ethiopia</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex gap-3">
                            <a 
                                href="https://www.linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 shadow-sm shadow-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                            >
                                <FaLinkedinIn className="text-white text-lg" />
                            </a>
                            <a 
                                href="https://www.twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 shadow-sm shadow-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                            >
                                <FaXTwitter className="text-white text-lg" />
                            </a>
                            <a 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 shadow-sm shadow-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                            >
                                <FaFacebookF className="text-white text-lg" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-600 pt-6">
                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2025 UniPay. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;