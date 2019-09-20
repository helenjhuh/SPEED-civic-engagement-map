import { PROJECT } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  added: "", // holds the added project
  byUser: ""
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
    default:
      return state;
  }
}
