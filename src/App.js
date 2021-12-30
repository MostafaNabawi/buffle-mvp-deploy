import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import CompanyLogin from "./pages/companyLogin";
import Moneypool from "./pages/moneypool";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companyLogin" element={<CompanyLogin />} />
        <Route path="/moneypool" element={<Moneypool />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
