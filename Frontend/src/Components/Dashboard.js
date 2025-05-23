import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  let [data, setdata] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/roxiler/dashboardrating")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <h3 className="m-3 text-center">Owner Dashboard</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Store</th>
            <th scope="col">Store Address</th>
            <th scope="col">Users</th>
            <th scope="col">Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,i) => {
            return (
              <tr>
                <th scope="row">{i+1}</th>
                <td><div className="store-img2" style={{backgroundImage:`url(${item.storeimg})`}}></div></td>
                <td>{item.storeaddress}</td>
                <td>{item.name}</td>
                <td>{item.avgrt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Dashboard;
