import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Viewstore = () => {
  let [stores, setstores] = useState([]);
  let [searcstores, setsearcstores] = useState([]);
  let isuser = useSelector((state) => state.isuser);
  let navigate=useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/roxiler/viewstore")
      .then((res) => {
        setstores(res.data);
        setsearcstores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const search = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      let arr = [];
      stores.forEach((store) => {
        if (
          store.storename.toLowerCase().includes(text.toLowerCase()) ||
          store.storeaddress.toLowerCase().includes(text.toLowerCase()) ||
          store.storedesc.toLowerCase().includes(text.toLowerCase())
        ) {
          arr.push(store);
        }
      });
      setsearcstores(arr);
    } else {
      setsearcstores(stores);
    }
  };
  const deleteStore = (storeid) => {
    let data={
        storeid:storeid
    }
    axios.post('http://localhost:5000/roxiler/deletestore',data)
    .then(res=>{
        if(res.data==="Delete Successfull"){
            navigate('/')
        }
    })
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
            <th scope="col">Store Image</th>
            <th scope="col">Store Name</th>
            <th scope="col">Store Address</th>
            <th scope="col">Store Description</th>
            {isuser === "" && <th scope="col">Action</th>}
          </tr>
        </thead>
        <tbody>
          {searcstores.map((store, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>
                  <div
                    className="store-img2"
                    style={{ backgroundImage: `url(${store.storeimg})` }}
                  ></div>
                </td>
                <td>{store.storename}</td>
                <td style={{ width: "30rem" }}>{store.storeaddress}</td>
                <td style={{ width: "30rem" }}>{store.storedesc}</td>
                {isuser === "" && (
                  <td>
                    <span
                      onClick={() => deleteStore(store.store_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Viewstore;
