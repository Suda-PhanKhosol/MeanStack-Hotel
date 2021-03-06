const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const KEY = "MY_KEY";
// **************************************************
//          โครงสร้างข้อมูล
// **************************************************
// schme เหมือนโครงสร้างข้อมูล กำหนดโครสร้าง
var Schema = require("mongoose").Schema;

const userSchema = Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "users",
  }
);

// กำหนดว่าเราจะใช้ mongodb ในส่วนของ collection ไหน
let User;
try {
  User = mongoose.model("users");
} catch (err) {
  User = mongoose.model("users", userSchema);
}

const checkUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find username!"));
      } else {
        if (data) {
          resolve({ status: 200 });
        } else {
          reject(new Error("Cannot find username"));
        }
      }
    });
  });
};

/**
 *
 *  MAIN fuction
 *
 *
 */
const authorization = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    jwt.verify(token, KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      } else {
        checkUser(decode.username)
          .then((result) => {
            let status = result.status;
            if (status == 200) {
              next();
            } else {
              res.status(404).json({
                message: "คุณไม่มีสิทธิ์เข้าถึง",
              });
            }
          })
          .catch((err) => {
            res.status(404).json({
              message: err,
            });
          });
      }
    });
  }
};

module.exports = authorization;
