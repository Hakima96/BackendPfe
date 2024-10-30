// BackendPfe/config/jwt.config.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_super_securise';
const JWT_EXPIRE = '24h';

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token invalide');
    }
};

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication requise' });
    }
};

module.exports = {
    generateToken,
    verifyToken,
    authMiddleware
};
