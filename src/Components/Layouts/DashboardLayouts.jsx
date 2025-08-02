import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, activeMenuItem = 'Dashboard' }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activeMenuItem} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className=" px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tuition Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, Feven! Here is your tuition overview</p>
            </div>
            
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;