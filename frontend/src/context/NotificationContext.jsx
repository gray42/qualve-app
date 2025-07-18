import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications, markAsReadAPI } from "../services/api";
const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const { notifications } = await getNotifications();
      setNotifications(notifications);
      setUnreadCount(notifications.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await markAsReadAPI(id);
      // only update notification that changed isRead state - else keep notifications the same
      setNotifications((prev) => {
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n));
      });
      // update count after this notification was read
      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // notification polling
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications,
    unreadCount,
    fetchNotifications,
    markNotificationAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
