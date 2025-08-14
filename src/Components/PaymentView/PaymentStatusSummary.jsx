import React from "react";
import {
  getStatusIconComponent,
  getStatusColor,
} from "../../utils/paymentHelpers";

const PaymentStatusSummary = ({ paymentStatus }) => {
  if (!paymentStatus) return null;

  // Safe fallback to 0 if any field is missing or not a number
  const totalDue = Number(paymentStatus.totalDue) || 0;
  const totalPaid = Number(paymentStatus.totalPaid) || 0;
  const remainingBalance = Number(paymentStatus.remainingBalance) || 0;

  // Get the icon component from helper
  const StatusIcon = getStatusIconComponent(paymentStatus.status);

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Due</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${totalDue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
          <p className="text-2xl font-bold text-green-600">
            ${totalPaid.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Remaining Balance
          </h3>
          <p className="text-2xl font-bold text-red-600">
            ${remainingBalance.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            paymentStatus.status
          )}`}
        >
          <StatusIcon />
          <span className="ml-2 capitalize">{paymentStatus.status}</span>
        </span>
      </div>
    </div>
  );
};

export default PaymentStatusSummary;
