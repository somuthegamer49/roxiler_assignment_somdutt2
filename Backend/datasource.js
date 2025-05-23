const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "roxiler",
});
const database = connection.connect(async function (err) {
  if (err) {
    console.error("Error connecting to database: ", err);
    return false;
  } else {
    // Query to create users table
    let usertablequery =
      "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), isadmin BOOLEAN, isowner BOOLEAN);";
      // Query to create stores table
    let storetablequery =
      "CREATE TABLE IF NOT EXISTS stores (store_id INT AUTO_INCREMENT PRIMARY KEY, storename VARCHAR(255), storeaddress VARCHAR(255), storedesc VARCHAR(255), storeimg VARCHAR(255));";
      // Query to create ratings table
    let ratingtable =
      "CREATE TABLE IF NOT EXISTS ratings (rating_id INT AUTO_INCREMENT PRIMARY KEY, userid INT, storeid INT ,rating TINYINT UNSIGNED, FOREIGN KEY (userid) REFERENCES users(user_id) ON DELETE CASCADE, FOREIGN KEY (storeid) REFERENCES stores(store_id) ON DELETE CASCADE, DateAndTime DATE);";
      // Query to insert primary admin
    let insertadmin =
      "INSERT INTO users (name, address, email, password, isadmin, isowner) VALUES (?,?,?,?,?,?);";
      // Query to to chek if admin exists
    let checkadmin = "SELECT user_id FROM users WHERE email='somduttwork@gmail.com'";
    let checkowner = "SELECT user_id FROM users WHERE email='roxiler@gmail.com'"
    let insertowner= "INSERT INTO users (name, address, email, password, isadmin, isowner) VALUES (?,?,?,?,?,?);";

    // Queries run to database
    connection.query(usertablequery, function (err, result) {
      if (err) throw err;
    });
    connection.query(storetablequery, function (err, result) {
      if (err) throw err;
    });
    connection.query(ratingtable, function (err, result) {
      if (err) throw err;
    });
    // Hash password for admin
    const hashedPassword = await bcrypt.hash("somdutt", 10);
    connection.query(checkadmin, function (err, result) {
      if (err) throw err;
      if (result.length===0) {
        let values = [
          "Somdutt Acharya",
          "Mumbai,India",
          "somduttwork@gmail.com",
          hashedPassword,
          1,
          0,
        ];
        connection.query(insertadmin, values, function (err, result) {
          if (err) throw err;
        });
      }
    });
    const hashedPassword2 = await bcrypt.hash("roxiler", 10);
    connection.query(checkowner, function (err, result) {
      if (err) throw err;
      if (result.length===0) {
        let values = [
          "Roxiler Owner",
          "Pune,India",
          "roxiler@gmail.com",
          hashedPassword2,
          0,
          1,
        ];
        connection.query(insertowner, values, function (err, result) {
          if (err) throw err;
        });
      }
    });
    return true;
  }
});
module.exports = connection;
