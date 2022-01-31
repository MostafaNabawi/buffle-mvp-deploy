import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSelectedUserID } from "../../../store/moneyPoolSlice";
function PersonSelectorDropDown(props) {
  const { eventUsers } = useSelector((state) => state.moneyPool);
  const dispatch = useDispatch();
  const [userID, serUserID] = useState("");
  //useEffect function
  useEffect(() => {
    dispatch(setSelectedUserID(userID));
  }, [userID]);
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={eventUsers[0].name}
      variant="secondary"
    >
      {eventUsers.map((item) => (
        <Dropdown.Item key={item.name} onClick={() => serUserID(item.name)}>
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default PersonSelectorDropDown;
