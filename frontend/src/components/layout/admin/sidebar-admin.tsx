import { Home, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type SidebarAdminProps = {
  sidebarOpen: boolean;
};
const SidebarAdmin = ({ sidebarOpen }: SidebarAdminProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();
  const menuItems = [
    { icon: Home, label: "Dashboard", link: "/admin", active: true },
    {
      icon: Users,
      label: "Sản phẩm",
      link: "/admin/product-management",
      active: false,
    },
  ];
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col md:relative fixed inset-y-0 left-0 z-50 ${
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center p-4 border-b border-gray-800">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Dashboard</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
              D
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => navigate(item.link)}
            >
              <span
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  item.active ? "bg-gray-800" : "hover:bg-gray-800"
                } ${!sidebarOpen ? "justify-center" : ""}`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </span>

              {/* Tooltip khi sidebar thu gọn */}
              {!sidebarOpen && hoveredItem === index && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg border border-gray-700 animate-in fade-in slide-in-from-left-1 duration-200">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarAdmin;
