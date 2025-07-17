import { useNotifications } from "../../context/NotificationContext";
import { useEffect } from "react";

export default function NotificationList() {
  const { notifications, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchNotifications;
  }, []);

  if (notifications.length === 0) {
    return <p>No notifications yet!</p>;
  }
  return (
    <div>
      {notifications.map((n, idx) => (
        <div key={idx}>
          <p>
            {n.from.username} {n.type}ed your {n.resourceType.toLowerCase()}
          </p>
          <p>{new Date(n.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
