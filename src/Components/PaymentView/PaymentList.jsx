import React from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import {
  getStatusIconComponent,
  getStatusColor,
} from "../../utils/paymentHelpers";

const PaymentList = ({
  paymentHistory,
  loading,
  onViewReceipt,
  onDownloadReceipt,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="ml-3 text-gray-600">Loading payment history...</span>
      </div>
    );
  }

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No payment history found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {paymentHistory.map((payment) => {
        const StatusIcon = getStatusIconComponent(payment.status || "");

        return (
          <div
            key={payment.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <StatusIcon className="text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {payment.description || "No Description"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {payment.paymentDate || payment.date
                        ? new Date(payment.paymentDate || payment.date).toLocaleDateString()
                        : "No Date"}{" "}
                      • Receipt: {payment.receiptNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      payment.status || ""
                    )}`}
                  >
                    {(payment.status ?? "").toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  ${Number(payment.amount || 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {payment.paymentMethod || "Unknown"} payment
                </p>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => onViewReceipt(payment.id)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <FaEye size={14} />
                <span className="text-sm">View Receipt</span>
              </button>
              <button
                onClick={() => onDownloadReceipt(payment)}
                className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <FaDownload size={14} />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentList;
