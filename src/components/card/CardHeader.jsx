import React from "react";

function CardHeader(props) {
  const { icon, title, subtitle, action } = props;
  return (
    <div className={`card_header ${props.className || ""}`}>
      {icon}
      <div className="title_area">
        <h4 className="card_title">{title}</h4>
        {subtitle && <h6 className="card_subtitle">{subtitle}</h6>}
      </div>
      {action && <div className="actions_area">{action}</div>}
    </div>
  );
}

export default CardHeader;
