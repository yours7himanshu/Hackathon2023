const jwt = require('jsonwebtoken');

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return (req, res, next) => {
    // Extract the token from the request headers, query parameters, or cookies
    const token = req.headers.authorization?.split(' ')[1] || req.query.token || req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify and decode the token using the secret
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
  };
}

module.exports = authJwt;
