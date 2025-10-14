import { useState } from "react";
import { Outlet } from "react-router";
import HeaderAdmin from "./header-admin";
import SidebarAdmin from "./sidebar-admin";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin sidebarOpen={sidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
