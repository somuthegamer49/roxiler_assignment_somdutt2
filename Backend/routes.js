const express = require("express");
const router = express.Router();
const db = require("./datasource");
const bcrypt = require("bcryptjs");

router.post("/roxiler/checkadmin", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  let em = "";
  let pas = "";
  let adminstatus = null;
  let id = null;

  db.query(
    "SELECT user_id,email,password,isadmin,isowner,name FROM users WHERE email=?",
    [email],
    async function (err, result) {
      if (err) {
        throw err;
      }
      if (result[0] !== undefined) {
        id = result[0].user_id;
        em = result[0].email;
        pas = result[0].password;
        adminstatus = result[0].isadmin;
        ownerstatus = result[0].isowner;
        name1 = result[0].name;

        const match = await bcrypt.compare(pass, pas).then((res) => {
          return res;
        });
        if (email === em && match) {
          res.json({
            isadmin: adminstatus,
            isowner: ownerstatus,
            name: name1,
            id: id,
          });
        } else {
          res.json(null);
        }
      }
    }
  );
});

router.post("/roxiler/register", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  let addr = req.body.address;
  let name = req.body.name;
  let error = null;
  const hashedPassword = await bcrypt.hash(pass, 10);
  let values = [email, hashedPassword, addr, name, 0, 0];
  let query =
    "INSERT INTO users (email, password, address, name, isadmin, isowner) VALUES (?,?,?,?,?,?);";
  db.query(query, values, function (err, result) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.json("Register Unsuccessfull");
      } else {
        res.json("Register Successfull");
      }
    }
  });
});

router.post("/roxiler/storereg", async (req, res) => {
  let storename = req.body.storename;
  let storeimg = req.body.storeimg;
  let storeaddress = req.body.storeaddress;
  let storedesc = req.body.storedesc;
  let values = [storename, storeaddress, storedesc, storeimg];
  let query =
    "INSERT INTO stores (storename, storeaddress, storedesc, storeimg) VALUES (?,?,?,?);";
  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Store Add Successfull");
    }
  });
});

router.get("/roxiler/getrating", async (req, res) => {
  let query =
    "SELECT rating FROM ratings rs, stores st, users us WHERE rs.storeid=st.store_id AND rs.userid=us.user_id;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result[0]);
    }
  });
});

router.get("/roxiler/getstore", async (req, res) => {
  let query = "SELECT * FROM stores;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/roxiler/postrating", async (req, res) => {
  let userid = req.body.userid;
  let storeid = req.body.storeid;
  let rating = req.body.rating;
  let values = [userid, storeid, rating];

  let query1 = "SELECT rt.userid FROM ratings rt WHERE rt.userid=?;";
  db.query(query1, [userid], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      let query2 =
        "INSERT INTO ratings (userid, storeid, rating, DateAndTime) VALUES (?,?,?,NOW());";
      db.query(query2, values, function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

router.get("/roxiler/dashboardrating", async (req, res) => {
  let query =
    "SELECT st.storeimg, st.storeaddress, us.name, AVG(rt.rating) AS 'avgrt' FROM stores st, users us, ratings rt WHERE st.store_id IN(rt.storeid) AND us.user_id IN(rt.userid) GROUP BY st.storeaddress ORDER BY st.storeaddress ASC;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/roxiler/viewstore", async (req, res) => {
  let query = "SELECT * FROM stores;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/roxiler/viewuser", async (req, res) => {
  let query = "SELECT * FROM users;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/roxiler/dashboard/admin", async (req, res) => {
  let query =
    "SELECT COUNT(DISTINCT(us.user_id)) AS 'totalusers', COUNT(DISTINCT(st.store_id)) AS 'totalstores', COUNT(DISTINCT(rt.rating_id)) AS 'totalratings' FROM users us, stores st, ratings rt;";
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result[0]);
    }
  });
});

router.post("/roxiler/user/changepassword", async (req, res) => {
  let pass = req.body.password;
  let id = req.body.id;
  let password = await bcrypt.hash(pass, 10);
  let values = [password, id];
  let query = "UPDATE users SET password=? WHERE user_id=?;";
  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Password Set");
    }
  });
});

router.post("/roxiler/deletestore", async (req, res) => {
  let id = req.body.storeid;
  let query="DELETE FROM stores WHERE store_id=?;";
  db.query(query, [id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Delete Successfull");
    }
  });
});

router.post("/roxiler/deleteuser", async (req, res) => {
  let id = req.body.userid;
  let query="DELETE FROM users WHERE user_id=? AND isowner=0;";
  db.query(query, [id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Delete Successfull");
    }
  });
});

router.post("/roxiler/makeadmin", async (req, res) => {
  let id = req.body.userid;
  let query="UPDATE users SET isadmin=1 WHERE user_id=?;";
  db.query(query, [id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Admin Successfull");
    }
  });
});

module.exports = router;
