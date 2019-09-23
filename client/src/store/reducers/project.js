import { PROJECT } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  added: "", // holds the added project
  byUser: "",
  browsing: "" // holds the projects that the user is currently viewing, or in other words, that the client currently has access to
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT.ADD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case PROJECT.ADD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        added: action.payload.data.project
      };

    case PROJECT.ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    case PROJECT.BY_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case PROJECT.BY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        byUser: action.payload.data.projects
      };

    case PROJECT.BY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        byUser: "",
        error: action.payload.message
      };

    case PROJECT.BROWSE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case PROJECT.BROWSE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        browsing: action.payload.data.projects
      };

    case PROJECT.BROWSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    default:
      return state;
  }
}
