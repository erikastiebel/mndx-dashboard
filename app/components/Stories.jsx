import React from "react";
import {getPublishedStories} from "../actions/actions";
import {getStoryTitles} from "../actions/actions";
import {today} from "../actions/actions";
import {getToday} from "../actions/actions";
import {getSevenDaysAgo} from "../actions/actions";
import {getWeekday} from "./Profiles";
import {connect} from "react-redux";

const classNames = require("classnames");

function countPublishedStories(object) {
  let result = 0;
  if (object.values !== undefined) {
    const storiesObj = object.values.undefined;
    for (const i in storiesObj) {
      if (storiesObj) {
        result += parseInt(storiesObj[i], 10);
      }
    }
    return result;
  }
  return "-";
}

function getPublishedToday(object) {
  const getdate = getToday();
  if (object.values !== undefined) {
    const result = object.values.undefined[getdate];
    return result;
  }
  return "-";
}

function getPublishedAWeekAgo(object) {
  const getdate = getSevenDaysAgo();
  if (object.values !== undefined) {
    const result = object.values.undefined[getdate];
    return result;
  }
  return "-";
}

function getPublishedLastSevenDays(object) {
  let result = 0;
  if (object.values !== undefined) {
    const storiesObj = object.values.undefined;
    const storeValues = [];
    for (const i in storiesObj) {
      if (storiesObj) {
        const date = new Date(i);
        storeValues.push({
          date: date,
          value: storiesObj[i]
        });
        storeValues.sort((a, b) =>  b.date - a.date);
      }
    }
    const storeLastSevenValues = storeValues.slice(1, 8);
    for (let i = 0; i < storeLastSevenValues.length; i++) {
      result += parseInt(storeLastSevenValues[i].value, 10);
    }
    return result;
  }
  return "-";
}

function getPublishedTwoWeeksAgo(object) {
  let result = 0;
  if (object.values !== undefined) {
    const storiesObj = object.values.undefined;
    const storeValues = [];
    for (const i in storiesObj) {
      if (storiesObj) {
        const date = new Date(i);
        storeValues.push({
          date: date,
          value: storiesObj[i]
        });
        storeValues.sort((a, b) =>  b.date - a.date);
      }
    }
    const storeLastSevenValues = storeValues.slice(8, 15);
    for (let i = 0; i < storeLastSevenValues.length; i++) {
      result += parseInt(storeLastSevenValues[i].value, 10);
    }
    return result;
  }
  return "-";
}

function latestStories(objectData) {
  const obj = [];
  for (const storyTitle in objectData) {
    if (objectData) {
      const dates = objectData[storyTitle];
      for (let date in dates) {
        if (dates[date] !== 0) {
          date = new Date(date);
          obj.push({
            "name": storyTitle,
            "date": date
          });
        }
      }
    }
  }
  obj.sort(function(a, b) { return  b.date - a.date; });
  return obj.slice(0, 5)
      .map(function(story) {
        return story;
      });
}

class Stories extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    latestStories: React.PropTypes.object,
    publishedStoryData: React.PropTypes.object
  }
  componentDidMount() {
    this.props.dispatch(getPublishedStories());
    this.props.dispatch(getStoryTitles());
    this.interval = setInterval(() => {
      this.props.dispatch(getPublishedStories());
      this.props.dispatch(getStoryTitles());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderList() {
    return this.props.latestStories.map(function(story) {
      if (story.date >= today()) {
        return <li className="yellow-bullet" key={story.name}>{story.name}</li>;
      }
      return <li key={story.name}>{story.name}</li>;
    });
  }

  render() {
    const todayNumClass = classNames({
      "stories-num": true,
      "stories-num-yellow": getPublishedToday(this.props.publishedStoryData),
      "stories-num-grey": !getPublishedToday(this.props.publishedStoryData) || getPublishedToday("-")
    });

    return (
      <div className="module-container published-stories">
        <div className="module-wrapper">
          <h2><span className="fa fa-pencil"></span> Stories</h2>
          <div className="flex-wrapper top-row">
            <div className="flex-col">
              <span className={todayNumClass}>{ getPublishedToday(this.props.publishedStoryData) }</span>
              <span className="number-text">Today</span>
            </div>
            <div className="flex-col">
              <span className="stories-num">{ getPublishedLastSevenDays(this.props.publishedStoryData) }</span>
              <span className="number-text">Last 7 days</span>
            </div>
            <div className="flex-col">
              <span className="stories-num">{ countPublishedStories(this.props.publishedStoryData) }</span>
              <span className="number-text">Total</span>
            </div>
          </div>
          <div className="flex-wrapper mid-row">
            <div className="flex-col">
              <span className="compare-data num">{getPublishedAWeekAgo(this.props.publishedStoryData)}</span>
              <span className="compare-data txt">Last {getWeekday()}</span>
            </div>
            <div className="flex-col">
              <span className="compare-data num">{getPublishedTwoWeeksAgo(this.props.publishedStoryData)}</span>
              <span className="compare-data txt">Prev 7 days</span>
            </div>
            <div className="flex-col">
              <span></span>
            </div>
          </div>
          <span className="divider"></span>
          <div className="flex-wrapper">
            <div className="flex-col">
              <span className="latest-text">Latest stories</span>
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
    publishedStoryData: state.publishedStoryData,
    latestStories: latestStories(state.storyTitlesData)
  };
}

export default connect(mapStateToProps)(Stories);
