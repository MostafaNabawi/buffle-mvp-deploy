import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import style from "../style.module.css";
import { getCountry, getStateOfCountry } from "../helper/Countey";
import { API_URL } from "../../../config";
import { useToasts } from "react-toast-notifications";
import { checkEmail } from "../../../config/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { FormattedMessage } from "react-intl";

const StudentRegister = () => {
  const allCountry = getCountry();
  const [state, setState] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const { addToast } = useToasts();
  // inputs
  const [inputs, setInputs] = useState({
    f_name: "",
    l_name: "",
    email: "",
    university: "",
    country: "",
    city: "",
    heard: "",
    studies: "",
    semester: 0,
    type: 3,
  });
  const [loading, setLoading] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const getState = (code) => {
    if (code != "") {
      setState(getStateOfCountry(code));
    } else {
      setState("");
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
      addToast(<FormattedMessage id="email.token" defaultMessage="Email Already Taken." />, {
        appearance: "error",
      });
      setEmailAlreadyExist(true);
    } else {
      setEmailAlreadyExist(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // form validation!
    let errors = 0;
    for (const key in inputs) {
      if (!inputs[key]) {
        errors += 1;
        break;
      }
    }
    if (errors > 0) {
      addToast(<FormattedMessage id="fillAllForm" defaultMessage="Please Fill all Form." />, {
        appearance: "warning",
        autoDismiss: 4000,
      });

      return;
    }
    // emailExist Error
    if (emailAlreadyExist) {
      addToast(<FormattedMessage id="email.token" defaultMessage="Email Already Taken." />, {
        appearance: "error",
      });
      return;
    }
    // check semester 1 - 8
    if (Number(inputs.semester) < 1 || Number(inputs.semester) > 8) {
      addToast(<FormattedMessage id="semester.validate" defaultMessage="Semester must be between 1 to 8." />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    // check email
    if (!checkEmail(inputs.email)) {
      addToast(<FormattedMessage id="email.invalid" defaultMessage="Invalid email address." />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    setLoading(true);
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
    } else {
      setLoading(false);
      addToast(<FormattedMessage
        defaultMessage="Error Please Try Again."
        id="breakPlan.Error"
      />, {
        appearance: "error",
        autoDismiss: 8000,
      });
    }
  };
  return (
    <div>
      {!sendEmail ? (
        <Row className="p-0 m-0">
          <Col xl="12">
            <div className={style.registerCard}>
              <div className={`${style.header}  text-center pt-4`}>
                <div className={style.floatLeft}>1/2</div>
                <Image src="/favicon.ico" />
                <div className={`${style.headerTitle} mt-3`}>
                  <FormattedMessage id="enterInfo" defaultMessage="Enter your info" />
                </div>
              </div>
              <div className={style.body}>
                <Form>
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="First Name"
                            id="fname"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="First Name"
                          id="fname">
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="f_name"
                              disabled={loading}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          )}
                        </FormattedMessage>
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Last Name"
                            id="lname"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="Last Name"
                          id="lname">
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="l_name"
                              disabled={loading}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          )}
                        </FormattedMessage>
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
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        disabled={loading}
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
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="University"
                            id="un"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="University"
                          id="un">
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="university"
                              disabled={loading}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          )}
                        </FormattedMessage>
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
                          disabled={loading}
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
                        <FormattedMessage defaultMessage="Studies" id="study" />{" "}
                        *
                      </Form.Label>
                      <FormattedMessage defaultMessage="Studies" id="study">
                        {(msg) => (
                          <Form.Control
                            className={style.formInput}
                            type="text"
                            placeholder={msg}
                            name="studies"
                            disabled={loading}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                [e.target.name]: e.target.value,
                              })
                            }
                          />
                        )}
                      </FormattedMessage>
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Country"
                            id="country"
                          />{" "}
                          *
                        </Form.Label>
                        <Form.Select
                          name="country"
                          disabled={loading}
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
                          <FormattedMessage
                            defaultMessage="Country"
                            id="country"
                          >
                            {(msg) => <option value="">{msg}</option>}
                          </FormattedMessage>
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
                          <FormattedMessage defaultMessage="City" id="city" /> *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                          name="city"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <FormattedMessage defaultMessage="City" id="city">
                            {(msg) => <option value="">{msg}</option>}
                          </FormattedMessage>{" "}
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
                        <FormattedMessage
                          defaultMessage="How did you hear about buffle?"
                          id="how"
                        />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        className={style.formTextarea}
                        type="text"
                        name="heard"
                        disabled={loading}
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
                    disabled={loading}
                    onClick={(e) => {
                      handleRegister(e);
                    }}
                  >
                    {loading ? (
                      <PulseLoader size={10} />
                    ) : (
                      <FormattedMessage
                        defaultMessage="REGISTER"
                        id="btn.register"
                      />
                    )}
                  </Button>
                </Form>
              </div>
            </div>
            <div className={style.footer}>
              <FormattedMessage
                defaultMessage="Already have an account?"
                id="haveAccount"
              />{" "}
              <Link className={style.registerLink} to="/">
                <FormattedMessage defaultMessage="Login now" id="loginNow" />
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
              <FormattedMessage id="reg.sentEmail" defaultMessage="Message sent successfully to your email" />
            </h2>
            <h2 className="text-center mt-2">
              <FormattedMessage id="reg.continue" defaultMessage="Please check your email and continue from there" />
            </h2>
            <h6 className="text-center mt-2">
              <b><FormattedMessage id="app.note" defaultMessage="Note" />:</b> <FormattedMessage id="reg.time" defaultMessage="You have 2 hours to complete your registration." />
            </h6>
            <h4 className="text-center mt-2">
              <FormattedMessage id="link.clikc" defaultMessage="Click to open" /> <a href="http://gmail.com/"> <FormattedMessage id="label.email" defaultMessage="Email" /></a>
            </h4>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default StudentRegister;
