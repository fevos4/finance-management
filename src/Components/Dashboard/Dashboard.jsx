import { FaArrowRight } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/Layouts/DashboardLayouts";
import StudentInfoCard from "../../Components/Dashboard/StudentInfoCard";
import PaymentSummaryCards from "../../Components/Dashboard/PaymentSummaryCards";
import CourseBreakdownTable from "../../Components/Dashboard/CourseBreakdownTable";
import AdditionalFee from "../../Components/Dashboard/AdditionalFee";

const DashboardPage = () => {
  const { studentData, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  // Show loading if no student data
  if (!studentData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading student data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Transform API data to match existing component structure
  const transformedStudentData = {
    studentName: studentData.studentInfo.name,
    studentId: `ID: ${studentData.studentInfo.id}`,
    program: studentData.studentInfo.program,
    semester: studentData.studentInfo.semester,
  };

  // Calculate payment summary from course and additional fees data
  const totalCourseCost = studentData.courses.reduce(
    (sum, course) => sum + course.cost,
    0
  );
  const totalAdditionalFees = studentData.additionalFees.reduce(
    (sum, fee) => sum + fee.amount,
    0
  );
  const totalAmount = totalCourseCost + totalAdditionalFees;
  const monthlyAmount = Math.ceil(totalAmount / 4);

  const transformedPaymentData = {
    totalPaidAmount: "0.00", // This would come from payment history in a real app
    currentCredit: totalAmount.toFixed(2),
  };

  // Transform courses data to match existing component structure
  const transformedCoursesData = studentData.courses.map((course) => ({
    courseCode: course.code,
    courseTitle: course.title,
    creditHours: course.creditHour,
    cost: course.cost.toFixed(2),
  }));

  // Transform additional fees data to match existing component structure
  const transformedAdditionalFees = studentData.additionalFees.map((fee) => ({
    feeType: fee.description,
    description: fee.description,
    cost: fee.amount.toFixed(2),
  }));

  const handleMakePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentMethod) return;

    setLoading(true);

    try {
      // Simulate Chapa payment integration
      const amount = paymentMethod === "monthly" ? monthlyAmount : totalAmount;
      const method =
        paymentMethod === "monthly" ? "Monthly Payment" : "Full Payment";

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        `Payment initialized successfully!\n\nAmount: $${amount}\nMethod: ${method}\n\nIn a real application, this would redirect to Chapa payment gateway.`
      );

      setShowPaymentModal(false);
      setPaymentMethod("");
    } catch (error) {
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenuItem="Dashboard">
      <div className="space-y-6">
        {/* Student Information Section */}
        <StudentInfoCard studentData={transformedStudentData} />

        {/* Payment Summary Section */}
        <PaymentSummaryCards paymentData={transformedPaymentData} />

        {/* Course Breakdown Section */}
        <CourseBreakdownTable courses={transformedCoursesData} />

        {/* Additional Fees Section */}
        <AdditionalFee fees={transformedAdditionalFees} />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 md:gap-16">
        <button
          type="button"
          onClick={handleMakePayment}
          className="w-full md:w-auto flex flex-row items-center justify-center gap-4 shadow-sm bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Make Payment <FaArrowRight />
        </button>

        <button
          type="button"
          className="w-full md:w-auto flex flex-row items-center justify-center gap-4 shadow-sm border hover:bg-gray-300 text-black py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <FaDownload /> Download
        </button>

        <button
          type="button"
          className="w-full md:w-auto flex flex-row items-center justify-center gap-4 border hover:bg-gray-300 text-black py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <GrView /> View Payment History
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Choose Payment Method
            </h3>

            <div className="space-y-4 mb-6">
              {/* Monthly Payment Option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "monthly"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("monthly")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        paymentMethod === "monthly"
                          ? "border-yellow-400 bg-yellow-400"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "monthly" && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Monthly Payment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pay in 4 monthly installments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">
                      ${monthlyAmount}
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>
              </div>

              {/* Full Payment Option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "full"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("full")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        paymentMethod === "full"
                          ? "border-yellow-400 bg-yellow-400"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "full" && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Full Payment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pay the complete amount at once
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${totalAmount}
                    </p>
                    <p className="text-xs text-gray-500">one-time payment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentMethod("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={!paymentMethod || loading}
                className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                  !paymentMethod || loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                    Processing...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>

            {paymentMethod && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  You will be redirected to Chapa payment gateway to complete
                  your payment securely.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
