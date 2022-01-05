import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import CompanyRegister from './components/user/register/Company'
import StudentRegister from './components/user/register/Student'
import FreelancerRegister from './components/user/register/Freelancer'
import StepTwoRegister from "./components/user/register/StepTwo";
import CompanyLogin from "./pages/companyLogin";
import Moneypool from "./pages/moneypool";
import Dashboard from "./pages/dashboard";
import Layout from "./layout/Layout";
import TaskManage from "./pages/taskManage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} >
          <Route index element={<CompanyRegister/>}/>
          <Route path='student' element={<StudentRegister/>}/>
          <Route path='freelancer' element={<FreelancerRegister/>}/>
          <Route path='step-tow/:type/:id' element={<StepTwoRegister/>}/>
        </Route>
        <Route path="/companyLogin" element={<CompanyLogin />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="taskmanagement" element={<TaskManage />} />
          <Route path="moneypool" element={<Moneypool />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
