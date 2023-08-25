const jwt = require('jsonwebtoken');
const { requestRefreshToken } = require('../controllers/auth.controller');

const middlewareController = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (token) {
                const accessToken = token.split(' ')[1];
                jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                    if (err) {
                        console.log(err)
                        return res.status(401).json({ message: 'Token is not valid!' });
                    }
                    req.user = user;
                    next();
                });
            } else {
                return res.status(401).json({ message: "You're not authenticated!" });
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = middlewareController;


// const decodedToken = jwt.decode(accessToken, process.env.JWT_ACCESS_KEY);
// const expiresAt = decodedToken.expiresAt;

// if (expiresAt < Date.now()) {
//     return requestRefreshToken(req, res);
// } else {
//     req.user = decodedToken.user;
//     next();
// }