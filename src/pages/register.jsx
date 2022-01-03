import { React, useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import UserRegister from "../components/user/register/UserRegister";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
   <>
      <UserRegister/>
   </>
  );
};

export default Register;
