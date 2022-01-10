import React from "react";
import { Col, Form } from "react-bootstrap";

function PersonNameField(props) {
  const { num } = props;
  return (
    <Col md={12}>
      <Form.Group className="mb-3" controlId={`preson-${num}`}>
        <Form.Label>Person {num}</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
    </Col>
  );
}

export default PersonNameField;
