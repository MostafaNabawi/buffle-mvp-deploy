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
    // form validation!
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
    // check semester 1 - 8
    if (Number(inputs.semester) < 1 || Number(inputs.semester) > 8) {
      addToast("Semester must be between 1 to 8!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    // check email
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
        <Row className="p-0 m-0">
          <Col xl="12">
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
                      <Form.Group className="mb-3" controlId="formBasicEmail">
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
                  </Row>
                  <Col xl="12">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>
                        E-mail *
                      </Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
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
                        Studies *
                      </Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder="studies"
                        name="studies"
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
                  <Row>
                    <Col xl="6">
                      <Form.Group className="mb-3">
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
                    <Col xl="6">
                      <Form.Group className="mb-3">
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
                    {loading ? <PulseLoader size={10} /> : "REGISTER"}
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
export default StudentRegister;
