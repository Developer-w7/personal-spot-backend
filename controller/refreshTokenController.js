const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt_refresh_token) return res.sendStatus(401);
    const refreshToken = cookies.jwt_refresh_token;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            // const roles = Object.values(foundUser.roles);
            // const roles = [5150];
            const accessToken = jwt.sign(
                {
    
                        "userId": decoded.userId,
                        "email": decoded.email

                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '10s' }
            );
            foundUser.token = accessToken;
            res.set({'X-AuthToken':accessToken})
            res.status(200).json({'user':foundUser,accessToken,'role':foundUser.role});
            // res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }