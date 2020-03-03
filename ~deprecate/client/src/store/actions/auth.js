import { RSAA } from "redux-api-middleware";
import { AUTH } from "../types";

export const actions = { login, signup, logout, clearErrors };

const headers = { "Content-Type": "application/json" };

export function login(payload) {
  const { email, password } = payload;
  return {
    [RSAA]: {
      endpoint: `/api/auth/login`,
      headers,
      method: "POST",
      types: [AUTH.LOGIN_REQUEST, AUTH.LOGIN_SUCCESS, AUTH.LOGIN_FAILURE],
      body: JSON.stringify({ email, password })
    }
  };
}

export function signup(payload) {
  const { first, last, email, college, password } = payload;
  return {
    [RSAA]: {
      endpoint: `/api/auth/signup`,
      headers,
      method: "POST",
      types: [AUTH.SIGNUP_REQUEST, AUTH.SIGNUP_SUCCESS, AUTH.SIGNUP_FAILURE],
      body: JSON.stringify({ first, last, email, college, password })
    }
  };
}

export function clearErrors() {
  return {
    type: AUTH.CLEAR_ERRORS
  };
}

export function logout() {
  localStorage.removeItem("user");
  return {
    type: AUTH.LOGOUT
  };
}
