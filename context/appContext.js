import React, { useReducer, useContext, useEffect, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import { BASE_URL } from "../util/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  // GET_LIVESTREAM_BEGIN,
  // GET_LIVESTREAM_SUCCESS,
  GET_ANNOUNCEMENTS_BEGIN,
  GET_ANNOUNCEMENTS_SUCCESS,
  GET_EVENT_BEGIN,
  GET_EVENT_SUCCESS,
  GET_FORMS_BEGIN,
  GET_FORMS_SUCCESS,
  GET_SAVEDPRAYER_BEGIN,
  GET_SAVEDPRAYER_SUCCESS,
  GET_PRAYERCATEGORY_BEGIN,
  GET_PRAYERCATEGORY_SUCCESS,
  GET_TESTIMONYCATEGORY_BEGIN,
  GET_TESTIMONYCATEGORY_SUCCESS,
  CREATE_PRAYER_BEGIN,
  CREATE_PRAYER_SUCCESS,
  CREATE_PRAYER_ERROR,
  CREATE_TESTIMONY_BEGIN,
  CREATE_TESTIMONY_SUCCESS,
  CREATE_TESTIMONY_ERROR,
  CREATE_FORM_BEGIN,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_ERROR,
  GET_LEARNING_BEGIN,
  GET_LEARNING_SUCCESS,
  GET_VOLUNTEER_BEGIN,
  GET_VOLUNTEER_SUCCESS,
  ENROLL_COURSE_BEGIN,
  ENROLL_COURSE_SUCCESS,
  CHECK_ENROLLMENT_BEGIN,
  CHECK_ENROLLMENT_SUCCESS,
  GET_ENROLLEDCOURSES_BEGIN,
  GET_ENROLLEDCOURSES_SUCCESS,
  EDIT_MEMBER_BEGIN,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  UPDATE_USERPASSWORD_BEGIN,
  UPDATE_USERPASSWORD_SUCCESS,
  UPDATE_USERPASSWORD_ERROR,
  GET_GROWTHPLANNER_BEGIN,
  GET_GROWTHPLANNER_SUCCESS,
  CREATE_GROWTHPLANNER_BEGIN,
  CREATE_GROWTHPLANNER_SUCCESS,
  CREATE_GROWTHPLANNER_ERROR,
} from "./actions";

const initialState = {
  userLoading: true,
  user: null,
  token: null,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //livestreamLoading: false,
  videoId: "",
  videoStatus: "",
  videoTitle: "",
  videoDescription: "",
  videoData: "",
  announcements: [],
  events: [],
  totalEvents: 0,
  formsData: [],
  totalForms: 0,
  growthplannerdata: [],
  prayers: [],
  totalPrayers: 0,
  prayerCategory: [],
  testimonyCategory: [],
  prayerStatus: "",
  testimonyStatus: "",
  formStatus: "",
  volunteer: [],
  learning: [],
  enrollmentData: {},
  enrolledcourses: [],
  userResponse: null,
  passwordUpdateStatus: null,
  growthPlannerStatus: null,
};

const AppContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storageToken, setStorageToken] = useState("");

  useEffect(() => {
    async function loadAuthToken() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token === null) {
          setIsAuthenticated(false);
          setStorageToken(token);
        } else {
          console.log("token 2", token);
          setIsAuthenticated(true);
          setStorageToken(token);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
      //await SplashScreen.hideAsync();
    }

    loadAuthToken();
  }, []);

  const authFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authFetch.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: BASE_URL + endPoint,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: currentUser,
      };

      console.log("Sending request with config:", config);

      const response = await axios.request(config);

      console.log("Response received:", response);

      const { user, token, mfaRequired, mfaEmail } = response.data;

      const userData = {
        mid: user._id,
        mfirstName: user.mfirstName,
        mlastName: user.mlastName,
        memail: user.memail,
        mphone: user.mmobilephone,
        maddress: user.maddress,
        mcity: user.mcity,
        mstate: user.mstate,
        mgender: user.mgender,
        mpostalCode: user.mpostalCode,
        churchName: user.churchName,
        churchDomain: user.churchDomain,
        token: user.notificationToken,
        mphoto: user.mProfilePicture?.Location,
        isAuthenticated: true,
      };

      if (token) {
        try {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("userData", JSON.stringify(userData));
        } catch (e) {
          console.log(
            "Failed to save the token and user data to AsyncStorage:",
            e
          );
        }
      }

      if (mfaRequired && mfaEmail) {
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: { mfaRequired: true, mfaEmail, alertText },
        });
      } else {
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: { user: userData, token, alertText },
        });
      }

      return response.data; // Return the response data for further handling
    } catch (error) {
      console.error("Error during user setup:", error);
      let errorMessage = "There was an error setting up the user.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: errorMessage,
        },
      });
      throw error; // Rethrow the error to be caught by the caller
    } finally {
      clearAlert();
    }
  };

  const updatePassword = async (userPassword) => {
    dispatch({ type: UPDATE_USERPASSWORD_BEGIN });

    try {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: BASE_URL + "/auth/updatepassword",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: userPassword,
      };

      const response = await axios.request(config);

      const passwordUpdateStatus =
        response.status === 200 ? "success" : "error";
      const { user, token } = response.data;

      dispatch({
        type: UPDATE_USERPASSWORD_SUCCESS,
        payload: { user, token, passwordUpdateStatus },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: UPDATE_USERPASSWORD_ERROR,
        payload: { msg: error.response?.data?.msg || error.message },
      });
    } finally {
      // clearAlert(); // Uncomment if you have a clearAlert function to reset alerts
    }
  };

  const updateUser = async (formData, mid) => {
    dispatch({ type: EDIT_MEMBER_BEGIN });
    try {
      const response = await authFetch.patch(`/user/${mid}`, formData);

      dispatch({
        type: EDIT_MEMBER_SUCCESS,
        payload: { userResponse: response.status },
      });
      dispatch({ type: CLEAR_VALUES });
      // getMemberById(_id);
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: EDIT_MEMBER_ERROR,
        payload: { msg: error?.response?.data?.msg },
      });
    }
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userData");
      // Optionally, you can use a reducer to handle the state update
      dispatch({ type: LOGOUT_USER });

      // Update application state to reflect the user is no longer authenticated
      setIsAuthenticated(false);
      // Optionally, you can use a reducer to handle the state update
      // dispatch({ type: "LOGOUT_USER" });
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle additional cleanup or error messaging as needed
    }
  };

  const getAnnouncement = async () => {
    try {
      dispatch({ type: GET_ANNOUNCEMENTS_BEGIN });

      const { data } = await authFetch.get(`/announcement`);
      // console.log(data, "data");
      dispatch({
        type: GET_ANNOUNCEMENTS_SUCCESS,
        payload: {
          announcements: data,
        },
      });
    } catch (error) {
      console.error("Error fetching announcement info:", error);
    }
    clearAlert();
  };

  const getLearning = async () => {
    try {
      dispatch({ type: GET_LEARNING_BEGIN });
      const { data } = await authFetch.get(`/learning`);
      // console.log(data, "data");
      dispatch({
        type: GET_LEARNING_SUCCESS,
        payload: {
          learning: data,
        },
      });
    } catch (error) {
      console.error("Error fetching learning:", error);
    } finally {
      clearAlert();
    }
  };

  const enrollForCourse = async (data) => {
    dispatch({ type: ENROLL_COURSE_BEGIN });
    try {
      const response = await authFetch.post("/learning", data);
      // console.log(response.status, "response");
      const enrollCourseStatus = response.status;
      dispatch({ type: ENROLL_COURSE_SUCCESS, payload: enrollCourseStatus });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_FORM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const checkEnrollment = async (courseId) => {
    try {
      dispatch({ type: CHECK_ENROLLMENT_BEGIN });
      const response = await authFetch.get(`/learning/enrollment/${courseId}`);
      // console.log(data, "daffta");

      dispatch({
        type: CHECK_ENROLLMENT_SUCCESS,
        payload: {
          enrollmentData: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching learning:", error);
    } finally {
      clearAlert();
    }
  };

  const getEnrolledCourses = async () => {
    try {
      dispatch({ type: GET_ENROLLEDCOURSES_BEGIN });
      const { data } = await authFetch.get(`/learning/enrolled`);

      dispatch({
        type: GET_ENROLLEDCOURSES_SUCCESS,
        payload: {
          enrolledcourses: data,
        },
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      // Handle the error (e.g., show a notification, log out the user)
      // logoutUser();
      //dispatch({ type: GET_EVENT_ERROR, payload: { error: error.message } });
    } finally {
      clearAlert();
    }
  };

  const getVolunteeer = async () => {
    try {
      dispatch({ type: GET_VOLUNTEER_BEGIN });
      const { data } = await authFetch.get(`/volunteer`);

      dispatch({
        type: GET_VOLUNTEER_SUCCESS,
        payload: {
          volunteer: data,
        },
      });
    } catch (error) {
      console.error("Error fetching volunteer:", error);
    } finally {
      clearAlert();
    }
  };

  const getEvents = async () => {
    try {
      dispatch({ type: GET_EVENT_BEGIN });
      const { data } = await authFetch.get(`/event`);

      dispatch({
        type: GET_EVENT_SUCCESS,
        payload: {
          events: data,
          totalEvents: data,
        },
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      clearAlert();
    }
  };

  const submitUserForm = async (data) => {
    dispatch({ type: CREATE_FORM_BEGIN });
    try {
      const response = await authFetch.post("/forms", data);
      // console.log(response.status, "response");
      const formStatus = response.status;
      dispatch({ type: CREATE_FORM_SUCCESS, payload: formStatus });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_FORM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getForm = async () => {
    try {
      dispatch({ type: GET_FORMS_BEGIN });
      const { data } = await authFetch("/forms");

      dispatch({
        type: GET_FORMS_SUCCESS,
        payload: {
          formsData: data,
          totalForms: data,
        },
      });
    } catch (error) {}
    clearAlert();
  };

  const getPrayerRequest = async () => {
    dispatch({ type: GET_SAVEDPRAYER_BEGIN });
    try {
      const { data } = await authFetch(`/prayers`);

      dispatch({
        type: GET_SAVEDPRAYER_SUCCESS,
        payload: {
          prayers: data?.prayers,
          totalPrayers: data?.totalPrayers,
        },
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    clearAlert();
  };

  const getCategoryPrayer = async () => {
    dispatch({ type: GET_PRAYERCATEGORY_BEGIN });
    try {
      const { data } = await authFetch(`/prayer/category`);

      dispatch({
        type: GET_PRAYERCATEGORY_SUCCESS,
        payload: {
          prayerCategory: data.categories,
        },
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    clearAlert();
  };

  const getCategoryTestimony = async () => {
    dispatch({ type: GET_TESTIMONYCATEGORY_BEGIN });
    try {
      const { data } = await authFetch(`/testimony/category`);

      dispatch({
        type: GET_TESTIMONYCATEGORY_SUCCESS,
        payload: {
          testimonyCategory: data.categories,
        },
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    clearAlert();
  };

  const postPrayerRequest = async (data) => {
    dispatch({ type: CREATE_PRAYER_BEGIN });
    try {
      const response = await authFetch.post("/prayer", data);
      // console.log(response.status, "response");
      const prayerStatus = response.status;
      dispatch({ type: CREATE_PRAYER_SUCCESS, payload: prayerStatus });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_PRAYER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const postTestimonyRequest = async (data) => {
    dispatch({ type: CREATE_TESTIMONY_BEGIN });
    try {
      const response = await authFetch.post("/testimony", data);
      // console.log(response.status, "response");
      const testimonyStatus = response.status;
      dispatch({ type: CREATE_TESTIMONY_SUCCESS, payload: testimonyStatus });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_TESTIMONY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getGrowthPlanner = async () => {
    try {
      dispatch({ type: GET_GROWTHPLANNER_BEGIN });
      const { data } = await authFetch("/learning/growthplanner");

      dispatch({
        type: GET_GROWTHPLANNER_SUCCESS,
        payload: {
          growthplannerdata: data,
        },
      });
    } catch (error) {}
    clearAlert();
  };

  const submitGrowthPlanner = async (data) => {
    dispatch({ type: CREATE_GROWTHPLANNER_BEGIN });
    try {
      const response = await authFetch.post("/learning/growthplanner", data);
      // console.log(response.status, "response");
      const growthPlannerStatus = response.status;
      dispatch({
        type: CREATE_GROWTHPLANNER_SUCCESS,
        payload: growthPlannerStatus,
      });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_GROWTHPLANNER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        setupUser,
        updateUser,
        logout,
        displayAlert,
        clearAlert,
        //getStream,
        isAuthenticated,
        setIsAuthenticated,
        storageToken,
        getAnnouncement,
        getEvents,
        getForm,
        getPrayerRequest,
        getCategoryTestimony,
        getCategoryPrayer,
        postPrayerRequest,
        postTestimonyRequest,
        submitUserForm,
        getLearning,
        getVolunteeer,
        enrollForCourse,
        checkEnrollment,
        getEnrolledCourses,
        updatePassword,
        getGrowthPlanner,
        submitGrowthPlanner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
