jest.unmock("../app/components/Funnels.jsx");

import React from "react";
import TestUtils from "react-addons-test-utils";
import {Funnels} from "../app/components/Funnels";

describe("Load funnels and the right amount of objects", () => {
  it("should have 1 h2", () => {
    const funnels = TestUtils.renderIntoDocument(
      <Funnels
        dispatch = {() => "hello"}
        notifiedToPublishedData = {() => "beautiful"}
        publishedToPublishedData = {() => "world"}
      />
    );

    const h2 = TestUtils.scryRenderedDOMComponentsWithTag(
        funnels, "h2");
    expect(h2.length).toEqual(1);
  });

  it("should have 10 spans", () => {
    const funnels = TestUtils.renderIntoDocument(
      <Funnels
        dispatch = {() => "hello"}
        notifiedToPublishedData = {() => "beautiful"}
        publishedToPublishedData = {() => "world"}
      />
    );

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(
        funnels, "span");
    expect(spans.length).toEqual(10);
  });

  it("should have 11 divs", () => {
    const funnels = TestUtils.renderIntoDocument(
      <Funnels
        dispatch = {() => "hello"}
        notifiedToPublishedData = {() => "beautiful"}
        publishedToPublishedData = {() => "world"}
      />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithTag(
        funnels, "div");
    expect(divs.length).toEqual(11);
  });
});
