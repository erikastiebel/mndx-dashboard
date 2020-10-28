import React from "react";
import SharedEmails from "./SharedEmails";
import SharedTweets from "./SharedTweets";
import SharedFacebook from "./SharedFacebook";

export default class Shared extends React.Component {

  render() {
    return (
      <div className="module-container shared">
        <div className="module-wrapper">
          <h2><span className="fa fa-share"></span>  Shared</h2>
          <div className="flex-wrapper">
            <SharedEmails />
            <SharedTweets />
            <SharedFacebook />
          </div>
        </div>
      </div>
    );
  }
}
