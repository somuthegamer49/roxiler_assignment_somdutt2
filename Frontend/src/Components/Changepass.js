import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Changepass = () => {
  let [data, setdata] = useState([]);
  let [oldpasserr, setoldpasserr] = useState();
  let [oldpass, setoldpass] = useState();
  let userid = useSelector((state) => state.userid);
  let [password, setpassword] = useState("");
  let [cpassword, setcpassword] = useState();
  let [passvalid, setpassvalid] = useState();
  let [cpassvalid, setcpassvalid] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/roxiler/viewuser")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkPass = (e) => {
    let text = String(e.target.value);
    let match = false;
    data.forEach(async (item) => {
      if (item.user_id === userid) {
        match = await bcrypt.compare(text, item.password).then((res) => {
          return res;
        });
        if (match) {
          setoldpasserr(false);
          setoldpass(text);
        } else {
          setoldpasserr(true);
          setoldpass("");
        }
      }
    });
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
  const submitChangePass = () => {
    if (
      !passvalid &&
      !cpassvalid &&
      !oldpasserr &&
      oldpass !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      let data = {
        password: password,
        id: userid,
      };
      axios
        .post("http://localhost:5000/roxiler/user/changepassword", data)
        .then((res) => {
          let data = res.data;
          if (data === "Password Set") {
            navigate("/");
          }
        })
        .catch((err) => [console.log(err)]);
    }
  };
  return (
    <Fragment>
      <h3 className="m-3 text-center">Change Password</h3>
      <div className="addstore">
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input
            onChange={(e) => checkPass(e)}
            type="password"
            className="form-control"
          />
        </div>
        {oldpasserr && (
          <span style={{ color: "red", fontSize: "small" }}>Not correct</span>
        )}
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            onChange={(e) => passFunc(e)}
            type="password"
            className="form-control"
          />
        </div>
        {passvalid && (
          <span style={{ color: "red", fontSize: "small" }}>
            {" "}
            8-16 characters allowed with 1 special and at least one UPPER
          </span>
        )}
        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            onChange={(e) => cpassFunc(e)}
            type="password"
            className="form-control"
          />
        </div>
        {cpassvalid && (
          <span style={{ color: "red", fontSize: "small" }}>
            Passwords Must Match
          </span>
        )}
        <div className="mb-3">
          <span onClick={() => submitChangePass()} className="btn btn-success">
            Submit
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Changepass;
