import { SHARED_EMAILS } from "../actions/actions";

export default function sharedEmailsReducer( state = [], action ) {
  switch (action.type) {
  case SHARED_EMAILS:
    return action.sharedEmailsData;
  default:
    return state;
  }
}
