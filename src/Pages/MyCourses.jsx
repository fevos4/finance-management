import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../Components/Layouts/DashboardLayouts";
import CourseBreakdownTable from "../Components/Dashboard/CourseBreakdownTable";
import { authUtils } from "../utils/auth";

const MyCoursesPage = () => {
  const { studentData, isAuthenticated } = useAuth();
  const [coursesData, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      if (studentData?.slipNumber) {
        try {
          const response = await fetch(`/dashboard/${studentData.slipNumber}`, {
            headers: authUtils.getAuthHeaders(),
          });

          if (response.ok) {
            const data = await response.json();
            setCoursesData(data.courses);
          }
        } catch (error) {
          console.error('Failed to fetch courses data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, [studentData]);

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

  if (loading || !coursesData) {
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

  const transformedCoursesData = coursesData.map((course) => ({
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
