const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require('dotenv').config()
const productroutes = require("./Routes/product.routes");
const userRoutes = require("../Back-End/Routes/User.Routes");
  

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productroutes);
app.use("/user", userRoutes);

app.use("/", (req, res) => {
  return res.status(200).json({
    message: "Server is Running",
  });
});


const MONGODB_URI = process.env.URI
const port = 5001
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`The server isrunning on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to server", err);
  });
