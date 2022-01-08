import { React } from "react";
import Select from 'react-select';
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from './style.module.css'

const UserProfile = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <>
      <Container className={`${style.profileContainer} secondary-color`} fluid>
        <Row className="justify-content-center">
          <Col xl={8}>
            <h1 className={`${style.title} text-center`}>Your Account</h1>
            <Form>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Image className={style.userPhoto} src="/img/user-3.png" />
                  <Form.Label className={style.lablePhoto} for="photoUser">
                    <Icon icon="uil:image-upload" />
                  </Form.Label>
                  <Form.Control className={style.hide} id="photoUser" type="file" />
                </Form.Group>
              </Row>
              <Row>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First  name</Form.Label>
                    <Form.Control type="email" placeholder="First  name" />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Slack:</Form.Label>
                    <Form.Control type="text" placeholder="Slack" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Departure</Form.Label>
                    <Form.Control type="text" placeholder="Departure" />
                  </Form.Group>
                </Col>
                <Col xl={6} className="pt-4">
                  <Select
                    // value={selectedOption}
                    // onChange={this.handleChange}
                    options={options}
                    isMulti
                  />
                </Col>
              </Row>
              <Button className={style.btnUpdate} type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;