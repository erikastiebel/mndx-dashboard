import React from "react";
import {getBrandNames} from "../actions/actions";
import {today} from "../actions/actions";
import {yesterday} from "../actions/actions";
import {getLastWeek} from "../actions/actions";
import {getSixDaysAgo} from "../actions/actions";
import {getEightDaysAgo} from "../actions/actions";
import {getFifteenDaysAgo} from "../actions/actions";
import {getWeekday} from "./Profiles";
import {connect} from "react-redux";

const classNames = require("classnames");

function latestBrands(objectData) {
  const obj = [];
  for (const brandName in objectData) {
    if (objectData) {
      const dates = objectData[brandName];
      for (let date in dates) {
        if (dates[date] === 1) {
          date = new Date(date);
          obj.push({
            "name": brandName,
            "date": date
          });
        }
      }
    }
  }
  obj.sort(function(a, b) { return  b.date - a.date; });
  return obj.slice(0, 5)
    .map(function(brand) {
      return brand;
    });
}

function registrationsToday(objectData) {
  const registrationsTodayResults = [];
  for (const brandName in objectData) {
    if (objectData) {
      const dates = objectData[brandName];
      for (const date in dates) {
        if (dates[date] === 1 && new Date(date) >= today()) {
          registrationsTodayResults.push(brandName);
        }
      }
    }
  }
  return registrationsTodayResults.length;
}

function regTodayAWeekAgo(objectData) {
  const storeregTodayAWeekAgo = [];
  for (const brandName in objectData) {
    if (objectData) {
      const dates = objectData[brandName];
      for (const date in dates) {
        if (dates[date] === 1 && date >= getLastWeek() && date < getSixDaysAgo()) {
          storeregTodayAWeekAgo.push(brandName);
        }
      }
    }
  }
  return storeregTodayAWeekAgo.length;
}

function registrationsLastWeek(objectData) {
  const registrationsTodayResults = [];
  for (const brandName in objectData) {
    if (objectData) {
      const dates = objectData[brandName];
      for (const date in dates) {
        if (new Date(date) <= yesterday() && new Date(date) >= getLastWeek()) {
          if (dates[date] === 1) {
            registrationsTodayResults.push(brandName);
          }
        }
      }
    }
  }
  return registrationsTodayResults.length;
}

function registrationsTwoWeeksAgo(objectData) {
  const storeregistrationsTwoWeeksAgo = [];
  for (const brandName in objectData) {
    if (objectData) {
      const dates = objectData[brandName];
      for (const date in dates) {
        if (new Date(date) >= getFifteenDaysAgo() && new Date(date) < getEightDaysAgo()) {
          if (dates[date] === 1) {
            storeregistrationsTwoWeeksAgo.push(brandName);
          }
        }
      }
    }
  }
  return storeregistrationsTwoWeeksAgo.length;
}

class Brands extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    latestBrands: React.PropTypes.object,
    totalRegisteredBrands: React.PropTypes.object,
    registrationsToday: React.PropTypes.object,
    registrationsLastWeek: React.PropTypes.object,
    regTodayAWeekAgo: React.PropTypes.object,
    registrationsTwoWeeksAgo: React.PropTypes.object
  }

  componentDidMount() {
    this.props.dispatch(getBrandNames());
    this.interval = setInterval(() => {
      this.props.dispatch(getBrandNames());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderList() {
    return this.props.latestBrands.map(function(brand) {
      if (brand.date >= today()) {
        return <li className="green-bullet" key={brand.name}>{brand.name}</li>;
      }
      return <li key={brand.name}>{brand.name}</li>;
    });
  }

  render() {
    const todayNumClass = classNames({
      "brands-num": true,
      "brands-num-green": this.props.registrationsToday,
      "brands-num-grey": !this.props.registrationsToday || "-"
    });

    return (
      <div className="module-container brands">
        <div className="module-wrapper">
          <h2><span className="fa fa-bookmark"></span> Brands</h2>
          <div className="flex-wrapper top-row">
            <div className="flex-col">
              <span className={todayNumClass}>{ this.props.registrationsToday }</span>
              <span className="number-text">Today</span>
            </div>
            <div className="flex-col">
              <span className="brands-num">{ this.props.registrationsLastWeek }</span>
              <span className="number-text">Last 7 days</span>
            </div>
            <div className="flex-col">
              <span className="brands-num">{ this.props.totalRegisteredBrands }</span>
              <span className="number-text">Total</span>
            </div>
          </div>
          <div className="flex-wrapper mid-row">
            <div className="flex-col">
              <span className="compare-data num">{this.props.regTodayAWeekAgo}</span>
              <span className="compare-data txt">Last {getWeekday()}</span>
            </div>
            <div className="flex-col">
              <span className="compare-data num">{this.props.registrationsTwoWeeksAgo}</span>
              <span className="compare-data txt">Prev 7 days</span>
            </div>
            <div className="flex-col">
              <span></span>
            </div>
          </div>
          <span className="divider"></span>
          <div className="flex-wrapper">
            <div className="flex-col">
              <span className="latest-text">Latest brands</span>
              <ul>
              { this.renderList()}
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
    totalRegisteredBrands: Object.keys(state.brandNamesData).length,
    latestBrands: latestBrands(state.brandNamesData),
    registrationsToday: registrationsToday(state.brandNamesData),
    regTodayAWeekAgo: regTodayAWeekAgo(state.brandNamesData),
    registrationsTwoWeeksAgo: registrationsTwoWeeksAgo(state.brandNamesData),
    registrationsLastWeek: registrationsLastWeek(state.brandNamesData)
  };
}

export default connect(mapStateToProps)(Brands);
