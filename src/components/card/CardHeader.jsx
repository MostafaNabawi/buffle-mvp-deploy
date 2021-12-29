import React from "react";

function CardHeader(props) {
  return (
    <>
      <h2>{props.title}</h2>
      {props.children}
      <div>{props.actions}</div>
    </>
  );
}

export default CardHeader;
