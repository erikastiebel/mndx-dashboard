import React from "react";
import {getInvited} from "../actions/actions";
import {getToday} from "../actions/actions";
import {today} from "../actions/actions";
import {yesterday} from "../actions/actions";
import {getLastWeek} from "../actions/actions";
import {getSixDaysAgo} from "../actions/actions";
import {getEightDaysAgo} from "../actions/actions";
import {getFifteenDaysAgo} from "../actions/actions";
import {connect} from "react-redux";

const classNames = require("classnames");

function pendingRegistrations(arrayData) {
  const notReg = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if ((date > new Date("2016-03-09")) && !userObject.$properties.invited) {
      notReg.push(userObject.$properties.$email);
    }
  });
  return notReg;
}

function registeredTotal(arrayData) {
  const totalReg = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if ((date > new Date("2016-03-09")) && userObject.$properties.invited) {
      totalReg.push(userObject.$properties.$email);
    }
  });
  return totalReg;
}

function registeredLastWeek(arrayData) {
  const totalReg = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if (date <= yesterday() && date >= getLastWeek() && userObject.$properties.invited) {
      totalReg.push(userObject.$properties.$email);
    }
  });
  return totalReg;
}

function registeredToday(arrayData) {
  const todayReg = [];
  arrayData.map(function(userObject) {
    const todaysDate = new Date(getToday());
    const date = new Date(userObject.$properties.$created);
    if ((date >= todaysDate) && userObject.$properties.invited) {
      todayReg.push(userObject.$properties.$email);
    }
  });
  return todayReg;
}

function regTodayAWeekAgo(arrayData) {
  const storeregTodayAWeekAgo = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if (date >= getLastWeek() && date < getSixDaysAgo() && userObject.$properties.invited) {
      storeregTodayAWeekAgo.push(userObject.$properties.$email);
    }
  });
  return storeregTodayAWeekAgo;
}

function regLastWeekTwoWeeksAgo(arrayData) {
  const storeLastWeekTwoWeeksAgo = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if (date >= getFifteenDaysAgo() && date < getEightDaysAgo() && userObject.$properties.invited) {
      storeLastWeekTwoWeeksAgo.push(userObject.$properties.$email);
    }
  });
  return storeLastWeekTwoWeeksAgo;
}

function sortPendingRegistrations(arrayData) {
  const obj = [];
  arrayData.map(function(userObject) {
    const date = new Date(userObject.$properties.$created);
    if ((date > new Date("2016-03-09")) && !userObject.$properties.invited) {
      obj.push({
        "email": userObject.$properties.$email,
        "date": date
      });
    }
  });
  obj.sort(function(a, b) { return  b.date - a.date; });
  return obj.slice(0, 5)
      .map(function(brand) { return brand; });
}

export function getWeekday() {
  const date = today();
  const day = date.getDay();
  switch (day) {
  default:
    return "";
  case 0:
    return "Sunday";
  case 1:
    return "Monday";
  case 2:
    return "Tuesday";
  case 3:
    return "Wednesday";
  case 4:
    return "Thursday";
  case 5:
    return "Friday";
  case 6:
    return "Saturday";
  }
}

class Profiles extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    sortPendingRegistrations: React.PropTypes.object,
    pendingRegistrations: React.PropTypes.object,
    registeredTotal: React.PropTypes.object,
    registeredToday: React.PropTypes.object,
    registeredLastWeek: React.PropTypes.object,
    regTodayAWeekAgo: React.PropTypes.object,
    regLastWeekTwoWeeksAgo: React.PropTypes.object
  }
  componentDidMount() {
    this.props.dispatch(getInvited());
    this.interval = setInterval(() => {
      this.props.dispatch(getInvited());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderList() {
    if (this.props.sortPendingRegistrations.length) {
      return this.props.sortPendingRegistrations.map(function(brand) {
        return <li key={brand.email}>{brand.email}</li>;
      });
    }
    return <li>No pending registrations &#33;</li>;
  }

  render() {
    const regNumClass = classNames({
      "reg-num": true,
      "reg-num-red": this.props.pendingRegistrations,
      "reg-num-grey": !this.props.pendingRegistrations
    });

    const todayNumClass = classNames({
      "reg-num": true,
      "today-num-red": this.props.registeredToday,
      "today-num-grey": !this.props.registeredToday
    });

    return (
      <div className="module-container pending-registrations">
        <div className="module-wrapper">
          <h2><span className="fa fa-user"></span> Profiles</h2>
          <div className="flex-wrapper top-row">
            <div className="flex-col">
              <span className={todayNumClass}>{this.props.registeredToday}</span>
              <span className="number-text">Today</span>
            </div>
            <div className="flex-col">
              <span className="reg-num">{this.props.registeredLastWeek}</span>
              <span className="number-text">Last 7 days</span>
            </div>
            <div className="flex-col">
              <span className="reg-num">{this.props.registeredTotal}</span>
              <span className="number-text">Total</span>
            </div>
          </div>
          <div className="flex-wrapper mid-row">
            <div className="flex-col">
              <span className="compare-data num">{this.props.regTodayAWeekAgo}</span>
              <span className="compare-data txt">Last {getWeekday()}</span>
            </div>
            <div className="flex-col">
              <span className="compare-data num">{this.props.regLastWeekTwoWeeksAgo}</span>
              <span className="compare-data txt">Prev 7 days</span>
            </div>
            <div className="flex-col">
              <span></span>
            </div>
          </div>
          <span className="divider"></span>
          <div className="flex-wrapper list">
            <div className="flex-col">
              <span className="latest-text">Pending registrations <span className={regNumClass}>{this.props.pendingRegistrations}</span></span>
              <ul className="reg-email">
                {this.renderList()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pendingRegistrations: pendingRegistrations(state.invitedData).length,
    registeredTotal: registeredTotal(state.invitedData).length,
    registeredToday: registeredToday(state.invitedData).length,
    registeredLastWeek: registeredLastWeek(state.invitedData).length,
    regTodayAWeekAgo: regTodayAWeekAgo(state.invitedData).length,
    regLastWeekTwoWeeksAgo: regLastWeekTwoWeeksAgo(state.invitedData).length,
    pendingRegistrationsEmail: pendingRegistrations(state.invitedData),
    sortPendingRegistrations: sortPendingRegistrations(state.invitedData)
  };
}


export default connect(mapStateToProps)(Profiles);
