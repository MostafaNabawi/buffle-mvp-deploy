import React from "react";
import { Form } from "react-bootstrap";

function ForWathInputFeild() {
  return (
    <div className="mb-4">
      <Form.Group controlId="wathfor">
        <Form.Label> Wath for? </Form.Label>
        <Form.Control type="text" placeholder="Event pass" />
      </Form.Group>
    </div>
  );
}

export default ForWathInputFeild;
