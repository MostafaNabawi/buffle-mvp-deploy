import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

function HowMuchInputFeild() {
  return (
    <div className="mb-4">
      <Form.Label>How Much? </Form.Label>
      <InputGroup className="mb-1">
        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
        <FormControl
          placeholder="Amount in USA Doller"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Text className="text-muted">
        Your expenses will calculate equally.
      </Form.Text>
    </div>
  );
}

export default HowMuchInputFeild;
