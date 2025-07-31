import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications, markAsReadAPI } from "../services/api";
import { useUser } from "./UserContext";
import socket from "../socket.js";
import { toast } from "react-hot-toast";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
      setLoading(true);
      await markAsReadAPI(id);
      // only update notification that changed isRead state - else keep notifications the same
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      // update count after this notification was read
      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      console.error("Error marking notification as read", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchNotifications();
      socket.emit("register", user._id);
    }
  }, [user]);

  useEffect(() => {
    socket.on("new_notification", (notification) => {
      if (typeof notification.isRead === "undefined") {
        notification.isRead = false;
      }
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      const action =
        notification.type === "upvote"
          ? "upvoted"
          : notification.type === "downvote"
            ? "downvoted"
            : notification.type === "answer"
              ? "answered"
              : notification.type === "approve"
                ? "approved"
                : "interacted with";

      const target =
        notification.type === "answer"
          ? "your question"
          : notification.resourceType === "Answer"
            ? "your answer"
            : notification.resourceType === "Question"
              ? "your question"
              : "your post";

      toast(`${notification.from?.username || "Someone"} ${action} ${target}`, {
        icon: "🔔",
      });
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  const value = {
    notifications,
    unreadCount,
    fetchNotifications,
    markNotificationAsRead,
    loading,
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
