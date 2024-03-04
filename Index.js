const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require('dotenv').config()
const productroutes = require("./Routes/product.routes");
const userRoutes = require("../Back-End/Routes/User.Routes");
const cartroutes = require('../Back-End/Routes/cart.routes')
const wishlistroutes = require("../Back-End/Routes/Wishlist.routes")
const orderroutes = require("../Back-End/Routes/Order.routes")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productroutes);
app.use("/user", userRoutes);
app.use("/cart",cartroutes)
app.use("/wishlist",wishlistroutes)
app.use("/order",orderroutes)

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
