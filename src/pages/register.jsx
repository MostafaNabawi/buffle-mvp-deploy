import { React } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col,Image } from "react-bootstrap";

const Register = () => {
  return (
    <>
      {/* <Outlet /> */}
      <Container className="secondary-color" fluid>
        <Row>
          <Col xl='5' className="pt-3 text-center">
            <Image src='/img/register.png' />
          </Col>
          <Col xl='7'>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
