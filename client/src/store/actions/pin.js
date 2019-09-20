import { RSAA } from "redux-api-middleware";
import { PIN } from "../types";

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
      endpoint: `/api/pins/add`,
      headers: { "Content-Type": "application/json" },
      method: "POST",
      types: [PIN.ADD_REQUEST, PIN.ADD_SUCCESS, PIN.ADD_FAILURE],
      body: JSON.stringify({
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
