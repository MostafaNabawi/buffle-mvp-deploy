import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({
  label,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
}) {
  const validatHours = (e) => {
    const value = e.target.value;
    const hours = value <= 12 ? value : 12;
    setHours(hours);
  };

  const validatMintteAndSeconds = (value, type) => {
    const val = value <= 60 ? value : 60;
    if (type === "sec") {
      setSeconds(val);
      return "";
    } else {
      setMinutes(val);
      return "";
    }
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
            onChange={validatHours}
          />
        </Col>

        <Col>
          <Form.Control
            type="number"
            placeholder="min"
            min={0}
            max={60}
            value={minutes}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "min")}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="sec"
            min={0}
            max={60}
            value={seconds}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "sec")}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default TimePicker;
