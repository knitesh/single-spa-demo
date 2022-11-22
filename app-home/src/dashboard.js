/* eslint-disable no-console */
import React from "react";
import "./home.css";
export default function Root(props) {
  return (
    <section>
      <div className="home-header">Hello {props.name} is mounted!</div>
    </section>
  );
}
