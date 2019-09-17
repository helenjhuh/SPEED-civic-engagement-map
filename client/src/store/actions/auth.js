import { RSAA } from "redux-api-middleware";
import { AUTH } from "../types";

export const actions = { login, signup, logout };

export function login(payload) {
  const { email, password } = payload;
  return {
    [RSAA]: {
      endpoint: `/api/auth/login`,
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      method: "POST",
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
