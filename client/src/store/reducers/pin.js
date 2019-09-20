import { PIN } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  added: "" // holds the added pin
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PIN.ADD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case PIN.ADD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        added: action.payload.data.pin
      };
    case PIN.ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
