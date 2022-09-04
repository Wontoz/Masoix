const router = require("express").Router();
const pool = require ("./db");
const authorization = require("./middleware/authorize");

router.get("/", authorization, async (req, res) => {
 try {
     
    //req.user has the payload
    //res.json(req.user.id);

    const user = await pool.query("SELECT username from users WHERE id = $1", [req.user.id]);

    res.json(user.rows[0]);

 } catch (error) {
     console.error(error.message);
     res.status(500).json("Server Error")
 }
});


module.exports = router;