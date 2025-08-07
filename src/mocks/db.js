// src/mocks/db.js

export const users = [
  {
    slipNumber: '123',
    idNumber: '456',
    token: 'mock-token-1',
    studentInfo: {
      name: 'John Doe',
      id: '456',
      semester: 'Fall 2025',
      program: 'Computer Science',
    },
    courses: [
      { code: 'CS101', title: 'Intro to Programming', creditHour: 3, cost: 300 },
      { code: 'MA201', title: 'Calculus I', creditHour: 4, cost: 400 },
    ],
    additionalFees: [{ description: 'Lab Fee', amount: 50 }],
  },
  {
    slipNumber: '789',
    idNumber: '101',
    token: 'mock-token-2',
    studentInfo: {
      name: 'Feven Tesfaye',
      id: '101',
      semester: 'Spring 2025',
      program: 'Software Engineering',
    },
    courses: [
      { code: 'SE301', title: 'Software Design', creditHour: 3, cost: 350 },
      { code: 'DB202', title: 'Databases', creditHour: 3, cost: 300 },
    ],
    additionalFees: [{ description: 'Library Fee', amount: 40 }],
  },
  // Add more users here...
]
