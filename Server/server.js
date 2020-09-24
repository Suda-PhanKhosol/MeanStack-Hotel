const expressFunction = require("express");
const mongoose = require("mongoose");
var expressApp = expressFunction();

// set fuction mongoDB
const URL = "mongodb://localhost:27017/webapp";
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//  กำหนด setting header
expressApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});
// ทำให้แน่ใจว่าเป็น json
expressApp.use(expressFunction.json());
// ใช้สำหรับการ  connect mongodb โดยเฉพาะ
expressApp.use((req, res, next) => {
  mongoose
    .connect(URL, config)
    .then(() => {
      console.log("Connected to  MongoDB...");
      next();
    })
    .catch((err) => {
      console.log("Cannot connect to MongoDB");
      res.status(501).send("Cannot connect yo MongoDB..");
    });
});

// middleware ตัวที่จะทำงานต่อจาก setting ถ้า end-point ถูกต้อง
// para 1. end-point
// para 2. callback fuction
expressApp.use("/user", require("./routes/user"));
expressApp.use("/admin", require("./routes/admin"));
expressApp.use("/login", require("./routes/signin_user"));
expressApp.use("/login", require("./routes/signnin_admin"));
// expressApp.use("/api", require("./api/roomservice"));
expressApp.use("/roomservice", require("./postandupdate/addroomservice"));
expressApp.use("/roomservice", require("./api/roomservice"));
expressApp.use("/bookroom", require("./postandupdate/Room"));
expressApp.listen(3000, function () {
  console.log("Listening on port 3000");
});
