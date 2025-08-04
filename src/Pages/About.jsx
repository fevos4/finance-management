
import { MdOutlineSecurity } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { IoIosFlash } from "react-icons/io";


const About = () => {
    const features = [
        {
            icon: <MdOutlineSecurity  className="text-4xl text-[#1E293B]" />,
            title: "Secure Payments",
            description: "Your transactions are protected with top-notch security measures."
        },
        {
            icon: <IoTimer className="text-4xl text-[#1E293B]" />,
            title: "Real-time Tracking",
            description: "Monitor your payment status and transaction history"
        },
        {
            icon: <IoIosFlash className="text-4xl text-[#1E293B]" />,
            title: "Fast and Easy",
            description: "Monitor and access your payment system easily"
        }
    ];

    return (
        <div className="lg:py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;