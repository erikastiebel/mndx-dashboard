import { BRAND_NAMES } from "../actions/actions";

export default function brandNamesReducer( state = [], action ) {
  switch (action.type) {
  case BRAND_NAMES:
    return action.brandNamesData;
  default:
    return state;
  }
}
