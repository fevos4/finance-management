const PaymentSummaryCards = ({ paymentData }) => {
    const {
    totalPaidAmount = "49,000.00",
    currentCredit = "4,300.00"
  } = paymentData || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Total Paid Amount Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Paid Amount
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {totalPaidAmount}
          </p>
        </div>
      </div>
      
      {/* Current Credit Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Current Credit
          </h3>
          <p className="text-3xl font-bold text-green-500">
            {currentCredit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryCards;
