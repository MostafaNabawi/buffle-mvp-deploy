import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";

import Button from "./Button";
function DatePicker() {
  // const [startDate, setStartDate] = useState(new Date());
  // const [isOpen, setIsOpen] = useState(false);
  // const handleChange = (e) => {
  //   setIsOpen(!isOpen);
  //   setStartDate(e);
  // };
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setIsOpen(!isOpen);
  // };

  const label = "Tomorrow";

  return (
    <div>
      <Button label={label || "Unscheduled"} />

      {/* {isOpen && (
        <ReactDatePicker selected={startDate} onChange={handleChange} inline />
      )} */}
    </div>
  );
}

export default DatePicker;
