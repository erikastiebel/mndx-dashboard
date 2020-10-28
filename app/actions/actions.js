export const INVITED = "INVITED";
export const BRAND_NAMES = "BRAND_NAMES";
export const PUBLISHED_STORY = "PUBLISHED_STORY";
export const NOTIFIED_TO_PUBLISHED = "NOTIFIED_TO_PUBLISHED";
export const PUBLISHED_TO_PUBLISHED = "PUBLISHED_TO_PUBLISHED";
export const SHARED_EMAILS = "SHARED_EMAILS";
export const SHARED_TWEET = "SHARED_TWEET";
export const SHARED_FACEBOOK = "SHARED_FACEBOOK";
export const STORY_TITLE = "STORY_TITLE";

import request from "superagent";
import moment from "moment";

const eventName = {
  OrganizationCreated: "Organization Created",
  PublishedStory: "Published Story",
  RegisterInterest: "Register Interest",
  NotificationSent: "Notification Sent",
  SharedEmails: "Shared Email",
  SharedTweet: "Shared Tweet",
  SharedFacebook: "Shared FacebookPost"
};

const propertyName = {
  OrganizationName: "organization_name",
  NumberOfEmails: "number_of_emails",
  StoryTitle: "story_title"
};

const funnelId = {
  NotifiedPublishedId: "1626571",
  PublishedPublishedId: "1687725"
};

const account = {
  from_launch_date: "2016-03-09",
  from_date: moment().subtract(30, "days").format("YYYY-MM-DD"),
  to_date: moment().format("YYYY-MM-DD"),
  yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
  lastWeek: moment().subtract(7, "days").format("YYYY-MM-DD"),
  sixDaysAgo: moment().subtract(6, "days").format("YYYY-MM-DD"),
  eightDaysAgo: moment().subtract(8, "days").format("YYYY-MM-DD"),
  fifteenDaysAgo: moment().subtract(15, "days").format("YYYY-MM-DD")
};

const query = {
  segmentation: "/api/mixpanel/segmentation",
  funnels: "/api/mixpanel/2.0/funnels",
  engage: "/api/mixpanel/2.0/engage"
};

export function getBrandNames() {
  return function(dispatch) {
    request.get(query.segmentation +
      "?from_date=" + account.from_launch_date +
      "&to_date=" + account.to_date +
      "&event_name=" + eventName.OrganizationCreated +
      "&property_name=" + propertyName.OrganizationName)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: BRAND_NAMES,
          brandNamesData: res.body.data.values
        });
      }
    });
  };
}

export function getPublishedStories() {
  return function(dispatch) {
    request.get(query.segmentation +
    "?from_date=" + account.from_launch_date +
    "&to_date=" + account.to_date +
    "&event_name=" + eventName.PublishedStory)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: PUBLISHED_STORY,
          publishedStoryData: res.body.data
        });
      }
    });
  };
}

export function getStoryTitles() {
  return function(dispatch) {
    request.get(query.segmentation +
      "?from_date=" + account.from_launch_date +
      "&to_date=" + account.to_date +
      "&event_name=" + eventName.PublishedStory +
      "&property_name=" + propertyName.StoryTitle)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: STORY_TITLE,
          storyTitlesData: res.body.data.values
        });
      }
    });
  };
}

export function getNotifiedToPublishedFunnel() {
  return function(dispatch) {
    request.get(query.funnels +
    "?funnel_id=" + funnelId.NotifiedPublishedId)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: NOTIFIED_TO_PUBLISHED,
          notifiedToPublishedData: res.body.data
        });
      }
    });
  };
}

export function getPublishedToPublishedFunnel() {
  return function(dispatch) {
    request.get(query.funnels +
    "?funnel_id=" + funnelId.PublishedPublishedId)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: PUBLISHED_TO_PUBLISHED,
          publishedToPublishedData: res.body.data
        });
      }
    });
  };
}

export function getInvited() {
  return function(dispatch) {
    request.get(query.engage)
    .end((err, res) =>{
      if (res.body.results) {
        dispatch({
          type: INVITED,
          invitedData: res.body.results
        });
      }
    });
  };
}

export function getSharedEmails() {
  return function(dispatch) {
    request.get(query.segmentation +
    "?from_date=" + account.from_launch_date +
    "&to_date=" + account.to_date +
    "&event_name=" + eventName.SharedEmails +
    "&property_name=" + propertyName.NumberOfEmails)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: SHARED_EMAILS,
          sharedEmailsData: res.body.data.values
        });
      }
    });
  };
}

export function getSharedTweets() {
  return function(dispatch) {
    request.get(query.segmentation +
    "?from_date=" + account.from_launch_date +
    "&to_date=" + account.to_date +
    "&event_name=" + eventName.SharedTweet)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: SHARED_TWEET,
          sharedTweetsData: res.body.data
        });
      }
    });
  };
}

export function getSharedFacebook() {
  return function(dispatch) {
    request.get(query.segmentation +
    "?from_date=" + account.from_launch_date +
    "&to_date=" + account.to_date +
    "&event_name=" + eventName.SharedFacebook)
    .end((err, res) =>{
      if (res.body.data) {
        dispatch({
          type: SHARED_FACEBOOK,
          sharedFacebookData: res.body.data
        });
      }
    });
  };
}

export function today() {
  return new Date(account.to_date);
}

export function yesterday() {
  return new Date(account.yesterday);
}

export function getFromDate() {
  return account.from_date;
}

export function getToday() {
  return account.to_date;
}

export function getSevenDaysAgo() {
  return account.lastWeek;
}
export function getLastWeek() {
  return new Date(account.lastWeek);
}

export function getSixDaysAgo() {
  return new Date(account.sixDaysAgo);
}

export function getEightDaysAgo() {
  return new Date(account.eightDaysAgo);
}

export function getFifteenDaysAgo() {
  return new Date(account.fifteenDaysAgo);
}
