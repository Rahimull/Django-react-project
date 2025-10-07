import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";



const DashboardLayout = () => {


  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        <Navbar />


        {/* Main Content */}
        <main className="p-6 bg-gray-950 flex-1 overflow-y-auto rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default DashboardLayout;