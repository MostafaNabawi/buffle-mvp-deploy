import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
function PersonSelectorDropDown(props) {
  const { data } = props;
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={data[0].name}
      variant="secondary"
    >
      {data.map((item) => (
        <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default PersonSelectorDropDown;
