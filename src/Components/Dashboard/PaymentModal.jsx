import React from "react";

const PaymentModal = ({
  show,
  onClose,
  paymentMethod,
  setPaymentMethod,
  monthlyAmount,
  totalAmount,
  loading,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Choose Payment Method
        </h3>

        <div className="space-y-4 mb-6">
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "monthly"
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("monthly")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    paymentMethod === "monthly"
                      ? "border-yellow-400 bg-yellow-400"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "monthly" && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Monthly Payment
                  </h4>
                  <p className="text-sm text-gray-600">
                    Pay in 4 monthly installments
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-yellow-600">
                  ${monthlyAmount}
                </p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "full"
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("full")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    paymentMethod === "full"
                      ? "border-yellow-400 bg-yellow-400"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "full" && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Full Payment</h4>
                  <p className="text-sm text-gray-600">
                    Pay the complete amount at once
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  ${totalAmount}
                </p>
                <p className="text-xs text-gray-500">one-time payment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!paymentMethod || loading}
            className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
              !paymentMethod || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-500"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>

        {paymentMethod && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              You will be redirected to Chapa payment gateway to complete your
              payment securely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
