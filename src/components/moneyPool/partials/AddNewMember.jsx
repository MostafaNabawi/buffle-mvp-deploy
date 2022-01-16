import React from "react";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import style from "./../style.module.css";
function AddNewMember() {
  const [value, setValue] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    setValue(inputtedValue);
  };

  return (
    <div className={style.live_search}>
      <Form.Group className="mb-3" controlId="person-1">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <div className={style.search_result}>
        <div className={style.spinner_wrapper}>
          <Spinner animation="border" />
        </div>
      </div>
    </div>
  );
}

export default AddNewMember;
