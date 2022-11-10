const express = require("express");
const cors = require("cors");

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/apinode"); // Whithout Docker
mongoose.connect("mongodb://mongo/apinode");

server.use(cors()); //Cors config

server.use(express.urlencoded());
server.use(express.json());

const postRoute = require("./api/routes/postRoute");
postRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);

server.listen(port, hostname);
