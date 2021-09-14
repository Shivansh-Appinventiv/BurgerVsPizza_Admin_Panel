import React from "react";
//import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
  const {history} = props;
  console.log(history);
  return <div>{"Dashboard"}</div>;
}
