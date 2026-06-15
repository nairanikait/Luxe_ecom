const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.error('User auth error:', error.message);
    return res.status(401).json({ success: false, message: 'Session expired or invalid. Please login again.' });
  }
};

module.exports = authUser;
