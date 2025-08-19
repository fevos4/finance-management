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
      { code: 'CS102', title: 'Data Structures', creditHour: 3, cost: 350 },
      { code: 'CS103', title: 'Web Development', creditHour: 3, cost: 300 },
      { code: 'CS104', title: 'Operating Systems', creditHour: 3, cost: 400 },
      { code: 'CS105', title: 'Computer Networks', creditHour: 3, cost: 350 },
      { code: 'CS106', title: 'Database Systems', creditHour: 3, cost: 300 },
      { code: 'CS107', title: 'Software Engineering', creditHour: 3, cost: 400 },
      { code: 'CS108', title: 'Artificial Intelligence', creditHour: 3, cost: 450 },
      { code: 'CS109', title: 'Machine Learning', creditHour: 3, cost: 500 },
    ],
    additionalFees: [{ description: 'Lab Fee', amount: 50 },
      { description: 'Registration Fee', amount: 75 },
      { description: 'Library Fee', amount: 30 },
      { description: 'Technology Fee', amount: 20 },
      { description: 'Student Activity Fee', amount: 25 },
      { description: 'Graduation Fee', amount: 100 }
    ],
    paymentHistory: [
      { 
        id: 1, 
        receiptNumber: 'R1001', 
        amount: 500, 
        date: '2024-01-10',
        paymentDate: '2024-01-10T10:30:00Z',
        paymentMethod: 'Credit Card',
        paymentType: 'Tuition',
        status: 'completed',
        description: 'Credit Card - Tuition',
        transactionId: 'TXN1001'
      },
      { 
        id: 2, 
        receiptNumber: 'R1002', 
        amount: 300, 
        date: '2024-03-15',
        paymentDate: '2024-03-15T14:20:00Z',
        paymentMethod: 'Bank Transfer',
        paymentType: 'Tuition',
        status: 'completed',
        description: 'Bank Transfer - Tuition',
        transactionId: 'TXN1002'
      },
    ],
    paymentStatus: {
  totalDue: 1200,
  totalPaid: 800,
  remainingBalance: 400,
  status: "paid" 
}
  
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
      { code: 'CS202', title: 'Computer Architecture', creditHour: 3, cost: 400 },
      { code: 'CS203', title: 'Network Security', creditHour: 3, cost: 450 },
      { code: 'CS204', title: 'Cloud Computing', creditHour: 3, cost: 500 },
      { code: 'CS205', title: 'Mobile App Development', creditHour: 3, cost: 350 },
    ],
    additionalFees: [{ description: 'Library Fee', amount: 40 },
      { description: 'Exam Fee', amount: 60 },
      { description: 'Graduation Fee', amount: 100 },
      { description: 'Student Union Fee', amount: 30 }
    ],
    paymentHistory: [
      { 
        id: 1, 
        receiptNumber: 'R1001', 
        amount: 500, 
        date: '2024-01-10',
        paymentDate: '2024-01-10T10:30:00Z',
        paymentMethod: 'Credit Card',
        paymentType: 'Tuition',
        status: 'completed',
        description: 'Credit Card - Tuition',
        transactionId: 'TXN1001'
      },
      { 
        id: 2, 
        receiptNumber: 'R1002', 
        amount: 300, 
        date: '2024-03-15',
        paymentDate: '2024-03-15T14:20:00Z',
        paymentMethod: 'Bank Transfer',
        paymentType: 'Tuition',
        status: 'completed',
        description: 'Bank Transfer - Tuition',
        transactionId: 'TXN1002'
      },
    ],
    paymentStatus: {
  totalDue: 1200,
  totalPaid: 800,
  remainingBalance: 400,
  status: "paid" // or "pending", etc
    }
  
  },
 
]
