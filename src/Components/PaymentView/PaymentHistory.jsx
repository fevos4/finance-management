import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PaymentStatusSummary from "./PaymentStatusSummary";
import PaymentList from "./PaymentList";
import ReceiptModal from "./ReceiptModal";
import { generateReceiptContent } from "../../utils/paymentHelpers";
import { authUtils } from "../../utils/auth";

const PaymentHistory = ({ isOpen, onClose }) => {
  const { studentData } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && studentData && studentData.slipNumber) {
      fetchPaymentHistory();
    }
  }, [isOpen, studentData]);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `/payment-history/${studentData.slipNumber}`,
        {
          headers: authUtils.getAuthHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setPaymentHistory(data.paymentHistory || []);
        setPaymentStatus(data.paymentStatus || null);
      } else {
        throw new Error('Failed to fetch payment history');
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
      setError("Failed to load payment history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewReceipt = async (paymentId) => {
    try {
      const response = await fetch(`/payment-receipt/${paymentId}`, {
        headers: authUtils.getAuthHeaders(),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSelectedReceipt(data);
      } else {
        // If API fails, create receipt from payment history data
        const payment = paymentHistory.find(p => p.id === paymentId);
        if (payment) {
          setSelectedReceipt({
            payment: {
              ...payment,
              paymentDate: payment.date || payment.paymentDate || new Date().toISOString(),
              transactionId: payment.id || payment.transactionId || `TXN${payment.id}`,
              items: [
                {
                  description: payment.description || 'Tuition Payment',
                  amount: payment.amount
                }
              ]
            }
          });
        } else {
          throw new Error('Payment not found');
        }
      }
    } catch (error) {
      console.error("Error fetching receipt:", error);
      alert("Failed to load receipt. Please try again.");
    }
  };

  const handleDownloadReceipt = (payment) => {
    const receiptContent = generateReceiptContent(
      payment,
      studentData?.studentInfo || {
        name: 'Student Name',
        id: 'N/A',
        program: 'N/A',
        semester: 'N/A'
      }
    );
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${payment.receiptNumber || payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    fetchPaymentHistory();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Refresh"
            >
              🔄
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Payment Status Summary */}
        {paymentStatus && (
          <PaymentStatusSummary paymentStatus={paymentStatus} />
        )}

        {/* Payment History List */}
        <div className="p-6 overflow-y-auto max-h-96 flex-grow">
          {error ? (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold">Error Loading Payment History</p>
                <p className="text-sm text-gray-600 mt-1">{error}</p>
              </div>
              <button
                onClick={handleRefresh}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <PaymentList
              paymentHistory={paymentHistory}
              loading={loading}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
            />
          )}
        </div>

        <ReceiptModal
          selectedReceipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          studentInfo={studentData?.studentInfo}
          onDownloadReceipt={handleDownloadReceipt}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
