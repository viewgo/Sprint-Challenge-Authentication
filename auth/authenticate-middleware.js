/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret =
    process.env.JWT_SECRET || "I find your lack of faith disturbing.";

  if (authorization) {
    // console.log(authorization);
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Please provide correct credentials" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ error: "Please provide credentials" });
  }
};
