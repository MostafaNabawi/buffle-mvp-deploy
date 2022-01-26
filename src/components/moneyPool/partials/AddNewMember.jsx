import React from "react";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import style from "./../style.module.css";
function AddNewMember() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState([]);

  function handleSubmit(e) {
    setEmail(e.target.value);
    const value =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    if (value) {
      console.log("You clicked submit.", email, value);
    }
  }

  return (
    <div className={style.live_search}>
      <Form>
        <Form.Group className="mb-3" controlId="person-1">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleSubmit}
          />
        </Form.Group>
      </Form>
      <div className={style.search_result}>
        <div className={style.spinner_wrapper}>
          {result.length > 0 ? (
            <div>result</div>
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNewMember;
