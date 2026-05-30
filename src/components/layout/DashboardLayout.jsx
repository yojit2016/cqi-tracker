import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-72">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-80px)] bg-background px-4 pb-10 pt-6 md:px-8 xl:px-12">
          <div className="mx-auto max-w-[1700px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
