import { React } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col,Image } from "react-bootstrap";

const Register = () => {
  return (
    <>
<<<<<<< HEAD
      <UserRegister />
=======
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
>>>>>>> e6ed5e5ba8773f069c6653a81f6d5b1fdc7a1711
    </>
  );
};

export default Register;
