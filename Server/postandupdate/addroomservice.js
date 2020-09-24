const expressFunction = require("express");
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
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

let Product;
try {
  Product = mongoose.model("rooms");
} catch (error) {
  Product = mongoose.model("rooms", userSchema);
}

const addProduct = (productData) => {
  return new Promise((resolve, reject) => {
    var new_product = new Product(productData);
    new_product.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert product to DB!"));
      } else {
        resolve({ message: "Product added successfully" });
      }
    });
  });
};



/**
 *      post room service
 */

router.route("/add").post((req, res) => {
  console.log("add room");
  addProduct(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
