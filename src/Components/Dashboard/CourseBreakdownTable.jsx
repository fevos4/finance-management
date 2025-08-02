import React from 'react';

const CourseBreakdownTable = ({ courses }) => {
  const defaultCourses = [
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
    }
  ];

  const courseData = courses || defaultCourses;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Breakdown</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courseData.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.courseCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.courseTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.creditHours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseBreakdownTable;