import { useEffect, useState } from "react";
import { getAdminAnalyticsAPI } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [dailyPosts, setDailyPosts] = useState(null);
  const [dailyAnswers, setDailyAnswers] = useState(null);
  const [tagUsage, setTagUsage] = useState([]);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    setDate({
      start: sevenDaysAgo.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    });
  }, []);

  // render stats
  useEffect(() => {
    if (!date.start || !date.end) return;
    getAdminAnalyticsAPI(date)
      .then((res) => {
        console.log("API Response:", res);
        setStats(res);
        setDailyPosts(res.postsPerDay);
        setDailyAnswers(res.answersPerDay);
        setTagUsage(res.tagUsage);
      })
      .catch(console.error);
  }, [date]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const usersData = monthLabels.map((label, index) => {
    const monthEntry = stats?.usersPerMonth?.find((e) => e._id === index + 1);
    return {
      month: label,
      users: monthEntry?.count || 0,
    };
  });

  const dailyPostsData = dailyPosts?.map((entry) => ({
    date: entry.date,
    posts: entry.count,
  }));

  const dailyAnswersData = dailyAnswers?.map((entry) => ({
    date: entry.date,
    answers: entry.count,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Qualve Admin Dashboard
          </h1>
        </div>

        {stats ? (
          <>
            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Total Users
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalUsers.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Total Posts
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalPosts.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Total Answers
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalAnswers.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Popular Tags
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {tagUsage.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Weekly Posts
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {dailyPosts?.length || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="space-y-8">
              {/* User Signups Chart */}
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  User Signups by Month
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={usersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={[0, "dataMax + 1"]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} users`, "Signups"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tag Usage Chart */}
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Most Popular Tags
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={tagUsage}
                    margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="usageCount"
                      fill="#f59e0b"
                      name="Usage Count"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Date Range Picker */}
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <label className="font-medium text-gray-700">
                  Start Date:
                  <input
                    type="date"
                    name="start"
                    value={date.start}
                    onChange={handleDateChange}
                    className="ml-2 rounded border border-gray-300 px-2 py-1"
                    max={date.end || undefined}
                  />
                </label>
                <label className="font-medium text-gray-700">
                  End Date:
                  <input
                    type="date"
                    name="end"
                    value={date.end}
                    onChange={handleDateChange}
                    className="ml-2 rounded border border-gray-300 px-2 py-1"
                    min={date.start || undefined}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </label>
              </div>

              {/* Quick Date Range Dropdown */}
              <div className="mb-4 flex items-center gap-4">
                <label className="font-medium text-gray-700">
                  Quick Range:
                  <select
                    className="ml-2 rounded border border-gray-300 px-2 py-1"
                    onChange={(e) => {
                      const today = new Date();
                      let start = "";
                      let end = today.toISOString().split("T")[0];
                      if (e.target.value === "week") {
                        const weekAgo = new Date();
                        weekAgo.setDate(today.getDate() - 6);
                        start = weekAgo.toISOString().split("T")[0];
                      } else if (e.target.value === "month") {
                        const monthAgo = new Date();
                        monthAgo.setMonth(today.getMonth() - 1);
                        start = monthAgo.toISOString().split("T")[0];
                      } else if (e.target.value === "all") {
                        start = "2025-01-01";
                      }
                      setDate({ start, end });
                    }}
                    defaultValue=""
                  >
                    <option value="">Custom</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="all">All Time</option>
                  </select>
                </label>
              </div>

              {/* Daily Posts Chart */}
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Daily Posts Activity
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dailyPostsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="posts"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Daily Answers Chart */}
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Daily Answer Activity
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dailyAnswersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="answers"
                      stroke="#b91048"
                      strokeWidth={3}
                      dot={{ fill: "#b91048", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#b91048", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          /* Loading State */
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
