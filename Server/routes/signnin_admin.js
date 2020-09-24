var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const bcr = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "MY_KEY";
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
    collection: "admins",
  }
);

// กำหนดว่าเราจะใช้ mongodb ในส่วนของ collection ไหน
let Admin;
try {
  Admin = mongoose.model("admins");
} catch (err) {
  Admin = mongoose.model("admins", userSchema);
}
// **************************************************
// **************************************************
/**
 *
 *      เอา password  เข้า hashfuction
 *      เพื่อเปรียบเทียบ กับ hashfuction ใน DB
 */
async function compareHash(Text, myHash) {
  return new Promise((resolve, reject) => {
    bcr.compare(Text, myHash, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        resolve({ status: data });
      }
    });
  });
}

/**
 *
 *          เอา  username ไปหาว่ามีใน DB ไหม ผ่าน Promise fuction
 *          ถ้ามีให้ส่ง username password กลับมา
 */
function findUser(username) {
  return new Promise((resolve, reject) => {
    Admin.findOne({ username: username }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find username!"));
      } else {
        if (data) {
          resolve({
            id: data._id,
            username: data.username,
            password: data.password,
          });
        } else {
          reject(new Error("Cannot find username"));
        }
      }
    });
  });
}

/**
 *          MAIN function file
 */
router.route("/signin/admin").post(async (req, res) => {
  const playload = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log("playload: \n");
  console.log(playload);
  try {
    // เอา username  ไปตรวจสอบ
    const result = await findUser(playload.username);
    // เอา password ของ DB กับ Client ไปตรวจ
    const loginStatus = await compareHash(playload.password, result.password);
    // true = password ตรงกัน
    const status = loginStatus.status;
    console.log(status);
    if (status) {
      console.log("2");
      const token = jwt.sign(result, key, { expiresIn: 60 * 5 });
      res.status(200).json({ result, token, status });
    } else {
      res.status(200).json({ status });
    }
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
