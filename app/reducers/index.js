import { combineReducers } from "redux";
import brandNamesData from "./brand_names";
import publishedStoryData from "./published_story";
import invitedData from "./invited";
import notifiedToPublishedData from "./notified_to_published";
import publishedToPublishedData from "./published_to_published";
import sharedEmailsData from "./shared_emails";
import sharedTweetsData from "./shared_tweet";
import sharedFacebookData from "./shared_facebook";
import storyTitlesData from "./story_titles";

const rootReducer = combineReducers({
  brandNamesData,
  publishedStoryData,
  notifiedToPublishedData,
  invitedData,
  publishedToPublishedData,
  sharedEmailsData,
  sharedTweetsData,
  sharedFacebookData,
  storyTitlesData
});

export default rootReducer;
