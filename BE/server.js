require("dotenv").config();
var express = require('express');
var app = express();
const session = require("express-session");
const server = require("http").createServer(app);
const cors = require("cors");
const socket_module = require("./socket");
const bodyParser = require("body-parser");
const routers = require("./routes");
const passport = require("passport");
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const { connect } = require('./config/db.config');
connect();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

socket_module(socketIo);
routers(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
