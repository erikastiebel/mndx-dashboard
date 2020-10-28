import { STORY_TITLE } from "../actions/actions";

export default function storyTitlesReducer( state = [], action ) {
  switch (action.type) {
  case STORY_TITLE:
    return action.storyTitlesData;
  default:
    return state;
  }
}
