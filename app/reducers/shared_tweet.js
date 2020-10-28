import { SHARED_TWEET } from "../actions/actions";

export default function sharedEmailsReducer( state = [], action ) {
  switch (action.type) {
  case SHARED_TWEET:
    return action.sharedTweetsData;
  default:
    return state;
  }
}
