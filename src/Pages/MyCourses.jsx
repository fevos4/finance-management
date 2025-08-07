import React from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../Components/Layouts/DashboardLayouts";
import CourseBreakdownTable from "../Components/Dashboard/CourseBreakdownTable";

const MyCoursesPage = () => {
  const { studentData, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600">Please log in to view your courses.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!studentData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const transformedCoursesData = studentData.courses.map((course) => ({
    courseCode: course.code,
    courseTitle: course.title,
    creditHours: course.creditHour,
    cost: course.cost.toFixed(2),
  }));

  return (
    <DashboardLayout activeMenuItem="My Courses">
      <CourseBreakdownTable courses={transformedCoursesData} />
    </DashboardLayout>
  );
};

export default MyCoursesPage;
