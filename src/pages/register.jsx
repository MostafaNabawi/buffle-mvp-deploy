import { React } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

const Register = () => {
  return (
    <>
      {/* <Outlet /> */}
      {/* d-flex  justify-content-center align-items-center */}
      <Container className="secondary-color register-container " fluid>
        <Row className="justify-content-center ">
          <Col xl='5' className="p-0">
            {/* <Image src='/img/register.png' /> */}
            <Image className="register_img" src='/img/register.jpg' />
          </Col>
          <Col xl="7" className="d-flex  justify-content-center align-items-center ">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
