import { RSAA } from "redux-api-middleware";
import { AUTH } from "../types";
import { API_BASE_URL } from "../../defs";

export const actions = { login, signup, logout };

export function login(payload) {
  const { email, password } = payload;
  return {
    [RSAA]: {
      endpoint: `${API_BASE_URL}/auth/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      types: [AUTH.LOGIN_REQUEST, AUTH.LOGIN_SUCCESS, AUTH.LOGIN_FAILURE],
      body: JSON.stringify({ email, password })
    }
  };
}

export function signup(payload) {
  const { first, last, email, college, password } = payload;
  return {
    [RSAA]: {
      endpoint: `${API_BASE_URL}/auth/signup`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      types: [AUTH.SIGNUP_REQUEST, AUTH.SIGNUP_SUCCESS, AUTH.SIGNUP_FAILURE],
      body: JSON.stringify({ first, last, email, college, password })
    }
  };
}

export function logout() {
  return {
    type: AUTH.LOGOUT
  };
}
