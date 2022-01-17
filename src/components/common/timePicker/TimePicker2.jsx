import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({ label, value, setValue }) {
  const [houreValue, setHoursValue] = useState("");
  const [minuteValue, setMinuteValue] = useState("");
  const [secondValue, setSecondeValue] = useState("");

  useEffect(() => {
    if (value) {
      setHoursValue(value.hours);
      setMinuteValue(value.minutes);
      setSecondeValue(value.seconds);
    }
  }, [value]);

  const validatHours = (e) => {
    const value = e.target.value;
    const hours = value < 12 ? value : 12;
    setValue({
      hours: hours,
      minutes: minuteValue === "" ? "00" : minuteValue,
      seconds: secondValue === "" ? "00" : secondValue,
    });
  };

  const validatMintteAndSeconds = (value, type) => {
    const val = value <= 60 ? value : 60;
    if (type === "sec") {
      setValue({
        hours: houreValue === "" ? "00" : houreValue,
        minutes: minuteValue === "" ? "00" : minuteValue,
        seconds: val,
      });
      return "";
    } else {
      setValue({
        hours: houreValue === "" ? "00" : houreValue,
        minutes: val,
        seconds: secondValue === "" ? "00" : secondValue,
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
            value={value.hours}
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
