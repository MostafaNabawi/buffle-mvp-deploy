import { React, useState, useEffect, useContext } from "react";
import { Row, Col, Image, Form, Button, Alert } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import { signin, userStatus } from "../../../api";
import PulseLoader from "react-spinners/PulseLoader";
import GoogleLogin from "react-google-login";
import { API_URL, GOOGLE_CLIENT_ID } from "../../../config";
import { checkEmail } from "../../../config/utils";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Context } from "../../../layout/Wrapper";
const UserLogin = () => {
  const { addToast } = useToasts();
  const context = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    serverError: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // actions

  // #1-login for signups
  const mutulLogin = async (email, pass) => {
    setLoading(true);
    const req = await signin({ email: email, password: pass });
    if (req.status === 400) {
      setLoading(false);
      addToast(<FormattedMessage id="invalidEmailAndPassword" defaultMessage="Email or Password  is invalid." />, {
        appearance: "error",
        autoDismiss: 4000,
      });
      return;
    }
    if (req.status === 200) {
      if (req.data.type === 0) {
        addToast(req.data.msg, {
          appearance: "warning",
          autoDismiss: 8000,
        });
        setLoading(false);
      }
      if (req.data.type === 1) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", req?.data?.stype);
        localStorage.setItem("others", JSON.stringify(req?.data?.others));
        localStorage.removeItem("pp");
        navigate("/dashboard");
      }
      if (req.data.type === 2) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", req?.data?.stype);
        localStorage.setItem("others", JSON.stringify(req?.data?.others));
        localStorage.setItem("current", req?.data?.current);
        localStorage.removeItem("pp");
        navigate("/dashboard");
      }
    }
  };
  // login by button
  const handleLogin = async (event) => {
    event.preventDefault();
    if (inputs.email === "") {
      setErrors((previousState) => {
        return {
          ...previousState,
          emailError: (
            <FormattedMessage
              defaultMessage="Email is required."
              id="email.required"
            />
          ),
          passwordError: "",
        };
      });
      return;
    }
    if (inputs.password === "") {
      setErrors((previousState) => {
        return {
          ...previousState,
          passwordError: (
            <FormattedMessage
              defaultMessage="Password is required."
              id="pass.required"
            />
          ),
          emailError: "",
        };
      });
      return;
    }
    if (!checkEmail(inputs.email)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          emailError: (
            <FormattedMessage
              defaultMessage="Email is invalid."
              id="email.invalid"
            />
          ),
          passwordError: "",
        };
      });
      return;
    }
    setErrors((previousState) => {
      return {
        ...previousState,
        serverError: "",
      };
    });
    setLoading(true);
    const req = await signin(inputs);
    if (req.status === 400) {
      setErrors((previousState) => {
        return {
          ...previousState,
          serverError: (
            <FormattedMessage
              defaultMessage="⛔ Email or Password is incorrect."
              id="invalidEmailAndPassword"
            />
          ),
        };
      });
      setLoading(false);
      return;
    }
    if (req.status === 200) {
      const prefrence = await fetch(`${API_URL}/user/settings`, {
        credentials: "include",
      });
      const prefrenceData = await prefrence.json();
      if (prefrenceData?.data) {
        localStorage.setItem("prefrence", JSON.stringify(prefrenceData?.data));
        context.selectLanguage(prefrenceData?.language);
      }
      if (req.data.type === 0) {
        setErrors((previousState) => {
          return {
            ...previousState,
            serverError: `⛔ ${req?.data?.msg}`,
          };
        });
        setLoading(false);
        return;
      }

      if (req.data.type === 1) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", req?.data?.stype);
        localStorage.setItem("others", JSON.stringify(req?.data?.others));
        navigate("/dashboard");
      }
      if (req.data.type === 2) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", req?.data?.stype);
        localStorage.setItem("others", JSON.stringify(req?.data?.others));
        localStorage.setItem("current", req?.data?.current);
        navigate("/dashboard");
      }
    }
  };
  const responseGoogleSuccess = async (response) => {
    Swal.fire({
      title: "Loading...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
      html: `<div aria-busy="true" class="">
          <svg width="40" height="40" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" aria-label="audio-loading"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="green" stop-opacity="0" offset="0%"></stop><stop stop-color="green" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="green" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)"><path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="green" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="#fff" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g></g></svg>
          </div>`,
      customClass: { container: "swal-google" },
    });
    const req = await fetch(`${API_URL}/auth/v1/auth/google`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.tokenId,
      }),
    });
    const res = await req.json();
    if (req.status === 200) {
      if (res.type === 0) {
        addToast(`${res?.msg}⛔`, {
          appearance: "warning",
          autoDismiss: 8000,
        });
        setLoading(false);
        return;
      }
      const prefrence = await fetch(`${API_URL}/user/settings`, {
        credentials: "include",
      });
      const prefrenceData = await prefrence.json();
      if (prefrenceData?.data) {
        localStorage.setItem("prefrence", JSON.stringify(prefrenceData?.data));
        context.selectLanguage(prefrenceData?.language);
      }
      if (res.type === 1) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("space", res.stype);
        localStorage.setItem("others", JSON.stringify(res.others));
        window.location.href = `${window.location.href}dashboard`;
      }
      if (res.type === 2) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("space", res?.stype);
        localStorage.setItem("others", JSON.stringify(res?.others));
        localStorage.setItem("current", res?.current);
        window.location.href = `${window.location.href}dashboard`;
      }
    } else {
      document.getElementsByClassName("swal-google")[0].remove();
      setErrors((previousState) => {
        return {
          ...previousState,
          serverError: (
            <FormattedMessage
              defaultMessage="Error while signin with Google"
              id="login.googleError"
            />
          ),
        };
      });
    }
    // if (req.status === 200) {
    //   if (res.type === 1) {
    //     console.log(res.data);
    //     localStorage.setItem("user", JSON.stringify(res.user));
    //     localStorage.setItem("space", res?.stype);
    //     document.getElementsByClassName("swal-google")[0].remove();
    //     navigate("/dashboard");
    //   }
    //   if (res.type === 2) {
    //     localStorage.setItem("user", JSON.stringify(res.user));
    //     localStorage.setItem("space", res?.stype);
    //     document.getElementsByClassName("swal-google")[0].remove();
    //     navigate("/dashboard");
    //   }
    // } else {
    //   Swal.update({
    //     icon: "error",
    //     text: "No user found by this email!",
    //     title: "Invalid",
    //     showConfirmButton: true,
    //     allowOutsideClick: true,
    //     html: "",
    //   });
    // }
  };
  const responseGoogleFailur = (response) => {
    document.getElementsByClassName("swal-google")[0].remove();
    setErrors((previousState) => {
      return {
        ...previousState,
        serverError: (
          <FormattedMessage
            defaultMessage="Error while signin with Google"
            id="login.googleError"
          />
        ),
      };
    });
    addToast(<FormattedMessage
      defaultMessage="Error while signin with Google"
      id="login.googleError"
    />, {
      appearance: "error",
      autoDismiss: 5000,
    });
  };
  useEffect(() => {
    let mount = true;
    async function getStatus() {
      const req = await userStatus();
      if (req.status === 200) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("user");
      }
    }
    if (mount) {
      const user_storage = JSON.parse(localStorage.getItem("user"));
      if (user_storage) {
        getStatus();
      }
    }
    if (searchParams.get("new") === "true") {
      console.log("login", searchParams.get("email"));
      mutulLogin(searchParams.get("email"), localStorage.getItem("pp"));
    }
    if (searchParams.get("company") === "true") {
      addToast(
        <FormattedMessage id="company.reigisterMsg" defaultMessage="Your company is registered. We will let you know, once we approved your company." />,
        {
          appearance: "success",
        }
      );
    }

    return () => {
      mount = false;
    };
  }, []);
  return (
    <div className={style.loginPage}>
      <Row className="m-0 justify-content-center">
        <Col className="col-lg-4 col-sm-6 col-xs-12">
          <div className={style.card}>
            <div className={`${style.header}  text-center pt-4`}>
              <Image src="/favicon.ico" />
              <div className={`${style.headerTitle} mt-3`}>
                <FormattedMessage
                  defaultMessage="Enter your email and password."
                  id="app.login.header"
                />
              </div>
            </div>
            <div className={style.body}>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className={style.lableForm}>
                    <FormattedMessage
                      defaultMessage="Your Email"
                      id="app.login.your"
                    />
                  </Form.Label>
                  <FormattedMessage
                    id="app.enterEmail"
                    defaultMessage="Enter Email"
                  >
                    {(msg) => (
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        isInvalid={errors.emailError !== ""}
                        placeholder={msg}
                        name="email"
                        disabled={loading}
                        onChange={(e) => {
                          if (e.target.value) {
                            setErrors((previous) => {
                              return { ...previous, emailError: "" };
                            });
                          }
                          setInputs({
                            ...inputs,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    )}
                  </FormattedMessage>
                  {errors.emailError !== "" && (
                    <Form.Control.Feedback type="invalid">
                      {errors.emailError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label className={style.lableForm}>
                    <FormattedMessage
                      id="app.password"
                      defaultMessage="Password"
                    />
                  </Form.Label>
                  <div className="mb-4 input-group">
                    <FormattedMessage
                      id="app.password"
                      defaultMessage="Password"
                    >
                      {(msg) => (
                        <Form.Control
                          className={style.formInput}
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder={msg}
                          name="password"
                          isInvalid={errors.passwordError !== ""}
                          disabled={loading}
                          onChange={(e) => {
                            if (e.target.value) {
                              setErrors((previous) => {
                                return { ...previous, passwordError: "" };
                              });
                            }
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormattedMessage>
                    {errors.passwordError !== "" && (
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordError}
                      </Form.Control.Feedback>
                    )}
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
                {errors.serverError !== "" && (
                  <Form.Group>
                    <Alert variant="danger" style={{ textAlign: "center" }}>
                      {" "}
                      {errors.serverError}{" "}
                    </Alert>
                  </Form.Group>
                )}
                <Form.Group className="mb-4" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    className={`${style.lableForm} mt-2`}
                    label={
                      <FormattedMessage
                        id="rememberMe"
                        defaultMessage="Remember me."
                      />
                    }
                    disabled={loading}
                  />
                  <Link
                    className={`${style.forgetPassLink}`}
                    to="/forget-password"
                  >
                    <FormattedMessage
                      id="app.login.forget"
                      defaultMessage="Forget password?"
                    />
                  </Link>
                </Form.Group>

                <Button
                  className={style.submitBtn}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <PulseLoader size={10} />
                  ) : (
                    <FormattedMessage id="app.login" defaultMessage="LOGIN" />
                  )}
                </Button>
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      className={`${style.btnGoogle} mt-4`}
                      type="button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <Icon
                        className={style.googleIcon}
                        icon="flat-color-icons:google"
                      />
                      <FormattedMessage
                        id="app.login.google"
                        defaultMessage="Login with Google"
                      />
                    </button>
                  )}
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFailur}
                  cookiePolicy={"single_host_origin"}
                />

                {/* <button
                  className={`${style.btnGoogle} mt-4`}
                  type="button"
                  disabled={loading}
                >
                  <Icon
                    className={style.googleIcon}
                    icon="flat-color-icons:google"
                  />
                  Login with Google
                </button> */}
              </Form>
            </div>
          </div>
          <div className={style.footer}>
            <FormattedMessage
              id="app.noAccount"
              defaultMessage="Don’t have account yet?"
            />
            <Link className={style.registerLink} to="/register">
              <FormattedMessage
                id="app.signupHere"
                defaultMessage="Register now"
              />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default UserLogin;
