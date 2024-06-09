import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  GET_LIVESTREAM_BEGIN,
  GET_LIVESTREAM_SUCCESS,
  GET_ANNOUNCEMENTS_BEGIN,
  GET_ANNOUNCEMENTS_SUCCESS,
  GET_EVENT_BEGIN,
  GET_EVENT_SUCCESS,
  GET_FORMS_BEGIN,
  GET_FORMS_SUCCESS,
  GET_PRAYERCATEGORY_BEGIN,
  GET_PRAYERCATEGORY_SUCCESS,
  GET_TESTIMONYCATEGORY_BEGIN,
  GET_TESTIMONYCATEGORY_SUCCESS,
  GET_SAVEDPRAYER_BEGIN,
  GET_SAVEDPRAYER_SUCCESS,
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

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please complete all of the fields before proceeding",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      memberLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
      token: action.payload.token,
      mfaRequired: action.payload.mfaRequired,
      mfaEmail: action.payload.mfaEmail,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isError: true,
    };
  }

  if (action.type === EDIT_MEMBER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_MEMBER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "member Updated!",
      userResponse: action.payload.userResponse,
    };
  }
  if (action.type === EDIT_MEMBER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      userLoading: false,
      user: null,
      token: null,
    };
  }

  if (action.type === GET_LIVESTREAM_BEGIN) {
    return {
      ...state,
      livestreamLoading: true,
    };
  }

  if (action.type === GET_LIVESTREAM_SUCCESS) {
    return {
      ...state,
      livestreamLoading: false,
      videoId: action?.payload?.videoId,
      videoStatus: action?.payload?.videoStatus,
      videoTitle: action?.payload?.videoTitle,
      videoDescription: action?.payload?.videoDescription,
      videoData: action?.payload.videoData,
    };
  }

  if (action.type === GET_ANNOUNCEMENTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_ANNOUNCEMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      announcements: action.payload.announcements,
    };
  }

  if (action.type === GET_EVENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_EVENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      events: action?.payload?.events,
      totalEvents: action?.payload?.totalEvents,
    };
  }

  if (action.type === GET_FORMS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_FORMS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      formsData: action?.payload?.formsData,
      totalForms: action?.payload?.totalForms,
    };
  }

  if (action.type === GET_SAVEDPRAYER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_SAVEDPRAYER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      prayers: action.payload.prayers,
      totalPrayers: action.payload.totalPrayers,
    };
  }

  if (action.type === GET_PRAYERCATEGORY_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_PRAYERCATEGORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      prayerCategory: action.payload.prayerCategory,
    };
  }

  if (action.type === GET_TESTIMONYCATEGORY_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_TESTIMONYCATEGORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      testimonyCategory: action.payload.testimonyCategory,
    };
  }

  if (action.type === CREATE_PRAYER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PRAYER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      prayerStatus: action.payload.prayerStatus,
    };
  }
  if (action.type === CREATE_PRAYER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === CREATE_TESTIMONY_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_TESTIMONY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      testimonyStatus: action.payload.testimonyStatus,
    };
  }
  if (action.type === CREATE_TESTIMONY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === CREATE_FORM_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_FORM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      formStatus: action.payload.formStatus,
    };
  }
  if (action.type === CREATE_FORM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === GET_LEARNING_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_LEARNING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      learning: action?.payload?.learning,
    };
  }

  if (action.type === GET_VOLUNTEER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_VOLUNTEER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      volunteer: action?.payload?.volunteer,
    };
  }

  if (action.type === CHECK_ENROLLMENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === CHECK_ENROLLMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      enrollmentData: action.payload.enrollmentData,
    };
  }

  if (action.type === GET_ENROLLEDCOURSES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_ENROLLEDCOURSES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      enrolledcourses: action.payload.enrolledcourses,
    };
  }

  if (action.type === UPDATE_USERPASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USERPASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      passwordUpdateStatus: "success",
      showAlert: true,
      alertType: "success",
      alertText: "Password Successfully Updated!",
    };
  }

  if (action.type === UPDATE_USERPASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      errorMsg: action.payload.msg,
      alertText: "Please check your current password!",
    };
  }

  if (action.type === GET_GROWTHPLANNER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_GROWTHPLANNER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      growthplannerdata: action?.payload?.growthplannerdata,
    };
  }

  if (action.type === CREATE_GROWTHPLANNER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_GROWTHPLANNER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      growthPlannerStatus: action.payload.growthPlannerStatus,
    };
  }
  if (action.type === CREATE_GROWTHPLANNER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
