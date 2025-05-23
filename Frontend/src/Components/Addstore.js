import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addstore = () => {
  let [stname, setstname] = useState("");
  let [stimg, setstimg] = useState("");
  let [stadd, setstadd] = useState("");
  let [stdesc, setstdesc] = useState("");
  let navigate = useNavigate()

  const storeName = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      setstname(text);
    }
  };
  const storeImg = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      setstimg(text);
    }
  };
  const storeAdd = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      setstadd(text);
    }
  };
  const storeDesc = (e) => {
    let text = String(e.target.value);
    if (text !== "") {
      setstdesc(text);
    }
  };
  const submitStore = ()=>{
    if(stname!=='' && stadd!=='' && stdesc!=='' && stimg!==''){
        let data={
            storename:stname,
            storeaddress:stadd,
            storedesc:stdesc,
            storeimg:stimg
        }
        axios.post('http://localhost:5000/roxiler/storereg',data)
        .then(res=>{
            let response=res.data
            if(response==='Store Add Successfull'){
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
  }
  return (
    <Fragment>
      <h3 className="m-3 text-center">Store</h3>
      <div className="addstore">
        <div className="mb-3">
          <label className="form-label">Store Name</label>
          <input
            onChange={(e) => storeName(e)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Store Image</label>
          <input
            onChange={(e) => storeImg(e)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Store Address</label>
          <textarea onChange={(e) => storeAdd(e)} className="form-control">
            {" "}
          </textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Store Description</label>
          <textarea onChange={(e) => storeDesc(e)} className="form-control">
            {" "}
          </textarea>
        </div>
        <div className="mb-3">
          <span onClick={()=>submitStore()} className="btn btn-success">Add Store</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Addstore;
