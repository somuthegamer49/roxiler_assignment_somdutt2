import React, { Fragment, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  let dispatch = useDispatch();
  let [email, setemail] = useState("");
  let [pass, setpass] = useState("");
  let navigate = useNavigate();

  const getEmail = (e) => {
    let text = String(e.target.value);
    setemail(text);
  };
  const getPass = (e) => {
    let text = String(e.target.value);
    setpass(text);
  };
  const submitLogin = (e) => {
    e.preventDefault();
    if (email !== "" && pass !== "") {
      let data = {
        email: email,
        password: pass,
      };
      axios
        .post("http://localhost:5000/roxiler/checkadmin", data)
        .then((res) => {
          let dataadmin = res.data.isadmin;
          let dataowner = res.data.isowner;
          let dataname = res.data.name;
          let dataid = res.data.id
          if (dataadmin === 1) {
            dispatch({
              type: "admin",
              payload: {dataadmin:dataadmin,dataid:dataid},
            });
            navigate("/");
          } else if (dataowner === 1) {
            dispatch({
              type: "owner",
              payload: {dataowner:dataowner,dataid:dataid},
            });
            navigate("/");
          } else {
            dispatch({
              type: "user",
              payload: {dataname:dataname,dataid:dataid},
            });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Fragment>
      <div className="login">
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => getEmail(e)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => getPass(e)}
            />
          </div>
          <button onClick={(e) => submitLogin(e)} className="btn btn-secondary">
            Login
          </button>
        </form>
        <p className="text-center">
          New User?{" "}
          <Link to="/register">
            <span style={{ color: "blue", cursor: "pointer" }}>Register</span>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
