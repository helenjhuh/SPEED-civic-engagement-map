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
      return { ...state, isLoading: true };
    case AUTH.LOGIN_SUCCESS:
      return { ...state, isLoading: false, isLoggedIn: true };
    case AUTH.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload.message };
    case AUTH.SIGNUP_REQUEST:
      return { ...state, isLoading: true };
    case AUTH.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, isLoggedIn: true };
    case AUTH.SIGNUP_FAILURE:
      return { ...state, isLoading: false, error: action.payload.message };
    case AUTH.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
