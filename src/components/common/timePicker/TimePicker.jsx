import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({ label }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleHours = (e) => {
    const value = e.target.value;
    const hours = value <= 12 ? value : 12;
    setHours(hours);
  };

  const validatputValue = (value) => {
    return value <= 60 ? value : 60;
  };

  const handelMinutes = (e) => {
    const minutes = validatputValue(e.target.value);
    setMinutes(minutes);
  };

  const handleSeconds = (e) => {
    const seconds = validatputValue(e.target.value);
    setSeconds(seconds);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col>
          <Form.Control
            type="number"
            placeholder="hr"
            min={0}
            max={12}
            value={hours}
            onChange={handleHours}
          />
        </Col>

        <Col>
          <Form.Control
            type="number"
            placeholder="min"
            min={0}
            max={60}
            value={minutes}
            onChange={handelMinutes}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="sec"
            min={0}
            max={60}
            value={seconds}
            onChange={handleSeconds}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default TimePicker;
