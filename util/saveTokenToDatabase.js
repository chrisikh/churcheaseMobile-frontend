import axios from "axios";
import { BASE_URL } from "@/util/auth";
import { logoutUser } from "@/context/appContext";

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
    if (error.response?.status != 200) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

const saveTokenToDatabase = async (token, navigation) => {
  console.log("Saving token to database...saveTokenToDatabasenow", token);
  try {
    // console.log("Saving token to database...saveTokenToDatabase", token);
    const response = await authFetch.patch(`notification/save-token/${token}`);
  } catch (error) {
    console.log("Failed to save token to database:", error);
    navigation.navigate("Splash");
  }
};

export default saveTokenToDatabase;
