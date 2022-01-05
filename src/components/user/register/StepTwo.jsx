import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import style from '../style.module.css'
const StepTwoRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={style.StepTowPage}>
            <Row className="p-0 m-0 row justify-content-center">
                <Col xl='5'>
                    <div className={style.registerCard}>
                        <div className={`${style.header}  text-center pt-4`}>
                            <div className={style.floatLeft}>2/2</div>
                            <Image src="/favicon.ico" />
                            <div className={`${style.headerTitle} mt-3`}>
                                Set your Password
                            </div>
                        </div>
                        <div className={style.body}>
                            <Form>
                                <Col xl='12'>
                                    <Form.Group className="mb-5" controlId="formBasicPassword">
                                        <Form.Label className={style.lableForm}>Password *</Form.Label>
                                        <div className="mb-4 input-group">
                                            <Form.Control
                                                className={style.formInput}
                                                type={`${showPassword ? "text" : "password"}`}
                                                placeholder="Password"
                                            />
                                            <i
                                                onClick={() => setShowPassword(!showPassword)}
                                                className={`${style.formInput} ${style.passwordIcon} input-group-text`}
                                                id="btnGroupAddon"
                                            >
                                                {!showPassword ? (
                                                    <Icon icon="akar-icons:eye" />
                                                ) : (
                                                    <Icon icon="clarity:eye-hide-line" />
                                                )}
                                            </i>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xl='12'>
                                    <Form.Group className="mb-5" controlId="formBasicPassword">
                                        <Form.Label className={style.lableForm}>Confirem Password *</Form.Label>
                                        <div className="mb-4 input-group">
                                            <Form.Control
                                                className={style.formInput}
                                                type={`${showPassword ? "text" : "password"}`}
                                                placeholder="confirem Password"
                                            />
                                            <i
                                                onClick={() => setShowPassword(!showPassword)}
                                                className={`${style.formInput} ${style.passwordIcon} input-group-text`}
                                                id="btnGroupAddon"
                                            >
                                                {!showPassword ? (
                                                    <Icon icon="akar-icons:eye" />
                                                ) : (
                                                    <Icon icon="clarity:eye-hide-line" />
                                                )}
                                            </i>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Button
                                    className={style.submitBtn}
                                    type="button"
                                    // onClick={(e) => { handleRegister(e) }}
                                >
                                    REGISTER
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default StepTwoRegister;