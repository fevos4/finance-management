import React from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import {
  getStatusIconComponent,
  getStatusColor,
} from "../../utils/paymentHelpers";

const ReceiptModal = ({
  selectedReceipt,
  onClose,
  studentInfo,
  onDownloadReceipt,
}) => {
  if (!selectedReceipt) return null;

  const StatusIcon = getStatusIconComponent(selectedReceipt.payment.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Payment Receipt</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500 text-lg sm:text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                PAYMENT RECEIPT
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Receipt #{selectedReceipt.payment.receiptNumber}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700">
                  Student Information
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">{studentInfo.name}</p>
                <p className="text-gray-600 text-sm sm:text-base">ID: {studentInfo.id}</p>
                <p className="text-gray-600 text-sm sm:text-base">{studentInfo.program}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Payment Details</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Date:{" "}
                  {new Date(
                    selectedReceipt.payment.paymentDate
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Transaction: {selectedReceipt.payment.transactionId}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Method: {selectedReceipt.payment.paymentMethod}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">
                Payment Breakdown
              </h4>
              <div className="space-y-2">
                {selectedReceipt.payment.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">{item.description}</span>
                    <span className="font-medium">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3">
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total Amount</span>
                  <span>${selectedReceipt.payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <span
                className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                  selectedReceipt.payment.status
                )}`}
              >
                <StatusIcon className="text-lg sm:text-xl" />
                <span className="ml-2">
                  {selectedReceipt.payment.status.toUpperCase()}
                </span>
              </span>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onDownloadReceipt(selectedReceipt.payment)}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm sm:text-base"
            >
              <FaDownload />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
