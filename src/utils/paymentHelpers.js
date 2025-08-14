// paymentHelpers.js
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

// Return the icon COMPONENT, not JSX
export const getStatusIconComponent = (status) => {
  switch (status) {
    case "paid":
    case "completed":
      return FaCheckCircle;
    case "pending":
      return FaClock;
    case "failed":
      return FaTimesCircle;
    default:
      return FaClock;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "paid":
    case "completed":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "failed":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const generateReceiptContent = (payment, studentInfo) => {
  const date = new Date(payment.date || payment.paymentDate).toLocaleDateString();
  const time = new Date(payment.date || payment.paymentDate).toLocaleTimeString();

  return `
PAYMENT RECEIPT
===============================================

Receipt Number: ${payment.receiptNumber}
Transaction ID: ${payment.id || payment.transactionId || 'N/A'}
Date: ${date} ${time}

STUDENT INFORMATION
-------------------------------------------
Name: ${studentInfo.name}
Student ID: ${studentInfo.id}
Program: ${studentInfo.program}
Semester: ${studentInfo.semester}

PAYMENT DETAILS
-------------------------------------------
Amount Paid: $${payment.amount.toFixed(2)}
Payment Method: ${payment.paymentMethod || 'Online'}
Payment Type: ${payment.paymentType || 'Tuition'}
Status: ${(payment.status || 'completed').toUpperCase()}
Description: Tuition Payment

===============================================
Thank you for your payment!

This is an automatically generated receipt.
For any questions, please contact the finance office.
    `;
};
