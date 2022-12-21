import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Setting from "./components/Setting";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="sign_in" element={<Login />} />
        <Route path="sign_up" element={<Signup />} />
        {/* Secure Routes */}
        <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth />}>
          <Route element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting />} />
            <Route />
          </Route>
        </Route>
        </Route>
        {/* Secure Routes End */}
      </Route>
    </Routes>
  );
}

export default App;
