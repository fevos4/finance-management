import { FaArrowRight } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import DashboardLayout from '../../Components/Layouts/DashboardLayouts';
import StudentInfoCard from '../../Components/Dashboard/StudentInfoCard';
import PaymentSummaryCards from '../../Components/Dashboard/PaymentSummaryCards';
import CourseBreakdownTable from '../../Components/Dashboard/CourseBreakdownTable';
import AdditionalFee from '../../Components/Dashboard/AdditionalFee';

const DashboardPage = () => {
  // Sample data - in a real application, this would come from an API or state management
  const studentData = {
    studentName: "Feven Tesfaye",
    studentId: "Id number 2025",
    program: "Computer Science and Engineering",
    semester: "2nd Semester"
  };

  const paymentData = {
    totalPaidAmount: "49,000.00",
    currentCredit: "4,300.00"
  };

  const coursesData = [
    {
      courseCode: "CSE301",
      courseTitle: "Advanced Programming",
      creditHours: 3,
      cost: "1200.00"
    },
    {
      courseCode: "CSE302",
      courseTitle: "Data Structures",
      creditHours: 4,
      cost: "1600.00"
    },
    {
      courseCode: "CSE303",
      courseTitle: "Database Systems",
      creditHours: 3,
      cost: "1200.00"
    },
    {
      courseCode: "CSE304",
      courseTitle: "Software Engineering",
      creditHours: 3,
      cost: "1200.00"
    },
    {
      courseCode: "CSE305",
      courseTitle: "Computer Networks",
      creditHours: 3,
      cost: "1200.00"
    }
  ];
  const additionalFee = [
    {
      feeType: "ID Fee",
      description: "Identification Card",
      cost: "200.00"
    },
    {
      feeType: "Registration Fee",
      description: "Course Registration",
      cost: "600.00"
    },
  
  ]

  return (
    <DashboardLayout activeMenuItem="Dashboard">
      <div className="space-y-6">
        {/* Student Information Section */}
        <StudentInfoCard studentData={studentData} />
        
        {/* Payment Summary Section */}
        <PaymentSummaryCards paymentData={paymentData} />
        
        {/* Course Breakdown Section */}
        <CourseBreakdownTable courses={coursesData} />
        {/* Additional Fees Section */}
        <AdditionalFee fees={additionalFee} />
      </div>
      <div className='flex justify-center items-center mt-8 gap-16'>
        <button 
         type="submit"
         className="w-full flex flex-row items-center justify-center gap-4 shadow-sm bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Make Payment <FaArrowRight />
         </button>
         <button 
         type="submit"
         className="w-full flex flex-row items-center justify-center gap-4 shadow-sm border hover:bg-gray-300 text-black py-2 px-6 rounded-lg transition-colors duration-200"
            >
              <FaDownload /> Download
         </button>
         <button 
         type="submit"
         className="w-full flex flex-row items-center justify-center gap-4 border hover:bg-gray-300 text-black py-2 px-6 rounded-lg transition-colors duration-200"
            >
              <GrView /> View Payment History
         </button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;