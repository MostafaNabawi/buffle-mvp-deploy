import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getCountry, getStateOfCountry } from "../helper/Countey";
import style from "../style.module.css";
import { API_URL } from "../../../config";

const CompanyRegister = () => {
  const allCountry = getCountry();
  const [state, setState] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [inputs, setInputs] = useState({
    f_name: "",
    l_name: "",
    email: "",
    c_name: "",
    c_size: "",
    tax_id: "",
    website: "",
    head_office: "",
    country: "",
    city: "",
    state: "",
    street: "",
    postal: "",
    type: 1,
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
    // validate
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
  const emailExist = async (value) => {
    const req = await fetch(`${API_URL}/user/find`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        email: value,
      }),
    });
    const res = await req.json();
    if (res.payload) {
      alert("Email Already Taken!");
    }
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
                    <Col xl="3">
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
                    <Col xl="6">
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
                          onBlur={(e) => emailExist(e.target.value)}
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
                          name="c_name"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
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
                          name="c_size"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="">Size</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        <Icon
                          className={style.arrowSelect}
                          icon="ep:arrow-down-bold"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Tax ID *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Tax ID"
                          name="tax_id"
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
                          Web Site *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Web Site"
                          name="website"
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
                          Head Office
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Head Office"
                          name="head_office"
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
                    <Col xl="3">
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
                          <option>City</option>
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
                    <Col xl="3">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          State *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                          name="state"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option>State</option>
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
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Street *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Street ,Number"
                          name="street"
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
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          Postal code *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Postal code"
                          name="postal"
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
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
