import { React } from "react";
import {Row,Col,Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Col className="col-12 header-name">Hi Denail</Col>
      <Row>
      <Col className="text-secondary-dark header-thank mt-2" >Thank god it’s friday!</Col>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form>
      </Col>
      </Row>
    </>
  );
};

export default Header;
