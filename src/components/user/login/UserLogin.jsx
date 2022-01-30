import { React, useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
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
const UserLogin = () => {
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const { ok } = useParams();
  const mutulLogin = async (email, pass) => {
    setLoading(true);
    const req = await signin({ email: email, password: pass });
    if (req.status === 400) {
      setLoading(false);
      addToast("Email or Password  is invalid!", {
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
      console.log("rr ", req);
      if (req.data.type === 1) {
        console.log(req.data);
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", JSON.stringify(req?.data?.stype));
        localStorage.removeItem("pp");
        navigate("/dashboard");
      }
      if (req.data.type === 2) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", JSON.stringify(req?.data?.stype));
        localStorage.removeItem("pp");
        navigate("/dashboard");
      }
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (inputs.email === "" || inputs.password === "") {
      addToast("Email and Password are required!👀", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    if (!checkEmail(inputs.email)) {
      addToast("Invalid Email!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    setLoading(true);
    const req = await signin(inputs);
    if (req.status === 400) {
      setLoading(false);
      addToast("Email or Password  is invalid!", {
        appearance: "error",
        autoDismiss: 4000,
      });
      return;
    }
    if (req.status === 200) {
      if (req.data.type === 0) {
        addToast(`${req.data.msg}⛔`, {
          appearance: "warning",
          autoDismiss: 8000,
        });
        setLoading(false);
        return;
      }

      if (req.data.type === 1) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", JSON.stringify(req?.data?.stype));
        localStorage.setItem("others", JSON.stringify(req?.data?.others));
        navigate("/dashboard");
      }
      if (req.data.type === 2) {
        localStorage.setItem("user", JSON.stringify(req.data.user));
        localStorage.setItem("space", JSON.stringify(req?.data?.stype));
        navigate("/dashboard");
      }
    }
  };
  const responseGoogleSuccess = async (response) => {
    console.log("ok", response);
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
      if (res.type === 1) {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("space", JSON.stringify(res?.stype));
        document.getElementsByClassName("swal-google")[0].remove();
        navigate("/dashboard");
      }
      if (res.type === 2) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("space", JSON.stringify(res?.stype));
        document.getElementsByClassName("swal-google")[0].remove();
        navigate("/dashboard");
      }
    } else {
      Swal.update({
        icon: "error",
        text: "No user found by this email!",
        title: "Invalid",
        showConfirmButton: true,
        allowOutsideClick: true,
        html: "",
      });
    }
  };
  const responseGoogleFailur = (response) => {
    console.log("failed", response);
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
        "Your company registered when your company approved by Buffle we will send you email!",
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
                Enter your email and password.
              </div>
            </div>
            <div className={style.body}>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className={style.lableForm}>
                    Your Email
                  </Form.Label>
                  <Form.Control
                    className={style.formInput}
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    disabled={loading}
                    onChange={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label className={style.lableForm}>Password</Form.Label>
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
                <Form.Group className="mb-4" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    className={`${style.lableForm} mt-2`}
                    label="Check me out"
                    disabled={loading}
                  />
                  <Link
                    className={`${style.forgetPassLink}`}
                    to="/forget-password"
                  >
                    Forgot password?
                  </Link>
                </Form.Group>
                <Button
                  className={style.submitBtn}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <PulseLoader size={10} /> : "LOGIN"}
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
                      Login with Google
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
            Don’t have account yet?{" "}
            <Link className={style.registerLink} to="/register">
              Register now
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default UserLogin;
