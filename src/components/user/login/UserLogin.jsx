import { React, useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import style from "../style.module.css";
import { signin, userStatus } from "../../../api";
const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    // check inputs
    const req = await signin(inputs);
    if (req.status === 400) {
      console.log(req.data);
      return;
    }
    if (req.status === 200) {
      localStorage.setItem("user", JSON.stringify(req.data));
      navigate("/dashboard");
    }
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
                    type="email"
                    placeholder="Enter email"
                    name="email"
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
                  />
                  <Link className={`${style.forgetPassLink}`} to="">
                    Forgot password?
                  </Link>
                </Form.Group>

                <Button className={style.submitBtn} type="submit">
                  LOGIN
                </Button>
                <button className={`${style.btnGoogle} mt-4`} type="button">
                  <Icon
                    className={style.googleIcon}
                    icon="flat-color-icons:google"
                  />
                  Login with Google
                </button>
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
