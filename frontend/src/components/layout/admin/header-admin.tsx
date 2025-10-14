import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

type HeaderAdminProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
};
const HeaderAdmin = ({ sidebarOpen, setSidebarOpen }: HeaderAdminProps) => {
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-blue-600 transition"
              >
                JD
              </button>

              {/* Avatar Dropdown Menu */}
              {avatarMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setAvatarMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-600">john@example.com</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Billing
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                    >
                      Sign out
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
