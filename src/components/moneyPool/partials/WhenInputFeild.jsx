import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

function WhenInputFeild() {
  return (
    <div className="mb-3">
      <Form.Label>When? </Form.Label>
      <InputGroup className="mb-1">
        <FormControl
          aria-label="when"
          aria-describedby="basic-addon1"
          type="date"
          defaultValue="2022-1-10"
        />
        <InputGroup.Text id="basic-addon1">MM/DD/YYYY</InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default WhenInputFeild;
