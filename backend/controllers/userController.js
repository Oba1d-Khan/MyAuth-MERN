import asyncHandler from "express-async-handler";

//  @desc    Auth user/set token
//  @route    POST /api/users/auth
//  @access   Public

const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Auth" });
});

//  @desc     Register a new user
//  @route    POST /api/user
//  @access   Public

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Register User" });
});

//  @desc     Get a user profile
//  @route    GET /api/user/profile
//  @access   Private

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile" });
});

//  @desc     Update a user profile
//  @route    PUT /api/user/profile
//  @access   Private

const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update User Profile" });
});

//  @desc     Logout a user
//  @route    POST /api/user/logout
//  @access   Private

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logout User" });
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
};
