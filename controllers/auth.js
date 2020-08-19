const asyncHandler = require('../middleware/async');

const User = require('../models/User');

// @description    Sign up
// @route          POST /api/auth/signup
// @access         Public
exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = User.create({
        name,
        email,
        password
    });

    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send the response
const sendTokenResponse = (user, statusCode, res) => {
    // Create web token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    });
};