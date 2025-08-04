import React from 'react';
import Sidebar from './Sidebar';
import { useState } from 'react';
import {  MdMenu } from 'react-icons/md';


const DashboardLayout = ({ children, activeMenuItem = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="md:flex h-screen bg-gray-50 relative">
      <Sidebar activeItem={activeMenuItem} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <header className="px-6 py-4 flex items-center justify-between md:shadow-none md:bg-transparent">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tuition Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1 sm:block">Welcome back, Feven! Here is your tuition overview</p>
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200"
            onClick={toggleSidebar}
          >
            <MdMenu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;