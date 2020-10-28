import { INVITED } from "../actions/actions";

export default function notificationSentReducer( state = [], action ) {
  switch (action.type) {
  case INVITED:
    return action.invitedData;
  default:
    return state;
  }
}
