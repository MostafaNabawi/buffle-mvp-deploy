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
      addToast("Email Already Taken!", {
        appearance: "error",
      });
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
      addToast("Please Fill all Form!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    // emailExist Error
    if (emailAlreadyExist) {
      addToast("Email Already Taken!", {
        appearance: "error",
      });
      return;
    }
    if (!checkEmail(inputs.email)) {
      addToast("Invalid Email Address!", {
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
      addToast("Error While Registring!!", {
        appearance: "error",
        autoDismiss: 8000,
      });
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
                  Enter your personal and campany info
                </div>
              </div>
              <div className={style.body}>
                <Form>
                  <Row>
                    <Col xl="3">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          First Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="First Name"
                          name="f_name"
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
                    <Col xl="3">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          last Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Last name"
                          name="l_name"
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
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          E-mail *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="email"
                          placeholder="Enter email"
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
                          Company Name *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          disabled={loading}
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          Company Size*
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
                    <Col xl="3">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          Tax ID *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Tax ID"
                          name="tax_id"
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
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Web Site *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Web Site"
                          name="website"
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
                    <Col xl="6">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className={style.lableForm}>
                          Head Office
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Head Office"
                          name="head_office"
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
                    <Col xl="6">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          Country *
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          City *
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          State *
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
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          Street *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="text"
                          placeholder="Street ,Number"
                          name="street"
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
                    <Col xl="6">
                      <Form.Group className="mb-4">
                        <Form.Label className={style.lableForm}>
                          Postal code *
                        </Form.Label>
                        <Form.Control
                          className={style.formInput}
                          type="number"
                          placeholder="Postal code"
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
                          {loading ? <PulseLoader size={10} /> : "REGISTER"}
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
            <h6 className="text-center mt-2">
              <b>Note:</b> You have 2 houres to complete your registration!
            </h6>
            <h4 className="text-center mt-2">
              Click open <a href="http://gmail.com/"> Email</a>
            </h4>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default CompanyRegister;
