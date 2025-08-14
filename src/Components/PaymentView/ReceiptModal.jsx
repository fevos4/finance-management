import React from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import {
  getStatusIconComponent,
  getStatusColor,
  generateReceiptContent,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Payment Receipt</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                PAYMENT RECEIPT
              </h2>
              <p className="text-gray-600">
                Receipt #{selectedReceipt.payment.receiptNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700">
                  Student Information
                </h4>
                <p className="text-gray-600">{studentInfo.name}</p>
                <p className="text-gray-600">ID: {studentInfo.id}</p>
                <p className="text-gray-600">{studentInfo.program}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Payment Details</h4>
                <p className="text-gray-600">
                  Date:{" "}
                  {new Date(
                    selectedReceipt.payment.paymentDate
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Transaction: {selectedReceipt.payment.transactionId}
                </p>
                <p className="text-gray-600">
                  Method: {selectedReceipt.payment.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">
                Payment Breakdown
              </h4>
              <div className="space-y-2">
                {selectedReceipt.payment.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{item.description}</span>
                    <span className="font-medium">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>${selectedReceipt.payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  selectedReceipt.payment.status
                )}`}
              >
                <StatusIcon className="text-xl" />
                <span className="ml-2">
                  {selectedReceipt.payment.status.toUpperCase()}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onDownloadReceipt(selectedReceipt.payment)}
              className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
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
