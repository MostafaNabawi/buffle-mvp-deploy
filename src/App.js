import "./styles/App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./components/user/forgetPassword/indes";
import RestPassword from "./components/user/restPassword";
import Register from "./pages/register";
import IndexRegister from "./components/user/register/index";
import CompanyRegister from "./components/user/register/Company";
import StudentRegister from "./components/user/register/Student";
import FreelancerRegister from "./components/user/register/Freelancer";
import StepTwoRegister from "./components/user/register/StepTwo";
import CompanyLogin from "./pages/companyLogin";
import Moneypool from "./pages/moneypool";
import Dashboard from "./pages/dashboard";
import Layout from "./layout/Layout";
import TaskManage from "./pages/taskManage";
import NewEvent from "./components/moneyPool/NewEvent";
import Event from "./components/moneyPool/Event";
import Expenses from "./components/moneyPool/Expenses";
import Profile from "./pages/profile";
import Setting from "./pages/setting";
import UserList from "./components/user/userList/UserList";
import { useEffect, useState } from "react";

function App() {
  const [addUserManagment, setAddUserManagment] = useState({
    render: false,
    type: "",
  });
  useEffect(() => {
    const space = localStorage.getItem("space");
    if (space === "c" || space === "a") {
      setAddUserManagment({
        render: true,
        type: space,
      });
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/">
          <Route index element={<Login />}/>
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="rest-password" element={<RestPassword/>} />
        </Route>
        <Route path="/register" element={<Register />}>
          <Route index element={<IndexRegister />} />
          <Route path="company" element={<CompanyRegister />} />
          <Route path="student" element={<StudentRegister />} />
          <Route path="freelancer" element={<FreelancerRegister />} />
          <Route path="step-two/:token" element={<StepTwoRegister />} />
        </Route>
        <Route path="/companyLogin" element={<CompanyLogin />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="taskmanagement" element={<TaskManage />} />
          <Route path="money-pool" element={<Moneypool />}>
            <Route index element={<NewEvent />} />
            <Route path="event" element={<Event />} />
            <Route path="event/expenses" element={<Expenses />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
          {addUserManagment.render && (
            <Route
              path="user-management"
              element={<UserList type={addUserManagment.type} />}
            />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
