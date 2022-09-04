module.exports = function(req, res, next) {
    const { username, password } = req.body;
  
    if (req.path === "/register") {
      if (![username].every(Boolean)) {
        return console.log("Missing Username");
      }
      if(![password].every(Boolean)){
          return console.log("Missing Password");
      }
    } else if (req.path === "/login") {
      if (![password].every(Boolean)) {
        return console.log("Invalid Password");
      }
    }
    next();
  };