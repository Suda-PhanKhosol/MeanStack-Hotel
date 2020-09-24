var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const bcr = require("bcryptjs");
// schme เหมือนโครงสร้างข้อมูล กำหนดโครสร้าง
var Schema = require("mongoose").Schema;
const userSchema = Schema(
  {
    username: String,
    password: String,
  },
  {
    //   สำหรับ  collection ไหนใน mongodb
    collection: "admins",
  }
);

// กำหนดว่าเราจะใช้ mongodb ในส่วนของ collection ไหน
let User;
try {
  User = mongoose.model("admins");
} catch (err) {
  User = mongoose.model("admins", userSchema);
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
      username: dataUsers.username,
      password: dataUsers.password,
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
  makeHash(req.body.password)
    .then((hashtext) => {
      const payload = {
        username: req.body.username,
        password: hashtext,
      };
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
