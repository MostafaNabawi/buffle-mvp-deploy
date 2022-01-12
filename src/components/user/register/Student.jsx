import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import style from "../style.module.css";
import { getCountry, getStateOfCountry } from "../helper/Countey";
import { API_URL } from "../../../config";

const StudentRegister = () => {
  const allCountry = getCountry();
  const [state, setState] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  // inputs
  const [inputs, setInputs] = useState({
    f_name: "",
    l_name: "",
    email: "",
    university: "",
    country: "",
    city: "",
    heard: "",
    semester: 0,
    type: 3,
  });
  const getState = (code) => {
    if (code != "") {
      setState(getStateOfCountry(code));
    } else {
      setState("");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // form validation!

    const tokenaized = await fetch(`${API_URL}/auth/decode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(inputs),
    });
    if (tokenaized.status === 200) {
      setSendEmail(true);
    }
  };
  return (
    <div className={style.registerPage}>
      {!sendEmail ? (
        <Row className="p-0 m-0">
          <Col xl="8">
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
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          First Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="First Name"
                          name="f_name"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          last Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Last name"
                          name="l_name"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col xl="12">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>
                        E-mail *
                      </Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          University *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="University"
                          name="university"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Semester *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Semester"
                          name="semester"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Country *
                        </Form.Label>
                        <Form.Select
                          name="country"
                          onInput={(e) => {
                            getState(e.target.value);
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          className={style.formInput}
                          aria-label="Default select example"
                        >
                          <option value="">Country</option>
                          {allCountry &&
                            allCountry.map((country) => (
                              <option key={country.name} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                        </Form.Select>
                        <Icon
                          className={style.arrowSelect}
                          icon="ep:arrow-down-bold"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          City *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                          name="city"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="">City</option>
                          {state &&
                            state.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                        </Form.Select>
                        <Icon
                          className={style.arrowSelect}
                          icon="ep:arrow-down-bold"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col xl="12">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>
                        How did you hear about buffle?
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        className={style.formTextarea}
                        type="text"
                        name="heard"
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Button
                    className={style.submitBtn}
                    type="button"
                    onClick={(e) => {
                      handleRegister(e);
                    }}
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
export default StudentRegister;
