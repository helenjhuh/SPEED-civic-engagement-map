import { AUTH } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  loggedInAs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        loggedInAs: null,
        isLoggedIn: false
      };
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loggedInAs: action.payload.data.user
      };
    case AUTH.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload.message };
    case AUTH.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        loggedInAs: null,
        isLoggedIn: false
      };
    case AUTH.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loggedInAs: action.payload.data.user
      };
    case AUTH.SIGNUP_FAILURE:
      return { ...state, isLoading: false, error: action.payload.message };
    case AUTH.LOGOUT:
      return initialState;
    case AUTH.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
}
