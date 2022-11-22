import { auth$ } from "@nitex/utility";
// import { useState } from "react";
import React from "react";
import "./root.css";
export default function Root(props) {
  // const [authdetail, setAutheDetail] = useState();
  React.useEffect(() => {
    const sub = auth$.subscribe(({ sessionToken }) => {
      // eslint-disable-next-line no-console
      console.log(sessionToken);
      // setAutheDetail(JSON.stringify(sessionToken));
    });
    return () => sub.unsubscribe();
  }, []);

  return <section className="header">{props.name} is mounted!</section>;
}
