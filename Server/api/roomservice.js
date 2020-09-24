const expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const authorization = require("../config/authorize");
// const authorizationuser = require("../config/authorize _user");
// const authorizationadmin = require("../config/authorize_admin");
var Schema = require("mongoose").Schema;
const userSchema = Schema(
  {
    name: String,
    roomid: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    drink: String,
    spa: String,
    note: String,
  },
  {
    collection: "rooms",
  }
);

let Room;
try {
  Room = mongoose.model("rooms");
} catch (error) {
  Room = mongoose.model("rooms", userSchema);
}

const getRoom = () => {
  return new Promise((resolve, reject) => {
    Room.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Room!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Room!"));
        }
      }
    });
  });
};

router.route("/get").get(authorization, (req, res) => {
  console.log("Get all room Detail");
  getRoom()
    .then((result) => {
      // console.log(result);
      // res.status(200).json(result);
      // res.status(200).send("True");
      res.status(200).json({
        message: "OK",
      });
    })
    .catch((err) => {
      console.log("Error get room service");
      console.log(err);
    });
});

module.exports = router;

// .get(authorizationadmin, (req, res) =>

/***
 * router.route("/roomservice").get(authorizationadmin, (req, res) => {
  console.log("Get all room Detail");
  res.status(200).json(product);
  });
 */
