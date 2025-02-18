const jwt = require("jsonwebtoken");

//const protectedRoutes  = ["/users", "/users/", "/users/:id"];

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });
  
    try {
      const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
  
  module.exports = verifyToken;
  

  // module.exports = (req, res, next) => {
//     console.log(req.url, protectedRoutes.includes(req.url));
//     if(!protectedRoutes.includes(req.url)) {
//         return next();
//     }
//     const token = req.header("token");
//     if (!token) {
//         return res.status(403).send("A token is required for authentication");
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
// }