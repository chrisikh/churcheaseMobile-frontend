import axios from "axios";
import { BASE_URL } from "@/util/auth";

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

const saveTokenToDatabase = async (token) => {
  console.log("Saving token to database...saveTokenToDatabasenow", token);
  try {
    // console.log("Saving token to database...saveTokenToDatabase", token);
    const response = await authFetch.patch(`notification/save-token/${token}`);
  } catch (error) {
    console.error("Failed to save token to database:", error);
  }
};

export default saveTokenToDatabase;
