import { Fragment } from "react/jsx-runtime";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SystenAdmin from "./Components/SystenAdmin";
import Register from "./Components/Register";
import { useSelector } from "react-redux";
import Dashboard from "./Components/Dashboard";
import Addstore from "./Components/Addstore";
import Adduser from "./Components/Adduser";
import Viewstore from "./Components/Viewstore";
import Viewuser from "./Components/Viewuser";
import Changepass from './Components/Changepass';

function App() {
  let isadmin = useSelector((state) => state.isadmin);
  let isowner = useSelector((state) => state.isowner);
  let isuser = useSelector((state) => state.isuser);
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              isadmin === 1 || isowner === 1 || isuser !== "" ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/changepassword"
            element={
              isadmin === 1 || isowner === 1 || isuser !== "" ? (
                <Changepass />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={isadmin === 1 ? <SystenAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path="/addstore"
            element={isadmin === 1 ? <Addstore /> : <Navigate to="/login" />}
          />
          <Route
            path="/adduser"
            element={isadmin === 1 ? <Adduser /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewuser"
            element={
              isadmin === 1 || isowner === 1 ? (
                <Viewuser />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/viewstore"
            element={
              isadmin === 1 || isowner === 1 || isuser !== "" ? (
                <Viewstore />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isowner === 1 ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
