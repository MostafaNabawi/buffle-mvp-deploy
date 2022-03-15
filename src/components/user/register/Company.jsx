import { React, useState, useContext, useMemo } from "react";
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
import { Context } from "../../../layout/Wrapper";
const CompanyRegister = () => {
  const context = useContext(Context);
  const allCountry = getCountry(context.getCurrent());
  const [state, setState] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [inputs, setInputs] = useState({
    f_name: "",
    l_name: "",
    email: "",
    c_name: "",
    tax_id: "",
    website: "",
    c_size: "",
    country: "",
    city: "",
    state: "",
    street: "",
    postal: "",
    type: 1,
    hnumber: "",
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
      console.log("Keys", key);
      if (key !== "tax_id" && key !== "website" && !inputs[key]) {
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
  const countryLists = useMemo(() => {
    if (allCountry) {
      const options = [];
      for (const key in allCountry) {
        options.push(
          <option value={key} key={`cs-${key}`}>
            {allCountry[key]}
          </option>
        );
      }
      return options;
    }
  }, [allCountry]);
  return (
    <div>
      {!sendEmail ? (
        <Row className="p-0 m-0 row">
          <Col xl="9">
            <div className={style.registerCard}>
              <div className={`${style.header}  text-center`}>
                <Image src="/favicon.ico" />
                <div className={`${style.headerTitle} my-3`}>
                  <FormattedMessage
                    id="personalAndCompanyInfo"
                    defaultMessage="Fields with an * are required"
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
                          defaultMessage="Hi, my name is..."
                          id="fname.plc"
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
                        <FormattedMessage
                          defaultMessage="My last name is"
                          id="lname.plc"
                        >
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
                        <FormattedMessage
                          defaultMessage="Your work e-mail"
                          id="email.plc"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="email"
                              placeholder={msg}
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
                          )}
                        </FormattedMessage>
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
                          defaultMessage="Name of the company"
                          id="cname.plc"
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
                        <FormattedMessage
                          defaultMessage="Select one"
                          id="csize.plc"
                        >
                          {(msg) => (
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
                                {msg}
                              </option>
                              <option value="10.001+">10.001+</option>
                              <option value="5.001-10.000">5.001-10.000</option>
                              <option value="1.001-5.000">1.001-5.000</option>
                              <option value="501-1.000">501-1.000</option>
                              <option value="201-500">201-500</option>
                              <option value="51-200">51-200</option>
                              <option value="11-50">11-50</option>
                              <option value="1-10">1-10</option>
                            </Form.Select>
                          )}
                        </FormattedMessage>

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
                        </Form.Label>
                        {/* <FormattedMessage defaultMessage="Tax ID" id="taxid"> */}
                        {/* {(msg) => ( */}
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="089089089"
                          name="tax_id"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        {/* )}
                        </FormattedMessage> */}
                      </Form.Group>
                    </Col>
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Website"
                            id="website"
                          />{" "}
                        </Form.Label>
                        {/* <FormattedMessage defaultMessage="WWW" id="website">
                          {(msg) => ( */}
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="WWW"
                          name="website"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        {/* )}
                        </FormattedMessage> */}
                      </Form.Group>
                    </Col>
                    {/* <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Head Office"
                            id="headOffice"
                          />
                          *
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
                    </Col> */}
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
                            defaultMessage="Select one"
                            id="csize.plc"
                          >
                            {(msg) => (
                              <option value="" disabled selected>
                                {msg}
                              </option>
                            )}
                          </FormattedMessage>
                          {countryLists}
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
                          <FormattedMessage
                            defaultMessage="Select one"
                            id="csize.plc"
                          >
                            {(msg) => (
                              <option value="" selected disabled>
                                {msg}
                              </option>
                            )}
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
                          <FormattedMessage defaultMessage="City" id="city" /> *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Los Santos"
                          id="city.plc"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              name="city"
                              placeholder={msg}
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

                    <Col xl="4">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Street"
                            id="street"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Grove Street."
                          id="street.plc"
                        >
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
                    <Col xl="4">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="House Number"
                            id="hnumber"
                          />{" "}
                          *
                        </Form.Label>
                        <FormattedMessage
                          defaultMessage="Precisely?"
                          id="hnumber.plc"
                        >
                          {(msg) => (
                            <Form.Control
                              className={style.formInput}
                              type="text"
                              placeholder={msg}
                              name="hnumber"
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
                    <Col xl="4">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          <FormattedMessage
                            defaultMessage="Postal code"
                            id="postal"
                          />{" "}
                          *
                        </Form.Label>

                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="80993"
                          name="postal"
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
