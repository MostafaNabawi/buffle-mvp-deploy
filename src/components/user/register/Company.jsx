import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getCountry, getStateOfCountry } from "../helper/Countey";
import style from "../style.module.css";
import { API_URL } from "../../../config";
import { useToasts } from "react-toast-notifications";
import { checkEmail } from "../../../config/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { FormattedMessage } from "react-intl";
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
  const [loading, setLoading] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const { addToast } = useToasts();

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
      addToast(
        <FormattedMessage
          id="email.token"
          defaultMessage="Email Already Taken."
        />,
        {
          appearance: "error",
        }
      );
      setEmailAlreadyExist(true);
    } else {
      setEmailAlreadyExist(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // validate
    let errors = 0;
    for (const key in inputs) {
      if (!inputs[key]) {
        errors += 1;
        break;
      }
    }
    if (errors > 0) {
      addToast(
        <FormattedMessage
          id="fillAllForm"
          defaultMessage="Please Fill all Form."
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
      return;
    }
    // emailExist Error
    if (emailAlreadyExist) {
      addToast(
        <FormattedMessage
          id="email.token"
          defaultMessage="Email Already Taken."
        />,
        {
          appearance: "error",
        }
      );
      return;
    }
    if (!checkEmail(inputs.email)) {
      addToast(
        <FormattedMessage
          id="email.invalid"
          defaultMessage="Invalid email address."
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
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
      addToast(
        <FormattedMessage
          id="company.registerError"
          defaultMessage="Error While Registring."
        />,
        {
          appearance: "error",
          autoDismiss: 8000,
        }
      );
    }
  };

  return (
    <div>
      {!sendEmail ? (
        <Row className="p-0 m-0 row">
          <Col xl="9">
            <div className={style.registerCard}>
              <div className={`${style.header}  text-center`}>
                <div className={style.floatLeft}>1/2</div>
                <Image src="/favicon.ico" />
                <div className={`${style.headerTitle} mt-3`}>
                  <FormattedMessage
                    id="personalAndCompanyInfo"
                    defaultMessage="Enter your personal and campany info"
                  />
                </div>
              </div>
              <div className={style.body}>
                <Form>
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="First Name"
                            id="fname"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="First Name"
                          id="fname"
                        >
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
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Last Name"
                            id="lname"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="Last Name" id="lname">
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
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          E-mail *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="email"
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
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Company Name"
                            id="cname"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Company Name"
                          id="cname"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              disabled={loading}
                              placeholder={msg}
                              name="c_name"
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Company Size"
                            id="csize"
                          />{" "}
                          *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                          name="c_size"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled selected>
                            size
                          </option>
                          <option value="10">1 - 10</option>
                          <option value="20">10 - 20</option>
                          <option value="50">20 - 50</option>
                          <option value="100">50 - 100</option>
                        </Form.Select>
                        <Icon
                          className={style.arrowSelect}
                          icon="ep:arrow-down-bold"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Tax ID"
                            id="taxid"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="Tax ID" id="taxid">
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="number"
                              placeholder={msg}
                              name="tax_id"
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
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Web Site"
                            id="website"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Web Site"
                          id="website"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="website"
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
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Head Office"
                            id="headOffice"
                          />{" "}
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Head Office"
                          id="headOffice"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="head_office"
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
                      <Form.Group className="mb-4">
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
                            allCountry.map((country) => {
                              if (country.name !== "NULL") {
                                return (
                                  <option
                                    key={country.name}
                                    value={country.code}
                                  >
                                    {country.name}
                                  </option>
                                );
                              }
                            })}
                        </Form.Select>
                        <Icon
                          className={style.arrowSelect}
                          icon="ep:arrow-down-bold"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl="3">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage defaultMessage="State" id="state" />{" "}
                          *
                        </Form.Label>
                        <Form.Select
                          className={style.formInput}
                          aria-label="Default select example"
                          name="state"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <FormattedMessage defaultMessage="State" id="state">
                            {(msg) => <option value="">{msg}</option>}
                          </FormattedMessage>
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
                      <Form.Group className="mb-4">
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
                          </FormattedMessage>
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Street"
                            id="street"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage defaultMessage="Street" id="street">
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="street"
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Postal code"
                            id="postal"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Postal code"
                          id="postal"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="number"
                              placeholder={msg}
                              name="postal"
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
                    <Row className="justify-content-center">
                      <Col xl="6">
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
                      </Col>
                    </Row>
                  </Row>
                </Form>
              </div>
              <div className={style.footer}>
                <FormattedMessage
                  defaultMessage="Already have an account?"
                  id="haveAccount"
                />
                <Link className={style.registerLink} to="/">
                  <FormattedMessage defaultMessage="Login now" id="loginNow" />
                </Link>
              </div>
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
              <FormattedMessage
                id="reg.sentEmail"
                defaultMessage="Message sent successfully to your email"
              />
            </h2>
            <h2 className="text-center mt-2">
              <FormattedMessage
                id="reg.continue"
                defaultMessage="Please check your email and continue from there"
              />
            </h2>
            <h6 className="text-center mt-2">
              <b>
                <FormattedMessage id="app.note" defaultMessage="Note" />:
              </b>{" "}
              <FormattedMessage
                id="reg.time"
                defaultMessage="You have 2 hours to complete your registration."
              />
            </h6>
            {/* <h4 className="text-center mt-2">
              <FormattedMessage id="link.clikc" defaultMessage="Click to open" /> <a href="http://gmail.com/"> <FormattedMessage id="label.email" defaultMessage="Email" /></a>
            </h4> */}
          </Col>
        </Row>
      )}
    </div>
  );
};
export default CompanyRegister;
