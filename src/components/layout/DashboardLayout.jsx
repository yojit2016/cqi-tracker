import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ErrorBoundary from '../common/ErrorBoundary';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true, // animates only once on scroll down
      mirror: false,
    });
  }, []);

  // Whenever path changes, refresh AOS coordinates so scroll reveals match new page heights
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-72 flex flex-col min-h-screen">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-grow bg-background px-4 pb-10 pt-6 md:px-8 xl:px-12">
          <div className="mx-auto max-w-[1700px]">
            <AnimatePresence mode="wait">
              <ErrorBoundary key={location.pathname}>
                <Outlet />
              </ErrorBoundary>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
