import React from "react";
import {getSharedEmails} from "../actions/actions";
import {getToday} from "../actions/actions";
import {connect} from "react-redux";

const classNames = require("classnames");

function emailsTotal(objectData) {
  if (objectData !== undefined) {
    let total = 0;
    const resultArray = [];
    let resultTimesSent = 0;
    for (const amountEmails in objectData) {
      const timesSentObj = objectData[amountEmails];
      for (const timeSent in timesSentObj) {
        parseInt(timesSentObj[timeSent], 10);
        if (timesSentObj[timeSent] !== 0) {
          resultTimesSent += timesSentObj[timeSent];
        }
      }
      const result = parseInt(amountEmails, 10) * parseInt(resultTimesSent, 10);
      resultArray.push(result);
      resultTimesSent = 0;
    }
    for (let i = 0; i < resultArray.length; i++) {
      total += resultArray[i];
    }
    return total;
  }
}

function emailsToday(objectData) {
  if (objectData !== undefined) {
    let total = 0;
    let resultTimesSent = 0;
    const resultArray = [];
    for (const amountEmails in objectData) {
      const timesSentObj = objectData[amountEmails];
      for (const timeSent in timesSentObj) {
        if (timeSent === getToday()) {
          parseInt(timesSentObj[timeSent], 10);
          if (timesSentObj[timeSent] !== 0) {
            resultTimesSent += timesSentObj[timeSent];
          }
        }
      }
      const result = parseInt(amountEmails, 10) * parseInt(resultTimesSent, 10);
      resultArray.push(result);
      resultTimesSent = 0;
    }
    for (let i = 0; i < resultArray.length; i++) {
      total += resultArray[i];
    }
    return total;
  }
}

class SharedEmails extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    sharedEmailsData: React.PropTypes.object
  }
  componentDidMount() {
    this.props.dispatch(getSharedEmails());

    this.interval = setInterval(() => {
      this.props.dispatch(getSharedEmails());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const todayNumClass = classNames({
      "shared-num": true,
      "shared-num-blue": emailsToday(this.props.sharedEmailsData),
      "shared-num-grey": !emailsToday(this.props.sharedEmailsData)
    });

    return (
      <div className="shared-column">
        <span className="fa fa-envelope-o"></span>
        <div className="shared-inner">
          <span className={todayNumClass}>{ emailsToday(this.props.sharedEmailsData) }</span>
          <span className="shared-txt">Today</span>
        </div>
        <div className="shared-inner">
          <span className="shared-num">{ emailsTotal(this.props.sharedEmailsData) }</span>
          <span className="shared-txt">Total</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sharedEmailsData: state.sharedEmailsData
  };
}

export default connect(mapStateToProps)(SharedEmails);
