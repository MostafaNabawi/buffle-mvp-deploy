import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import style from '../style.module.css'
const StudentRegister = () => {

    const [sendEmail, setSendEmail] = useState(false)
    const handleRegister = () => {
        setSendEmail(true)
    }
    return (
        <div className={style.registerPage}>
            {
                !sendEmail
                    ? <Row className="p-0 m-0 row justify-content-center">
                        <Col xl='5'>
                            <div className={style.registerCard}>
                                <div className={`${style.header}  text-center pt-4`}>
                                    <div className={style.floatLeft}>1/2</div>
                                    <Image src="/favicon.ico" />
                                    <div className={`${style.headerTitle} mt-3`}>
                                        Enter your info
                                    </div>
                                </div>
                                <div className={style.body}>
                                    <Form>
                                        <Row>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className={style.lableForm}>First Name *</Form.Label>
                                                    <Form.Control
                                                        className={style.formInput}
                                                        type="text"
                                                        placeholder="First Name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className={style.lableForm}>last Name *</Form.Label>
                                                    <Form.Control
                                                        className={style.formInput}
                                                        type="text"
                                                        placeholder="Last name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col xl='12'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className={style.lableForm}>E-mail *</Form.Label>
                                                <Form.Control
                                                    className={style.formInput}
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Row>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className={style.lableForm}>University *</Form.Label>
                                                    <Form.Control
                                                        className={style.formInput}
                                                        type="text"
                                                        placeholder="University"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className={style.lableForm}>Semester *</Form.Label>
                                                    <Form.Control
                                                        className={style.formInput}
                                                        type="number"
                                                        placeholder="Semester"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className={style.lableForm}>Country *</Form.Label>
                                                    <Form.Select className={style.formInput} aria-label="Default select example">
                                                        <option>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xl='6'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className={style.lableForm}>City *</Form.Label>
                                                    <Form.Select className={style.formInput} aria-label="Default select example">
                                                        <option>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col xl='12'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className={style.lableForm}>How did you hear about buffle?</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="3"
                                                    className={style.formTextarea}
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Button
                                            className={style.submitBtn}
                                            type="button"
                                            onClick={(e) => { handleRegister(e) }}
                                        >
                                            REGISTER
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            <div className={style.footer}>
                                Do have account yet?{" "}
                                <Link className={style.registerLink} to="/">
                                    Login now
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    : <Row className="p-0 m-0 row justify-content-center">
                        <Col>
                            <div className={style.iconCheck}>
                                <Icon icon="emojione:white-heavy-check-mark" />
                            </div>
                            <h2 className="text-center mt-2">
                                Message sent successfully to your email
                            </h2>
                            <h2 className="text-center mt-2">
                                Please check your email and
                                continue registering from here.
                            </h2>
                            <h4 className="text-center mt-2">
                                Cleck open <a href="http://gmail.com/"> Email</a>
                            </h4>
                        </Col>
                    </Row>
            }
        </div>
    );
};
export default StudentRegister;