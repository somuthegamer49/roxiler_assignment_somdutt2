import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  let isadmin = useSelector((state) => state.isadmin);
  let isowner = useSelector((state) => state.isowner);
  let isuser = useSelector((state) => state.isuser);
  let userid = useSelector((state) => state.userid);
  let dispatch = useDispatch();
  let [stars, setstars] = useState([1, 2, 3, 4, 5]);
  let [rate, setrate] = useState(-1);
  let [stores, setstores] = useState([]);
  let [id, setid] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/roxiler/getstore").then((res) => {
      let data = res.data;
      setstores(data);
    });
  }, []);

  const ratingStar = (index,id) => {
    stores.forEach((store)=>{
      if(store.store_id===id){
        setid(id)
      }
    })
    setrate(index);
  };
  const submitRating = (storeid) => {
    if(rate!==-1){
      let data={
        userid:userid,
        storeid:storeid,
        rating:rate
      }
      axios.post('http://localhost:5000/roxiler/postrating',data).then(res=>{

      })
      .catch(err=>{

      })
    }
  };
  const logout = () => {
    if (isadmin === 1) {
      dispatch({
        type: "admin",
        payload: {dataadmin:0,dataid:null},
      });
    } else if (isowner === 1) {
      dispatch({
        type: "owner",
        payload: {dataowner:0,dataid:null},
      });
    } else {
      dispatch({
        type: "user",
        payload: {dataname:'',dataid:null},
      });
    }
  };
  return (
    <Fragment>
      <div className="d-flex registration">
        <div className="nav-btns d-flex align-items-start justify-content-start">
          <ul className="nav nav-pills">
            <li className="nav-item nav-link">Home</li>
            {isadmin === 1 && (
              <li className="nav-item nav-link">
                <Link to={"/admin"}>Admin</Link>
              </li>
            )}
            {isowner === 1 && (
              <li className="nav-item nav-link">
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        {isuser !== "" && <h3 className="Banner">Hi {isuser}!!</h3>}
        {isadmin === 1 && <h3 className="Banner">Hi Admin!!</h3>}
        {isowner === 1 && <h3 className="Banner">Hi Owner!!</h3>}
        <div className="nav-drop d-flex align-items-start justify-content-end">
          <ul className="nav nav-pills">
            <li className="nav-item dropdown">
              <p
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                Menu
              </p>
              <ul className="dropdown-menu">
                {isadmin === 1 && (
                  <li>
                    <Link to={"/adduser"} className="dropdown-item">
                      Add User
                    </Link>
                  </li>
                )}
                {isadmin === 1 && (
                  <li>
                    <Link to={"/addstore"} className="dropdown-item">
                      Add Store
                    </Link>
                  </li>
                )}
                {(isowner === 1 || isadmin === 1) && (
                  <li>
                    <Link to={"/viewuser"} className="dropdown-item">
                      View Users
                    </Link>
                  </li>
                )}
                <li>
                  <Link to={"/viewstore"} className="dropdown-item">
                    View Stores
                  </Link>
                </li>
                <li>
                  <Link to={"/changepassword"} className="dropdown-item">
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => logout()}>
                    Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="stores">
        {stores.map((store) => {
          return (
            <div className="store d-inline-block">
              <div className="card" style={{ width: "18rem" }}>
                <span>
                  {stars.map((star, i) => {
                    return (
                      <i
                        onClick={() => submitRating(store.store_id)}
                        onMouseOut={() => ratingStar(-1,store.store_id)}
                        onMouseOver={() => ratingStar(i + 1,store.store_id)}
                        key={i + 1}
                        className={
                          i < rate && id===store.store_id
                            ? "bi bi-star-fill bi-star-fill text-warning"
                            : "bi bi-star"
                        }
                      >
                        {" "}
                      </i>
                    );
                  })}
                </span>
                <div className="store-img" style={{backgroundImage:`url(${store.storeimg})`}}></div>
                <div className="card-body">
                  <h5 className="card-title">{store.storename}</h5>
                  <hr />
                  <p className="card-text">{store.storedesc}</p>
                  <hr />
                  <p className="card-text">{store.storeaddress}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
