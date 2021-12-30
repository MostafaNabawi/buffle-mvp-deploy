import React from "react";

function CardHeader(props) {
  return (
    <div className={`card_header ${props.className || ""}`}>
      {props.icon}
      {props.title}
      {props.subtitle}
      <div className="actions_area">{props.action}</div>
    </div>
  );
}

export default CardHeader;
