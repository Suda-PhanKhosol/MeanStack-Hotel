var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const bcr = require("bcryptjs");
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
    //   สำหรับ  collection ไหนใน mongodb
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
/**
 *  เข้ารหัส password
 *
 */
async function makeHash(Text) {
  const res = await bcr.hash(Text, 10);
  return res;
}
/**
 *   เพิ่มข้อมูลในตาราง DB
 *
 */
function insertUser(dataUsers) {
  return new Promise((res, rej) => {
    // User ที่เราสร้างมาแต่แรก
    var new_user = new User({
      Name: dataUsers.Name,
      Age: dataUsers.Age,
      Phone: dataUsers.Phone,
      Email: dataUsers.Email,
      Password: dataUsers.Password,
      img: dataUsers.img,
    });

    new_user.save((err, data) => {
      if (err) {
        rej(new Error("Cannot insert user to DB"));
      } else {
        res({ message: "Singn up successfully" });
      }
    });
  });
}

/**
 *      middleware post  บันทึกข้อมูล user
 *          MAIN fuction this file
 *
 */

router.route("/signup").post((req, res) => {
  makeHash(req.body.Password)
    .then((hashtext) => {
      const payload = {
        Name: req.body.Name,
        Age: req.body.Age,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: hashtext,
        img: req.body.img,
      };
      console.log("playload:\n");
      console.log(payload);
      insertUser(payload)
        .then((ress) => {
          console.log(ress);
          res.status(200).json(ress);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
