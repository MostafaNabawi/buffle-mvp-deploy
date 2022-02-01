import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSelectedUserID } from "../../../store/moneyPoolSlice";
function PersonSelectorDropDown() {
  const { eventUsers, selectedUserID, ownerID } = useSelector(
    (state) => state.moneyPool
  );
  const [selectedItem, setsSelectedItem] = useState(0);
  const dispatch = useDispatch();
  let title = "";
  const handleSetID = (index, id) => {
    setsSelectedItem(index);
    dispatch(setSelectedUserID(id));
  };

  if (eventUsers !== "") {
    if (selectedUserID === ownerID) {
      title = `${eventUsers[0].first_name} ${eventUsers[0].last_name} `;
    } else {
      title = `${eventUsers[selectedItem].first_name} ${eventUsers[selectedItem].last_name} `;
    }
  } else {
    title = <Icon fontSize={24} icon="eos-icons:loading" />;
  }

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={title}
      variant="secondary"
    >
      {eventUsers &&
        eventUsers.map((item, index) => (
          <>
            <Dropdown.Item
              key={item.id}
              onClick={() => handleSetID(index, item.id)}
            >
              {`${item.first_name} ${item.last_name}`}
            </Dropdown.Item>
          </>
        ))}
    </DropdownButton>
  );
}

export default PersonSelectorDropDown;
