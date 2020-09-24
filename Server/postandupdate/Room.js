const expressFunction = require("express");
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const userSchema = Schema(
  {
    id_user: String,
    guest: String,
    room: String,
    type: String,
    datein: String,
    dateout: String,
  },
  {
    collection: "bookroom",
  }
);

let BookRoom;
try {
  BookRoom = mongoose.model("bookroom");
} catch (error) {
  BookRoom = mongoose.model("bookroom", userSchema);
}

const addProduct = (productData) => {
  return new Promise((resolve, reject) => {
    var new_product = new BookRoom(productData);
    new_product.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert product to DB!"));
      } else {
        resolve({ message: "BookRoom added successfully" });
      }
    });
  });
};

function findRoomService(idUser) {
  return new Promise((resolve, reject) => {
    BookRoom.find(idUser, (err, data) => {
      if (err) {
        reject(new Error("Cannot find username!"));
      } else {
        if (data) {
          resolve({
            _id: data._id,
            id_user: data.id_user,
            guest: data.guest,
            room: data.room,
            type: data.type,
            datein: data.datein,
            dateout: data.dateout,
          });
        } else {
          reject(new Error("Cannot find username"));
        }
      }
    }).pretty();
  });
}

/**
 *      post room service
 */
router.route("/add").post((req, res) => {
  console.log("add room");
  console.log(req.body);
  addProduct(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/find").post(async (req, res) => {
  const playload = {
    id_user: req.body.id,
    datein: req.body.datein,
  };

  try {
    const listidroom = await findRoomService(playload);
    if (listidroom) {
      res.status(202).json(listidroom);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
