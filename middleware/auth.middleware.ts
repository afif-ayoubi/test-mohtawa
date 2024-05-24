
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


const authenticateUser = expressJwt({ secret: process.env.SECRET_KEY });

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' }); 
}

module.exports = {
    authenticateUser,
    generateToken
};
