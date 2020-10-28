import React from "react";
import Stories from "./Stories";
import Brands from "./Brands";
import Funnels from "./Funnels";
import Shared from "./Shared";
import Profiles from "./Profiles";
import Time from "./Time";

export default class Wrapper extends React.Component {
  render() {
    return (
      <div className="flex-container">
        <div className="flex-column">
          <Shared />
          <Stories />
        </div>
        <div className="flex-column">
          <Profiles />
          <Brands />
        </div>
        <div className="flex-column">
          <Time />
          <Funnels />
        </div>
      </div>
    );
  }
}
