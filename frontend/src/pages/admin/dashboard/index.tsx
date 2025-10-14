import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      label: "Active Users",
      value: "2,345",
      change: "+15.3%",
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      label: "Growth Rate",
      value: "32.8%",
      change: "+4.7%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      user: "Sarah Johnson",
      action: "completed purchase",
      time: "2 mins ago",
      amount: "$299",
    },
    {
      user: "Mike Chen",
      action: "registered account",
      time: "15 mins ago",
      amount: "-",
    },
    {
      user: "Emma Davis",
      action: "completed purchase",
      time: "1 hour ago",
      amount: "$149",
    },
    {
      user: "James Wilson",
      action: "left review",
      time: "2 hours ago",
      amount: "-",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, John!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Revenue Overview
            </h3>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 70, 45, 85, 60, 90, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity size={16} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                {activity.amount !== "-" && (
                  <span className="text-sm font-semibold text-green-600">
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
