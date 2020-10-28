import React from "react";
import {getWeekday} from "./Profiles";

function printMessage() {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (hour >= 8 && hour < 9 ) {
    return "Good morning Skywalkers!";
  } else if (hour === 9 && (minutes >= 10 && minutes <= 30)) {
    return "It's daily time!";
  } else if ((hour >= 9 && hour < 12) || (hour >= 13 && hour < 17)) {
    return "Poptype Dashboard";
  } else if (hour >= 12 && hour < 13) {
    return "It's lunch time";
  }  else if (hour >= 17 && hour < 18) {
    return "Time to leave!";
  } else if (hour >= 18 && hour < 22) {
    return "Have a nice evening!";
  } else if (hour >= 22 && hour < 24) {
    return "Goodnight Skywalkers!";
  } else if (hour >= 0 && hour < 5) {
    return "ZZzzZzzz...";
  } else if (hour >= 5 && hour < 8) {
    return "New day, new possibilities!";
  }
}

function icon() {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 5 && hour < 10) {
    return <span className="icon fa fa-sun-o"></span>;
  } else if (hour >= 12 && hour < 13) {
    return <span className="icon fa fa-cutlery"></span>;
  } else if (hour >= 10 && hour < 12 || hour >= 13 && hour < 17) {
    return <span className="icon fa fa-bar-chart-o"></span>;
  } else if (hour >= 17 && hour < 18) {
    return <span className="icon fa fa-rocket"></span>;
  } else if (hour >= 18 && hour < 22) {
    return <span className="icon fa fa-smile-o"></span>;
  } else if (hour >= 22 && hour < 24 || hour >= 0 && hour < 5) {
    return <span className="icon fa fa-moon-o"></span>;
  }
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export default class Time extends React.Component {
  componentWillMount() {
    this.setTime();
  }
  componentDidMount() {
    window.setInterval(function() {
      this.setTime();
    }.bind(this), 1000);
  }
  setTime() {
    const currentdate = new Date();
    const hours = addZero(currentdate.getHours());
    const minutes = addZero(currentdate.getMinutes());
    const month = currentdate.getMonth();
    const date = currentdate.getDate();
    this.setState({
      hours: hours,
      minutes: minutes,
      month: month,
      date: date
    });
  }

  render() {
    return (
      <div className="module-container time">
        <div className="module-wrapper">
          <div className="flex-wrapper">
            <div className="flex-col">
              <span className="message-text">{ printMessage()} {icon()}</span>
            </div>
          </div>
          <span className="divider"></span>
          <div className="flex-wrapper">
            <div className="flex-col">
              <div>
                <span className="time">{this.state.hours} : {this.state.minutes}</span>
              </div>
              <div>
                <span className="date">{getWeekday()}  {this.state.date}/{this.state.month}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
