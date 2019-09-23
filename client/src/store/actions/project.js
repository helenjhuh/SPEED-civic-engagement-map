import { RSAA } from "redux-api-middleware";
import { PROJECT } from "../types";

export const actions = { add, byUser, browse };

// This should return any projects owned by a given user
export function byUser(payload) {
  const { id } = payload;

  return {
    [RSAA]: {
      endpoint: `/api/projects/by-user/${id}`,
      method: "GET",
      types: [
        PROJECT.BY_USER_REQUEST,
        PROJECT.BY_USER_SUCCESS,
        PROJECT.BY_USER_FAILURE
      ]
    }
  };
}

export function add(payload) {
  const {
    name,
    description,
    type,
    website,
    street1,
    street2,
    city,
    region,
    zip,
    lat,
    lng,
    country,
    owner
  } = payload;
  return {
    [RSAA]: {
      endpoint: `/api/projects/add-with-address`,
      headers: { "Content-Type": "application/json" },
      method: "POST",
      types: [PROJECT.ADD_REQUEST, PROJECT.ADD_SUCCESS, PROJECT.ADD_FAILURE],
      body: JSON.stringify({
        name,
        description,
        type,
        website,
        street1,
        street2,
        city,
        region,
        zip,
        lat,
        lng,
        country,
        owner
      })
    }
  };
}

export function browse(payload) {
  return {
    [RSAA]: {
      endpoint: `/api/projects`,
      method: "GET",
      types: [
        PROJECT.BROWSE_REQUEST,
        PROJECT.BROWSE_SUCCESS,
        PROJECT.BROWSE_FAILURE
      ]
    }
  };
}
