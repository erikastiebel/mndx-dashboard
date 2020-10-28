import React from "react";
import {getSharedFacebook} from "../actions/actions";
import {getToday} from "../actions/actions";
import {connect} from "react-redux";

const classNames = require("classnames");

function facebookTotal(object) {
  let result = 0;
  if (object.values !== undefined) {
    const facebookObj = object.values.undefined;
    for (const i in facebookObj) {
      if (facebookObj) {
        result += parseInt(facebookObj[i], 10);
      }
    }
    return result;
  }
  return "-";
}

function facebookToday(object) {
  let result = 0;
  const today = getToday();
  if (object.values !== undefined) {
    const facebookObj = object.values.undefined;
    for (const i in facebookObj) {
      if (i === today) {
        result = facebookObj[i];
      }
    }
    return result;
  }
  return "-";
}

class SharedFacebook extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    sharedFacebookData: React.PropTypes.object
  }
  componentDidMount() {
    this.props.dispatch(getSharedFacebook());
    this.interval = setInterval(() => {
      this.props.dispatch(getSharedFacebook());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const todayNumClass = classNames({
      "shared-num": true,
      "shared-num-blue": facebookToday(this.props.sharedFacebookData),
      "shared-num-grey": !facebookToday(this.props.sharedFacebookData)
    });

    return (
      <div className="shared-column">
        <span className="fa fa-facebook"></span>
        <div className="shared-inner">
          <span className={todayNumClass}>{ facebookToday(this.props.sharedFacebookData) }</span>
          <span className="shared-txt">Today</span>
        </div>
        <div className="shared-inner">
          <span className="shared-num">{ facebookTotal(this.props.sharedFacebookData) }</span>
          <span className="shared-txt">Total</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sharedFacebookData: state.sharedFacebookData
  };
}

export default connect(mapStateToProps)(SharedFacebook);
