const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());

//ROUTES

//register and login route
app.use("/auth", require("./jwtAuth"));

//dashboard route
app.use("/dashboard", require("./dashboard"));

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  });
