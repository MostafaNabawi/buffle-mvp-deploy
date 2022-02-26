import "./styles/App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./components/user/forgetPassword/indes";
import RestPassword from "./components/user/restPassword";
import InviteRegister from "./components/user/invite-register/inviteRegister";
import Register from "./pages/register";
import IndexRegister from "./components/user/register/index";
import CompanyRegister from "./components/user/register/Company";
import StudentRegister from "./components/user/register/Student";
import FreelancerRegister from "./components/user/register/Freelancer";
import StepTwoRegister from "./components/user/register/StepTwo";
import CompanyLogin from "./pages/companyLogin";
import Moneypool from "./pages/moneypool";
import FeelReport from "./pages/feelReport";
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
import UserListAdmin from "./components/user/userList/UserListAdmin";
import SpotifyLogin from "./components/spotify/Login";
import Hashtag from "./pages/hashtag";
import { useSelector } from "react-redux";
function App() {
  const { space } = useSelector((state) => state.user);
  const [addUserManagment, setAddUserManagment] = useState({
    render: false,
    type: "",
  });
  useEffect(() => {
    const space = localStorage.getItem("space");
    if (space === "c" || space === "a") {
      setAddUserManagment((prev) => {
        return { ...prev, render: true, type: space };
      });
    }
  }, [space]);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password/:token" element={<RestPassword />} />
          <Route
            path="register/:campanyName/:companyId"
            element={<InviteRegister />}
          />
        </Route>
        <Route path="/register" element={<Register />}>
          <Route index element={<IndexRegister />} />
          <Route path="company" element={<CompanyRegister />} />
          <Route path="student" element={<StudentRegister />} />
          <Route path="freelancer" element={<FreelancerRegister />} />
          <Route path="step-two/:token" element={<StepTwoRegister />} />
        </Route>
        <Route path="/companyLogin" element={<CompanyLogin />} />
        <Route path="/dashboard/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="feel-report" element={<FeelReport />} />
          <Route path="taskmanagement" element={<TaskManage />} />
          <Route path="money-pool" element={<Moneypool />}>
            <Route index element={<NewEvent />} />
            <Route path="event/:id" element={<Event />} />
            <Route path="event/expenses/:id" element={<Expenses />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />

          {addUserManagment.render && (
            <Route
              path="user-management"
              element={
                addUserManagment.type === "c" ? <UserList /> : <UserListAdmin />
              }
            />
          )}
        </Route>
        <Route path="/spotify" element={<Layout />}>
          <Route index element={<SpotifyLogin />} />
        </Route>
        <Route path="/hashtag" element={<Layout />}>
          <Route path="/hashtag/:tag" element={<Hashtag />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
