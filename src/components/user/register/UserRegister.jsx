import { React, useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import style from '../style.module.css'
const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={style.registerPage}>
      <div className={style.card}>
        <div className={`${style.header}  text-center pt-4`}>
          <Image src="/favicon.ico" />
          <div className={`${style.headerTitle} mt-3`}>
            Enter your info
          </div>
        </div>
        <div className={style.body}>
          <Form>
          <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className={style.lableForm}>Name</Form.Label>
              <Form.Control
                className={style.formInput}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className={style.lableForm}>Your Email</Form.Label>
              <Form.Control
                className={style.formInput}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className={style.lableForm}>Password</Form.Label>
              <div className="mb-4 input-group">
                <Form.Control
                  className={style.formInput}
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
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
            </Form.Group>

            <Button className={style.submitBtn} type="submit">
                    REGISTER
            </Button>
            <button className={`${style.btnGoogle } mt-4`} type="submit">
              <Icon className="google-icon" icon="flat-color-icons:google" />
              Register with Google
            </button>
          </Form>
        </div>
      </div>
      <div className={style.footer}>
        Do have account yet?{" "}
        <Link className={style.registerLink} to="/login">
          Login now
        </Link>
      </div>
    </div>
  );
};
export default UserRegister;