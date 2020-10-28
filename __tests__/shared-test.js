jest.unmock("../app/components/SharedTweets.jsx");

import React from "react";
import TestUtils from "react-addons-test-utils";
import {SharedTweets} from "../app/components/SharedTweets";

describe("SharedTweets", () => {

  it("should have 5 spans", () => {
    const sharedTweets = TestUtils.renderIntoDocument(
      <SharedTweets
        dispatch = {() => "hello"}
        sharedTweetsData = {() => "world"}
      />
    );

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(
        sharedTweets, "span");
    expect(spans.length).toEqual(5);
  });

  it("should have 1 div", () => {
    const sharedTweets = TestUtils.renderIntoDocument(
      <SharedTweets
        dispatch = {() => "hello"}
        sharedTweetsData = {() => "world"}
      />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithTag(
        sharedTweets, "div");
    expect(divs.length).toEqual(1);
  });
});
