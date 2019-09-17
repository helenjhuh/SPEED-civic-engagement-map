import { RSAA } from "redux-api-middleware";
import { PROJECT } from "../types";

export const actions = { add };

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
    country
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
        country
      })
    }
  };
}
