/* eslint-disable no-console */
import React from "react";
import "./index.css";
export default function Root(props) {
  return (
    <section>
      <div className="header">Hello {props.name} is mounted!</div>
    </section>
  );
}
