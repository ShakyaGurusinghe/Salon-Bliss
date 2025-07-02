const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./src/config/db");
const serviceRoutes = require("./src/routes/serviceRoutes");
const advancedResults = require("./src/middleware/advancedResults");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//db connection
dbConnect();


//Routes
app.use("/api/v1/services", serviceRoutes);

//start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
