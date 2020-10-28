import React from "react";
import {getNotifiedToPublishedFunnel} from "../actions/actions";
import {getPublishedToPublishedFunnel} from "../actions/actions";
import {getFromDate} from "../actions/actions";
import {connect} from "react-redux";

function roundDecimal(data) {
  const getdate = getFromDate();
  if (data[getdate] !== undefined) {
    const decimalData = data[getdate].steps[1].overall_conv_ratio;
    return (decimalData * 100).toFixed(0);
  }
  return "-";
}

function getNotified(data) {
  const getdate = getFromDate();
  if (data[getdate] !== undefined) {
    return data[getdate].steps[0].count;
  }
  return "-";
}

function getPublished(data) {
  const getdate = getFromDate();
  if (data[getdate] !== undefined) {
    return data[getdate].steps[1].count;
  }
  return "-";
}

class Funnels extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    notifiedToPublishedData: React.PropTypes.object,
    publishedToPublishedData: React.PropTypes.object
  }

  componentDidMount() {
    this.props.dispatch(getNotifiedToPublishedFunnel());
    this.props.dispatch(getPublishedToPublishedFunnel());
    this.interval = setInterval(() => {
      this.props.dispatch(getNotifiedToPublishedFunnel());
      this.props.dispatch(getPublishedToPublishedFunnel());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="module-container funnels">
        <div className="module-wrapper">
        <h2><span className="fa fa-filter"></span> funnels</h2>
         <span className="funnels-timespan">(Last 30 days)</span>
          <div className="flex-wrapper">
            <div className="funnel-wrapper">
              <div className="funnel-inner">
                <div className="flex-col">
                  <span className="funnels-num">{ getNotified(this.props.notifiedToPublishedData) }</span>
                  <span className="funnels-text">Activated <br />user</span>
                </div>
                <div className="flex-col">
                  <span className="funnels-num">{ getPublished(this.props.notifiedToPublishedData) }</span>
                  <span className="funnels-text">Published <br />first story</span>
                </div>
              </div>
              <div className="flex-col num">
                <span className="funnels-num large">{ roundDecimal(this.props.notifiedToPublishedData) }<span className="procent">%</span></span>
              </div>
            </div>
            <div className="funnel-wrapper">
              <div className="funnel-inner">
                <div className="flex-col">
                  <span className="funnels-num">{ getNotified(this.props.publishedToPublishedData) }</span>
                  <span className="funnels-text">Published <br />story</span>
                </div>
                <div className="flex-col">
                  <span className="funnels-num">{ getPublished(this.props.publishedToPublishedData) }</span>
                  <span className="funnels-text">Published <br />another story</span>
                </div>
              </div>
              <div className="flex-col num">
                <span className="funnels-num large">{ roundDecimal(this.props.publishedToPublishedData) }<span className="procent">%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifiedToPublishedData: state.notifiedToPublishedData,
    publishedToPublishedData: state.publishedToPublishedData
  };
}

export default connect(mapStateToProps)(Funnels);
