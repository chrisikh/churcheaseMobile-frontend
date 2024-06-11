import React, { useEffect } from "react";
import { sendPushNotification } from "./sendPushNotification";
import { BASE_URL } from "./auth";
import axios from "axios";

const NotificationPage = () => {
  const authFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await authFetch(
          "/notification/get-scheduled-notifications"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "success") {
          data.results.forEach(async ({ token, message }) => {
            try {
              await sendPushNotification(token, message);
              console.log(`Notification sent to ${token}`);
            } catch (error) {
              console.log("Error sending push notification:", error);
            }
          });
        } else {
          console.log("Error fetching notification data:", data.message);
        }
      } catch (error) {
        console.log("Error in fetchNotificationData:", error);
      }
    };

    fetchNotificationData();
  }, []);
  return (
    <div>
      <h1>Notification Page</h1>
      <p>Notifications are being processed...</p>
    </div>
  );
};

export default NotificationPage;
