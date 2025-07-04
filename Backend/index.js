const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./src/config/db");
const serviceRoutes = require("./src/routes/serviceRoutes");
const voucherRoutes = require("./src/routes/voucherRoutes");
const cors = require('cors');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));

//db connection
dbConnect();


//Routes
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/vouchers",voucherRoutes);

//start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
