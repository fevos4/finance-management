import React from 'react';

const AdditionalFee = ({ fees }) => {
  const defaultfees = [
    {
      feeType: "CSE301",
      description: "Advanced Programming",
      cost: "1200.00"
    },
    {
      feeType: "CSE302",
      description: "Data Structures",
      cost: "1600.00"
    },
    {
      feeType: "CSE303",
      description: "Database Systems",
      cost: "1200.00"
    },
    {
      feeType: "CSE304",
      description: "Software Engineering",
      cost: "1200.00"
    }
  ];

  const additionalFee = fees || defaultfees;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Fees</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {additionalFee.map((fees, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {fees.feeType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fees.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {fees.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalFee;