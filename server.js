const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const authController = require("./controllers/auth.js");



// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
app.use("/auth", authController);



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
// server.js




  
  