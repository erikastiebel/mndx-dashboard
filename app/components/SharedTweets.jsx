import React from "react";
import {getSharedTweets} from "../actions/actions";
import {getToday} from "../actions/actions";
import {connect} from "react-redux";

const classNames = require("classnames");

function tweetsTotal(object) {
  let result = 0;
  if (object.values !== undefined) {
    const twitterObj = object.values.undefined;
    for (const i in twitterObj) {
      if (twitterObj) {
        result += parseInt(twitterObj[i], 10);
      }
    }
    return result;
  }
  return "-";
}

function tweetsToday(object) {
  let result = 0;
  const today = getToday();
  if (object.values !== undefined) {
    const twitterObj = object.values.undefined;
    for (const i in twitterObj) {
      if (twitterObj) {
        if (i === today) {
          result = twitterObj[i];
        }
      }
    }
    return result;
  }
  return "-";
}

class SharedTweets extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    sharedTweetsData: React.PropTypes.object
  }
  componentDidMount() {
    this.props.dispatch(getSharedTweets());
    this.interval = setInterval(() => {
      this.props.dispatch(getSharedTweets());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const todayNumClass = classNames({
      "shared-num": true,
      "shared-num-blue": tweetsToday(this.props.sharedTweetsData),
      "shared-num-grey": !tweetsToday(this.props.sharedTweetsData)
    });

    return (
      <div className="shared-column">
        <span className="fa fa-twitter"></span>
        <div className="shared-inner">
          <span className={todayNumClass}>{ tweetsToday(this.props.sharedTweetsData) }</span>
          <span className="shared-txt">Today</span>
        </div>
        <div className="shared-inner">
          <span className="shared-num">{ tweetsTotal(this.props.sharedTweetsData) }</span>
          <span className="shared-txt">Total</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sharedTweetsData: state.sharedTweetsData
  };
}

export default connect(mapStateToProps)(SharedTweets);
