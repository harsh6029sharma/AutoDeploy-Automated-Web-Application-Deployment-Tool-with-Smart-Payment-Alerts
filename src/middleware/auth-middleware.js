const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(201).json({
            success: false,
            message: 'Access denied. No token provided, Please login to continue'
        })
    }

    //now decode the token to get the user's information like 'userId, username, role' etc.
    try {
        //so to decode the token we need jwt package
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);
        req.userInfo = decodedTokenInfo;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Access denied. No token provided, Please login to continue'
        })
    }

}

module.exports = authMiddleware;