import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Dashboard from "./dashboard";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Dashboard,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    console.log(err);
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
