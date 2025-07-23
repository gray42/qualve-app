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
  const [dailyStats, setDailyStats] = useState(null);
  const [tagUsage, setTagUsage] = useState([]);

  // render stats
  useEffect(() => {
    getAdminAnalyticsAPI()
      .then((res) => {
        setStats(res);
        setDailyStats(res.postsPerDay);
        setTagUsage(res.tagUsage);
      })
      .catch(console.error);
  }, []);

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

  const dailyPostsData = dailyStats?.map((entry) => ({
    date: new Date(entry._id).toLocaleDateString("en-US", { timeZone: "UTC" }),
    posts: entry.count,
  }));

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Qualve Admin Dashboard</h2>
      {stats && (
        <>
          {/* STATS */}
          <div className="mb-6">
            <p>
              <strong>Total Users:</strong> {stats.totalUsers}
            </p>
            <p>
              <strong>Total Posts:</strong> {stats.totalPosts}
            </p>
          </div>

          {/* USER BY MONTH */}
          <h3 className="mb-2 text-xl font-medium">User Signups by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, "dataMax + 1"]} />
              <Tooltip formatter={(value) => [`${value} users`, "Signups"]} />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          {/* DAILY */}
          <h3 className="mb-4 text-xl font-semibold">Daily Posts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyPostsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="posts" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          <h3 className="mb-4 text-xl font-semibold">Tag Usage</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={tagUsage}
              margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usageCount" fill="#8884d8" name="Usage Count" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
