import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}>
          <Route index element={<IndexRegister />} />
          <Route path="company" element={<CompanyRegister />} />
          <Route path="student" element={<StudentRegister />} />
          <Route path="freelancer" element={<FreelancerRegister />} />
          <Route path="step-tow/:type/:id" element={<StepTwoRegister />} />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
