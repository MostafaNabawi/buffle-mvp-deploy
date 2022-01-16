import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({
  label,
  // hours,setHours,
  // minutes,setMinutes,
  // seconds,setSeconds,
  value,
  setValue,
}) {
  const validatHours = (e) => {
    const value = e.target.value;
    const hours = value <= 12 ? value : 12;
    // setHours(hours);
    setValue({
      ...value,
      ["hours"]: hours,
      ["minutes"]: value?.minutes,
      ["seconds"]: value.seconds,
    });
  };

  const validatMintteAndSeconds = (value, type) => {
    const val = value <= 60 ? value : 60;
    if (type === "sec") {
      setValue({
        ...value,
        ["hours"]: value?.hours,
        ["minutes"]: value?.minutes,
        ["seconds"]: val,
      });
      return "";
    } else {
      setValue({
        ...value,
        ["hours"]: value?.hours,
        ["minutes"]: val,
        ["seconds"]: value?.seconds,
      });
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
            value={value?.hours}
            onChange={validatHours}
          />
        </Col>

        <Col>
          <Form.Control
            type="number"
            placeholder="min"
            min={0}
            max={60}
            value={value?.minutes}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "min")}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="sec"
            min={0}
            max={60}
            value={value?.seconds}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "sec")}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default TimePicker;
