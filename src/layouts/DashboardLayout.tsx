import { useState } from "react";
import { Outlet } from "react-router";
import SidebarDashboard from "../components/SidebarDashboard";
import NavbarDashboard from "../components/NavbarDashboard";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <NavbarDashboard setIsOpen={setIsOpen} />

      <div className="flex">
        {/* Sidebar */}
        <SidebarDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
