import { NOTIFIED_TO_PUBLISHED } from "../actions/actions";

export default function notifiedToPublishedReducer(state = [], action) {
  switch (action.type) {
  case NOTIFIED_TO_PUBLISHED:
    return action.notifiedToPublishedData;
  default:
    return state;
  }
}
