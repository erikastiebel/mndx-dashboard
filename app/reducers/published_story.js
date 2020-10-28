import { PUBLISHED_STORY } from "../actions/actions";

export default function publishedStoryReducer( state = [], action ) {
  switch (action.type) {
  case PUBLISHED_STORY:
    return action.publishedStoryData;
  default:
    return state;
  }
}
