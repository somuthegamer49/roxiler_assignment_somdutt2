import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Viewuser = () => {
  let [users, setusers] = useState([]);
  let [searchusers, setsearchusers] = useState([]);
  let navigate = useNavigate();
  let isowner = useSelector((state) => state.isowner);

  useEffect(() => {
    axios
      .get("http://localhost:5000/roxiler/viewuser")
      .then((res) => {
        setusers(res.data);
        setsearchusers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const search = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      let arr = [];
      users.forEach((user) => {
        if (
          user.name.toLowerCase().includes(text.toLowerCase()) ||
          user.email.toLowerCase().includes(text.toLowerCase()) ||
          user.address.toLowerCase().includes(text.toLowerCase())
        ) {
          arr.push(user);
        }
      });
      setsearchusers(arr);
    } else {
      setsearchusers(users);
    }
  };
  const deleteUser = (userid) => {
      let data = {
        userid: userid,
      };
      axios
        .post("http://localhost:5000/roxiler/deleteuser", data)
        .then((res) => {
          if (res.data === "Delete Successfull") {
            navigate("/");
          }
        });
  };
  const makeAdmin = (userid) => {
      let data = {
        userid: userid,
      };
      axios
        .post("http://localhost:5000/roxiler/makeadmin", data)
        .then((res) => {
          if (res.data === "Admin Successfull") {
            navigate("/");
          }
        });
  };
  return (
    <Fragment>
      <input
        type="text"
        className="m-3 w-50 form-control"
        placeholder="Search"
        onChange={(e) => search(e)}
      />
      <table className="table table-hover m-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">User Email</th>
            <th scope="col">User Address</th>
            <th scope="col">User Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {searchusers.map((user, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ width: "30rem" }}>{user.address}</td>
                <td>
                  {user.isadmin === 0 && user.isowner === 0
                    ? "User"
                    : user.isadmin === 1
                    ? "Admin"
                    : "Owner"}
                </td>
                <td>
                  <span
                    onClick={() => deleteUser(user.user_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </span>
                </td>
                {" "}
                {isowner===1 && <td>
                  <span
                    onClick={() => makeAdmin(user.user_id)}
                    className="btn btn-warning"
                  >
                    Make Admin
                  </span>
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Viewuser;
