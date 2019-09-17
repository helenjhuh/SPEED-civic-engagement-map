import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { apiMiddleware } from "redux-api-middleware";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  auth: {
    token,
    loggedInAs: JSON.parse(user),
    isLoggedIn: token && user ? true : false
  },
  project: {}
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, apiMiddleware, logger)
);

store.subscribe(() => {
  const state = store.getState();
  const token = state.auth.token;
  const user = state.auth.user;
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
});

export default store;
