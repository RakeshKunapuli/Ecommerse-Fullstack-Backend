const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
require('dotenv').config()

const productroutes = require("./Routes/product.routes")
const userRoutes = require("./Routes/User.Routes");
const cartroutes = require("./Routes/cart.routes")
const wishlistroutes = require("./Routes/Wishlist.routes")
const orderroutes = require("./Routes/Order.routes")


app.use(cors());
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.get('/', (req, res) => {
   res.send('Hello, World!');
 });

app.use("/products", productroutes);
app.use("/user", userRoutes);
app.use("/cart",cartroutes)
app.use("/wishlist",wishlistroutes)
app.use("/order",orderroutes)


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
