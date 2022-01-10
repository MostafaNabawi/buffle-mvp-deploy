import React from "react";

function EventPerson(props) {
  const { icon, person } = props;
  return (
    <div>
      <span>{icon}</span>
      <div>{person}</div>
    </div>
  );
}

export default EventPerson;
