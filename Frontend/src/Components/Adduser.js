import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  let [name, setname] = useState("");
  let [address, setaddress] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [cpassword, setcpassword] = useState();
  let [namevalid, setnamevalid] = useState();
  let [addvalid, setaddvalid] = useState();
  let [emailvalid, setemailvalid] = useState();
  let [passvalid, setpassvalid] = useState();
  let [cpassvalid, setcpassvalid] = useState();
  let [mainerr, setmainerr] = useState();
  let navigate = useNavigate();

  const nameFunc = (e) => {
    let text = String(e.target.value);
    if (text.length > 60 || text.length < 20) {
      setname("");
      setnamevalid(true);
    } else {
      setname(text);
      setnamevalid(false);
    }
  };
  const addressFunc = (e) => {
    let text = String(e.target.value);
    if (text.length > 400) {
      setaddvalid(true);
      setaddress("");
    } else {
      setaddvalid(false);
      setaddress(text);
    }
  };
  const emailFunc = (e) => {
    let text = String(e.target.value);
    let start = "@";
    let domain = ["gmail", "yahoo", "microsoft", "apple"];
    let end = ".com";
    let s = text.indexOf(start);
    let en = text.indexOf(end);
    if (text.includes(start)) {
      for (let i = 0; i < domain.length; i++) {
        let chars = domain[i];
        if (text.includes(chars)) {
          let char = text.indexOf(chars);
          console.log(s);
          console.log(char);
          console.log(en);
          if (
            text.includes(end) &&
            char > s &&
            en > char &&
            text.length - 1 - en <= 3
          ) {
            setemailvalid(false);
            setemail(text);
            break;
          } else {
            setemailvalid(true);
            setemail("");
          }
        } else {
          setemailvalid(true);
          setemail("");
        }
      }
    } else {
      setemailvalid(true);
      setemail("");
    }
  };
  const passFunc = (e) => {
    let text = String(e.target.value);
    let hasUppercase = false;
    let hasLowercase = false;
    let hasDigit = false;
    let hasSpecialChar = false;
    let hasLength = false;
    let c = 0;
    if (text.length > 8 && text.length < 16) {
      hasLength = true;
    }
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      if (char >= "A" && char <= "Z") {
        hasUppercase = true;
      } else if (char >= "a" && char <= "z") {
        hasLowercase = true;
      } else if (char >= "0" && char <= "9") {
        hasDigit = true;
      } else {
        if (c === 0) {
          hasSpecialChar = true;
          c++;
        } else {
          hasSpecialChar = false;
        }
      }
    }
    if (
      hasUppercase &&
      hasDigit &&
      hasLowercase &&
      hasSpecialChar &&
      hasLength
    ) {
      setpassword(text);
      setpassvalid(false);
    } else {
      setpassword("");
      setpassvalid(true);
    }
  };
  const cpassFunc = (e) => {
    let text = String(e.target.value);
    if (password !== text) {
      setcpassword("");
      setcpassvalid(true);
    } else {
      setcpassword(text);
      setcpassvalid(false);
    }
  };
  const submitUser = () => {
    if (
      !namevalid &&
      !emailvalid &&
      !addvalid &&
      !passvalid &&
      !cpassvalid &&
      name !== "" &&
      email !== "" &&
      address !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      let data = {
        name: name,
        address: address,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5000/roxiler/register", data)
        .then((res) => {
          let data = res.data;
          if (data === "Register Successfull") {
            setmainerr(false);
            navigate("/");
          } else {
            setmainerr(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Fragment>
      <h3 className="m-3 text-center">User</h3>
      {mainerr && (
        <h3 style={{ textAlign: "center", color: "red" }}>
          Some Error Occurred
        </h3>
      )}
      <div className="addstore">
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            onChange={(e) => nameFunc(e)}
            type="text"
            className="form-control"
          />
        </div>
        {namevalid && (
          <span style={{ fontSize: "small", color: "red" }}>
            Min 20 and Max 60 characters allowed
          </span>
        )}
        <div className="mb-3">
          <label className="form-label">User Email</label>
          <input
            onChange={(e) => emailFunc(e)}
            type="text"
            className="form-control"
          />
        </div>
        {emailvalid && (
          <span style={{ fontSize: "small", color: "red" }}>
            Try to enter valid email address
          </span>
        )}
        <div className="mb-3">
          <label className="form-label">User Address</label>
          <textarea onChange={(e) => addressFunc(e)} className="form-control">
            {" "}
          </textarea>
        </div>
        {addvalid && (
          <span style={{ fontSize: "small", color: "red" }}>
            Max 400 characters
          </span>
        )}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={(e) => passFunc(e)}
            type="password"
            className="form-control"
          />
        </div>
        {passvalid && (
          <span style={{ fontSize: "small", color: "red" }}>
            8-16 characters allowed with 1 special and at least one UPPER
          </span>
        )}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            onChange={(e) => cpassFunc(e)}
            type="password"
            className="form-control"
          />
        </div>
        <div>
          {cpassvalid && (
            <span style={{ fontSize: "small", color: "red" }}>
              Passwords must match!!
            </span>
          )}
        </div>
        <div className="mb-3">
          <span onClick={() => submitUser()} className="btn btn-success">
            Add User
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Adduser;
