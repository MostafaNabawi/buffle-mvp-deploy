import { React, useEffect, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getCountry, getStateOfCountry } from "../helper/Countey";
import style from "../style.module.css";
const CompanyRegister = () => {
  const allCountry = getCountry();
  const [state, setState] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const getState = (code) => {
    if (code != "") {
      setState(getStateOfCountry(code));
    } else {
      setState("");
    }
  };

  const handleRegister = () => {
    setSendEmail(true);
  };

  return (
    <div className={style.registerPage}>
      {!sendEmail ? (
        <Row className="p-0 m-0 row">
          <Col xl="9">
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
                    <Col xl="3">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          First Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="First Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          last Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Last name"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          E-mail *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Company Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Company Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Company Size*
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                        >
                          <option></option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Tex ID *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Tex ID"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Web Site *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Web Site"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Head Office
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Head Office"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Country *
                        </Form.Label>
                        <Form.Select
                          onInput={(e) => {
                            getState(e.target.value);
                          }}
                          className={style.formInput}
                          aria-label="Default select example"
                        >
                          <option value=""></option>
                          {allCountry &&
                            allCountry.map((country) => (
                              <option key={country.name} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          City *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                        >
                          <option></option>
                          {state &&
                            state.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          State *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                        >
                          <option></option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Street *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Street ,Number"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Postal code *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Postal code"
                        />
                      </Form.Group>
                    </Col>
                    <Row className="justify-content-center">
                      <Col xl="6">
                        <Button
                          className={style.submitBtn}
                          type="button"
                          onClick={(e) => {
                            handleRegister(e);
                          }}
                        >
                          REGISTER
                        </Button>
                      </Col>
                    </Row>
                  </Row>
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
      ) : (
        <Row className="p-0 m-0 row justify-content-center">
          <Col>
            <div className={style.iconCheck}>
              <Icon icon="emojione:white-heavy-check-mark" />
            </div>
            <h2 className="text-center mt-2">
              Message sent successfully to your email
            </h2>
            <h2 className="text-center mt-2">
              Please check your email and continue registering from here.
            </h2>
            <h4 className="text-center mt-2">
              Cleck open <a href="http://gmail.com/"> Email</a>
            </h4>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default CompanyRegister;
