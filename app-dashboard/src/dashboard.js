/* eslint-disable no-console */
import React from "react";
import "./index.css";
import { BigBlock } from "@nitex/app-nav-bar";
import { name$ } from "@nitex/utility";
export default function Root(props) {
  const [name, setName] = React.useState("Hello");

  React.useEffect(() => {
    const sub = name$.subscribe(({ name }) => {
      setName(name);
    });
    return () => sub.unsubscribe();
  }, []);
  return (
    <section>
      <div className="header">Hello {props.name} is mounted!</div>
      <div className="externalComponent">
        <BigBlock />
      </div>
      <div className="communication">
        <div>MFE messages using rxJS</div>
        <div>{name}</div>
      </div>
    </section>
  );
}
