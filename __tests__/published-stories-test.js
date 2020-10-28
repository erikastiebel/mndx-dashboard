jest.unmock("../app/components/PublishedStories.jsx");

import React from "react";
import TestUtils from "react-addons-test-utils";
import {PublishedStories} from "../app/components/PublishedStories";

describe("PublishedStories", () => {
  it("should render an h2", () => {
    const publishedStories = TestUtils.renderIntoDocument(
      <PublishedStories
        dispatch = {() => "hello"}
        publishedStoryData = {() => "world"}
      />
    );

    const h2 = TestUtils.findRenderedDOMComponentWithTag(
      publishedStories, "h2"
    );

    expect(h2.textContent).toEqual("Stories");
  });
});
