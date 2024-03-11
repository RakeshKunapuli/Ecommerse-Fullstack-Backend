const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
require('dotenv').config()
const productroutes = require("../Back-End/Routes/product.routes");
const userRoutes = require("../Back-End/Routes/User.Routes");
const cartroutes = require('../Back-End/Routes/cart.routes')
const wishlistroutes = require("../Back-End/Routes/Wishlist.routes")
const orderroutes = require("../Back-End/Routes/Order.routes")


app.use(cors());
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));


app.use("/products", productroutes);
app.use("/user", userRoutes);
app.use("/cart",cartroutes)
app.use("/wishlist",wishlistroutes)
app.use("/order",orderroutes)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const MONGODB_URI = process.env.URI
const port = process.env.PORT || 5001
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
