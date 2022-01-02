import React from "react";

function CardHeader(props) {
  const { icon, title, action } = props;
  return (
    <div className={`card_header ${props.className || ""}`}>
      {icon}
      <div className="title_area">
        <h4 className="card_title">{title}</h4>
      </div>
      <div className="actions_area">{action}</div>
    </div>
  );
}

export default CardHeader;
