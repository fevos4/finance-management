import { FaArrowRight } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/Layouts/DashboardLayouts";
import StudentInfoCard from "../../Components/Dashboard/StudentInfoCard";
import PaymentSummaryCards from "../../Components/Dashboard/PaymentSummaryCards";
import CourseBreakdownTable from "../../Components/Dashboard/CourseBreakdownTable";
import AdditionalFee from "../../Components/Dashboard/AdditionalFee";
import PaymentModal from "../../Components/Dashboard/PaymentModal";
import PaymentHistory from "../../Components/PaymentView/PaymentHistory";
import { authUtils } from "../../utils/auth";

const DashboardPage = () => {
  // ✅ Destructure the new refreshStudentData function
  const {
    studentData,
    isAuthenticated,
    loading: authLoading,
    refreshStudentData,
  } = useAuth();
  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Redirect to home if not authenticated after auth check is done
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (studentData?.slipNumber) {
        try {
          const response = await fetch(`/dashboard/${studentData.slipNumber}`, {
            headers: authUtils.getAuthHeaders(), // ✅ Use the new headers function
          });

          if (response.ok) {
            const data = await response.json();
            setDashboardData(data);
          } else {
            // Handle cases where the API fails (e.g., token expired)
            console.error(
              "Failed to fetch dashboard data:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        }
      }
    };

    fetchDashboardData();
  }, [studentData]); // Dependency remains on studentData

  const handlePaymentSubmit = async () => {
    if (!paymentMethod) return;
    setLoading(true);

    try {
      const amount =
        paymentMethod === "monthly" ? monthlyAmount : remainingBalance;
      const method =
        paymentMethod === "monthly" ? "Monthly Payment" : "Full Payment";

      const response = await fetch("/process-payment", {
        method: "POST",
        headers: authUtils.getAuthHeaders(), // ✅ Use the new headers function
        body: JSON.stringify({
          slipNumber: studentData.slipNumber,
          amount: amount,
          paymentMethod: method,
          paymentType: "Tuition",
        }),
      });

      if (response.ok) {
        const result = await response.json();

        alert(
          `Payment processed successfully!\n\nAmount: $${amount.toFixed(
            2
          )}\nMethod: ${method}\nReceipt Number: ${
            result.payment.receiptNumber
          }\n\nThank you for your payment!`
        );

        // ✅ Refresh student data in the context to update localStorage reference
        refreshStudentData();

        // ✅ Re-fetch dashboard data to get the latest payment info
        const dashboardResponse = await fetch(
          `/dashboard/${studentData.slipNumber}`,
          {
            headers: authUtils.getAuthHeaders(),
          }
        );

        if (dashboardResponse.ok) {
          const updatedData = await dashboardResponse.json();
          setDashboardData(updatedData);
        }

        setShowPaymentModal(false);
        setPaymentMethod("");
      } else {
        throw new Error("Payment processing failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Render Logic (No changes below this line, but included for completeness) ---

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!studentData || !dashboardData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const transformedStudentData = {
    studentName: dashboardData.studentInfo.name,
    studentId: `ID: ${dashboardData.studentInfo.id}`,
    program: dashboardData.studentInfo.program,
    semester: dashboardData.studentInfo.semester,
  };

  const transformedPaymentData = {
    totalPaidAmount: dashboardData.paymentSummary.totalPaid.toFixed(2),
    currentCredit: dashboardData.paymentSummary.remainingBalance.toFixed(2),
  };

  const transformedCoursesData = dashboardData.courses.map((course) => ({
    courseCode: course.code,
    courseTitle: course.title,
    creditHours: course.creditHour,
    cost: course.cost.toFixed(2),
  }));

  const transformedAdditionalFees = dashboardData.additionalFees.map((fee) => ({
    feeType: fee.description,
    description: fee.description,
    cost: fee.amount.toFixed(2),
  }));

  const totalAmount = dashboardData.paymentSummary.totalDue;
  const remainingBalance = dashboardData.paymentSummary.remainingBalance;
  const monthlyAmount = Math.ceil(remainingBalance / 4);

  const handleMakePayment = () => {
    setShowPaymentModal(true);
  };

  return (
    <DashboardLayout activeMenuItem="Dashboard">
      <div className="space-y-6">
        <StudentInfoCard studentData={transformedStudentData} />
        <PaymentSummaryCards paymentData={transformedPaymentData} />
        <CourseBreakdownTable courses={transformedCoursesData} />
        <AdditionalFee fees={transformedAdditionalFees} />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 md:gap-16">
        {remainingBalance > 0 && (
          <button
            type="button"
            onClick={handleMakePayment}
            className="w-full md:w-auto flex flex-row items-center justify-center gap-4 shadow-sm bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Make Payment <FaArrowRight />
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowPaymentHistory(true)}
          className="w-full md:w-auto flex flex-row items-center justify-center gap-4 border hover:bg-gray-300 text-black py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <GrView /> View Payment History
        </button>
      </div>

      {remainingBalance === 0 && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-700 font-semibold">
            🎉 Congratulations! All payments have been completed.
          </p>
        </div>
      )}

      <PaymentModal
        show={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setPaymentMethod("");
        }}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        monthlyAmount={monthlyAmount}
        totalAmount={remainingBalance}
        loading={loading}
        onSubmit={handlePaymentSubmit}
      />

      <PaymentHistory
        isOpen={showPaymentHistory}
        onClose={() => setShowPaymentHistory(false)}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
