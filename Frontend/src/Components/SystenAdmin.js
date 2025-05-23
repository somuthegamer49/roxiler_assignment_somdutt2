import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const SystenAdmin = () => {

  let [data,setdata]= useState()

  useEffect(()=>{
    axios.get('http://localhost:5000/roxiler/dashboard/admin')
    .then(res=>{
      console.log(res.data)
      setdata(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <Fragment>
      <h3 className="m-3 text-center">Administrator Dashboard</h3>
      <div className="sys-admin">
        <table className="m-auto table w-50">
          <tbody>
            <tr>
              <td>Total Users</td>
              <td>{data!==undefined && data.totalusers}</td>
            </tr>
            <tr>
              <td>Total Stores</td>
              <td>{data!==undefined && data.totalstores}</td>
            </tr>
            <tr>
              <td>Total Ratings</td>
              <td>{data!==undefined && data.totalratings}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default SystenAdmin;
