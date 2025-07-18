import { useNotifications } from "../../context/NotificationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function NotificationList() {
  const { user } = useUser();
  const { notifications, markNotificationAsRead, loading } = useNotifications();
  const navigate = useNavigate();

  const handleClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);
      }

      if (
        notification.resourceType === "Question" ||
        notification.resourceType === "Answer" ||
        notification.resourceType === "Vote"
      ) {
        navigate(`/post/${notification.resourceId}`);
      }
    } catch (error) {
      console.error("Error marking notification as read and rerouting", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!Array.isArray(notifications) || notifications.length === 0) {
    return <p>No notifications yet!</p>;
  }
  return (
    <div className="space-y-3">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        {user.name}&apos;s Notifications
      </h1>
      {notifications.map((n, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(n)}
          className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-all duration-150 hover:shadow-md ${
            n.isRead ? "border-gray-200 bg-white" : "border-blue-300 bg-blue-50"
          }`}
        >
          <p className="text-sm text-gray-800">
            <strong className="font-medium text-gray-900">
              {n.from.username}
            </strong>{" "}
            {n.type === "answer" ? n.type + "ed" : n.type + "d"} your{" "}
            <span className="italic text-gray-700">
              {n.resourceType.toLowerCase()} <br />
              {n.resourceText}
            </span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {new Date(n.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
