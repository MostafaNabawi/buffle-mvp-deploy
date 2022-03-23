import { React, useEffect, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import style from "../style.module.css";
import { API_URL } from "../../../config";
import { useToasts } from "react-toast-notifications";
import PulseLoader from "react-spinners/PulseLoader";
import { FormattedMessage } from "react-intl";

const StepTwoRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    c_password: "",
  });
  const [expired, setExpired] = useState(false);
  const [already, setAlready] = useState({});
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  // register function
  const handleRegister = async (e) => {
    e.preventDefault();
    // check inputs
    if (inputs.password === "") {
      addToast(
        <FormattedMessage
          defaultMessage="Please Enter Password"
          id="enterPass"
        />,
        {
          appearance: "warning",
          autoDismiss: 6000,
        }
      );
      return;
    }
    if (inputs.c_password === "") {
      addToast(
        <FormattedMessage
          defaultMessage="Please Enter Confirm Password"
          id="enterPass2"
        />,
        {
          appearance: "warning",
          autoDismiss: 6000,
        }
      );
      return;
    }
    if (inputs.password !== inputs.c_password) {
      addToast(
        <FormattedMessage
          defaultMessage="Password do not match."
          id="passNot"
        />,
        {
          appearance: "warning",
          autoDismiss: 6000,
        }
      );
      return;
    }
    if (inputs.password.length < 6) {
      addToast(
        <FormattedMessage
          defaultMessage="Password must be at least 6 chracters."
          id="passLimit"
        />,
        {
          appearance: "warning",
          autoDismiss: 6000,
        }
      );
      return;
    }
    setLoading(true);
    // #1- register for company
    if (already?.type === 1) {
      const req = await fetch(`${API_URL}/auth/signup/company`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: already.email,
          firstname: already.f_name,
          lastname: already.l_name,
          password: inputs.password,
          companyName: already.c_name,
          taxId: already?.tax_id || "",
          website: already?.website || "",
          city: already.city,
          country: already.country,
          state: already?.state,
          postal: already.postal,
          street: already.street,
          houseNumber: already?.hnumber,
          companySize: already.c_size,
        }),
      });
      const res = await req.json();
      if (req.status === 200) {
        navigate("/?company=true");
      } else {
        setLoading(false);
        setExpired(true);
      }
    }
    // #2- register for freelancer
    if (already.type === 2) {
      const req = await fetch(`${API_URL}/auth/signup/freelancer`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: already.email,
          firstname: already.f_name,
          lastname: already.l_name,
          password: inputs.password,
          profession: already.profession,
          city: already.city,
          country: already.country,
          heard: already.heard,
        }),
      });
      const res = await req.json();
      if (req.status === 200) {
        setLoading(false);
        localStorage.setItem("pp", inputs.password);
        navigate(`/?new=true&email=${already.email}`);
      } else {
        setLoading(false);
        setExpired(true);
      }
    }
    // #3- register for student
    if (already?.type === 3) {
      const req = await fetch(`${API_URL}/auth/signup/student`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: already.email,
          firstname: already.f_name,
          lastname: already.l_name,
          password: inputs.password,
          university: already.university,
          semester: already.semester,
          city: already.city,
          country: already.country,
          heard: already.heard,
        }),
      });
      if (req.status === 200) {
        setLoading(false);
        localStorage.setItem("pp", inputs.password);
        navigate(`/?new=true&email=${already.email}`);
      } else {
        setLoading(false);
        setExpired(true);
      }
    }
  };
  useEffect(() => {
    async function encdoeToken(jwt) {
      const req = await fetch(`${API_URL}/auth/encode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          token: jwt,
        }),
      });
      const res = await req.json();
      if (req.status === 401) {
        setExpired(true);
      }
      if (req.status === 200) {
        setAlready(res.payload);
      }
    }
    if (token) {
      encdoeToken(token);
    }
  }, [token]);
  if (expired) {
    return (
      <div className={style.StepTowPage}>
        <Row className="p-0 m-0 row">
          <Col xl="8">
            <h2>
              <FormattedMessage
                defaultMessage="Registrtion has been expired."
                id="expired"
              />
            </h2>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className={style.StepTowPage}>
      <Row className="p-0 m-0 row mt-5 pt-5">
        <Col xl="12">
          <div className={style.registerCard}>
            <div className={`${style.header}  text-center pt-4`}>
              <div className={style.floatLeft}>2/2</div>
              <Image src="/1.png" className="big-logo2" />
              <div className={`${style.headerTitle} mt-3`}>
                <FormattedMessage
                  defaultMessage="Set your Password"
                  id="setPassword"
                />
              </div>
            </div>
            <div className={style.body}>
              <Form>
                <Col xl="12">
                  <Form.Group className="mb-5">
                    <Form.Label className={style.lableForm}>
                      Password *
                    </Form.Label>
                    <div className="mb-4 input-group">
                      <Form.Control
                        className={style.formInput}
                        type={`${showPassword ? "text" : "password"}`}
                        placeholder="Password"
                        name="password"
                        disabled={loading}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            [e.target.name]: e.target.value,
                          })
                        }
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
                <Col xl="12">
                  <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Label className={style.lableForm}>
                      <FormattedMessage
                        defaultMessage="Confirm password"
                        id="confirmPass"
                      />
                      *
                    </Form.Label>
                    <div className="mb-4 input-group">
                      <FormattedMessage
                        defaultMessage="Confirm password"
                        id="confirmPass"
                      >
                        {(msg) => (
                          <Form.Control
                            className={style.formInput}
                            type={`${showPassword ? "text" : "password"}`}
                            placeholder={msg}
                            name="c_password"
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
                  onClick={(e) => handleRegister(e)}
                  disabled={loading}
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
        </Col>
      </Row>
    </div>
  );
};
export default StepTwoRegister;
