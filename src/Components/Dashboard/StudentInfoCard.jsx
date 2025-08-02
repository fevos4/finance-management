import React from 'react';

const StudentInfoCard = ({ studentData }) => {
  const {
    studentName = "Feven Tesfaye",
    studentId = "Id number 2025",
    program = "Computer Science and Engineering",
    semester = "2nd Semester"
  } = studentData || {};

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Student Name
          </label>
          <p className="text-gray-900 font-medium">{studentName}</p>
        </div>
        
        {/* Student ID */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Student Id
          </label>
          <p className="text-gray-900 font-medium">{studentId}</p>
        </div>
        
        {/* Program */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Program
          </label>
          <p className="text-gray-900 font-medium">{program}</p>
        </div>
      </div>
      
      {/* Semester - Full width on second row */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Semester
        </label>
        <p className="text-gray-900 font-medium">{semester}</p>
      </div>
    </div>
  );
};

export default StudentInfoCard;
