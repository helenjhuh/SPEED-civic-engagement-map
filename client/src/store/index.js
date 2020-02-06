import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { apiMiddleware } from "redux-api-middleware";

const user = localStorage.getItem("user");

const initialState = {
  auth: {
    loggedInAs: JSON.parse(user),
    isLoggedIn: user ? true : false
  },
  project: {},
  pin: {}
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, apiMiddleware)
);

store.subscribe(() => {
  const state = store.getState();
  const user = state.auth.loggedInAs;
  if (user) localStorage.setItem("user", JSON.stringify(user));
});

export default store;
