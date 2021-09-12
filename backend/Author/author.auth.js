const jwt = require("jsonwebtoken");

function authorAuth(req, res, next) {
  try {
    const authorToken = req.cookies.authorToken;

    if (!authorToken) 
      return res.json({ authorized: false, message: "Unauthorized" });

    req.authorInfo = jwt.verify(authorToken, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.json({ authorized: false, message: "Unauthorized" });
  }
}

module.exports = authorAuth;