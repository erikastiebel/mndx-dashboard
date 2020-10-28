import { PUBLISHED_TO_PUBLISHED } from "../actions/actions";

export default function publishedToPublishedReducer(state = [], action) {
  switch (action.type) {
  case PUBLISHED_TO_PUBLISHED:
    return action.publishedToPublishedData;
  default:
    return state;
  }
}
