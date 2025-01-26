const jwt = require('jsonwebtoken');
const secret = 'your_secret_key'; // Use a secure secret key; store it in an environment variable.

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
