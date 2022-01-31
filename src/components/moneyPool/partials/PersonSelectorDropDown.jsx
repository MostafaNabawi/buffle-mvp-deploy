import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSelectedUserID } from "../../../store/moneyPoolSlice";
function PersonSelectorDropDown(props) {
  const { eventUsers } = useSelector((state) => state.moneyPool);
  const dispatch = useDispatch();
  const title =
    eventUsers !== "" ? (
      `${eventUsers[0].first_name} ${eventUsers[0].last_name} `
    ) : (
      <Icon fontSize={24} icon="eos-icons:loading" />
    );
  const handleSetID = (id) => {
    dispatch(setSelectedUserID(id));
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={title}
      variant="secondary"
    >
      {eventUsers &&
        eventUsers.map((item) => (
          <Dropdown.Item key={item.id} onClick={() => handleSetID(item.id)}>
            {`${item.first_name} ${item.last_name} `}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
}

export default PersonSelectorDropDown;
