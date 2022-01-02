import { React } from "react";
import { Row, Col, Form,Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
const Header = () => {
  return (
    <>
      <Col className="col-12 header-name">Hi Denail</Col>
      <Row className="mb-3">
        <Col className="col-8 text-secondary-dark header-thank mt-3" >Thank god it’s friday!</Col>
        <Col className="col-4">
          <Row>
            <Col className="col-8">
              <Form className="form-search">
                <Form.Group className="mb-3 serach-input input-group" controlId="formBasicEmail">
                  <i className="search-icon"><Icon  icon="ci:search-small" /></i>
                  <Form.Control className="search-input2" type="search" placeholder="search" />
                </Form.Group>
              </Form>
            </Col>
            <Col className="col-2">
              <div className="header-icon navy-blue text-center pt-2">
              <Link to=""><Image className="sidebar-icon" src="/icone/hcphotos-Headshots-1 1.png" /></Link>
              </div>
            </Col>
            <Col className="col-2">
              <div className="header-icon navy-blue text-center pt-2">
              <Link to=""><Image className="sidebar-icon" src="/icone/hcphotos-Headshots-1 2.png" /></Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Header;
