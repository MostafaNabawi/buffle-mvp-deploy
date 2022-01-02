import { React,useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
const Login = () => {
  const [showPassword,setShowPassword]=useState(false)
  return (
    <div className='login-page'>
      <div className="login-card">
        <div className="login-header text-center pt-4">
          <Image src="/favicon.ico" />
          <div className="login-header-title mt-3">Enter your email and password.</div>
        </div>
        <div className="login-body">
          <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="login-lable-form">Your Email</Form.Label>
              <Form.Control className="login-form-input" type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="login-lable-form">Password</Form.Label>
              <div className="mb-4 input-group">
                <Form.Control className="login-form-input" type={`${showPassword ?"text":"password"}`} placeholder="Password" />
                <i onClick={()=>setShowPassword(!showPassword)} class="input-group-text login-form-input password-icon" id="btnGroupAddon">
                  {!showPassword?
                  <Icon  icon="akar-icons:eye" />
                :<Icon icon="clarity:eye-hide-line" />}
                </i>
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicCheckbox">
              <Form.Check type="checkbox"  className="login-lable-form mt-2" label="Check me out" />
              <Link className="forget-pass-link" to="">Forgot password?</Link>
            </Form.Group>

            <Button className="login-btn" type="submit">
              LOGIN
            </Button>
            <button className="login-btn-google mt-4" type="submit">
            <Icon className="google-icon" icon="flat-color-icons:google" />Login with Google
            </button>
          </Form>
        </div>
        <div className="login-footer">
        Don’t have account yet? <Link className="register-link" to="">Register now</Link >
        </div>
      </div>
    </div>
  );
};

export default Login;
