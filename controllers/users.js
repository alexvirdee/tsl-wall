const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @description   Get all users from db
// @route         GET /api/users
// @access        Private
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @description       Get a single user
// @route             GET /api/users/:id
// @access            Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    res.status(200).json({
      success: true,
      data: user
    });
  });

// @description    Create a user
// @route          POST /api/users
// @access         Private
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});