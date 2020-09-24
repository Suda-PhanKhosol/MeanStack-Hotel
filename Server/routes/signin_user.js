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
    Name: String,
    Age: String,
    Phone: String,
    Email: String,
    Password: String,
    img: String,
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
function findUser(Email) {
  return new Promise((resolve, reject) => {
    User.findOne({ Email: Email }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find username!"));
      } else {
        if (data) {
          resolve({
            id: data._id,
            Name: data.Name,
            Age: data.Age,
            Phone: data.Phone,
            Email: data.Email,
            Password: data.Password,
            img: data.img,
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
router.route("/signin/user").post(async (req, res) => {
  const playload = {
    Email: req.body.Email,
    Password: req.body.Password,
    // Name: String,
    // Age: String,
    // Phone: String,
    // Email: String,
    // Password: String,
    // img: String,
  };
  try {
    // เอา Email  ไปตรวจสอบ
    const result = await findUser(playload.Email);
    // เอา password ของ DB กับ Client ไปตรวจ
    const loginStatus = await compareHash(playload.Password, result.Password);
    // true = password ตรงกัน
    const status = loginStatus.status;
    console.log(status);
    if (status) {
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
