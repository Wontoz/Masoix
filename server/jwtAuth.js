const express = require("express");
const router = express.Router();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const validation = require("./middleware/validation");
const authorization = require("./middleware/authorize");

//Registration
router.post('/register', validation, async (req, res) => {
  try {

    //deconstruct username, password
    const {username, password} = req.body;

    //check if user already exists, throw error if true
    const user = await pool.query ("SELECT * FROM users WHERE username = $1", [username]);
    if(user.rows.length !== 0){
      return res.status(401).send("User already exists");
    }

    //bcrypt user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, bcryptPassword]);

    //generate jwt token
    const jwtToken = jwtGenerator(newUser.rows[0].id);
    console.log(jwtToken);
    return res.json({ jwtToken });

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  });

//Login Authentication
router.post('/login', validation, async (req, res) => {
  try {

    //deconstruct username, password
    const {username, password} = req.body;

    //check if user does not exist, throw error if true
    const user = await pool.query ("SELECT * FROM users WHERE username = $1", [username]);
    if(user.rows.length === 0){
      return res.status(401).send("Invalid Username");
    }

    //validate pw

    const validPassword = await bcrypt.compare
    (password, user.rows[0].password);
    if(!validPassword) return res.status(401).send("Invalid Password")

    //give jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json(token);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  });
  
//verify user
router.get('/verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;