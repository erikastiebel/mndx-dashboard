import { SHARED_FACEBOOK } from "../actions/actions";

export default function sharedFacebookReducer( state = [], action ) {
  switch (action.type) {
  case SHARED_FACEBOOK:
    return action.sharedFacebookData;
  default:
    return state;
  }
}
