import asyncHandler from "express-async-handler";
import User from '../models/userModels.js'
import generateToken from "../utils/generateToken.js";


//  @desc    Auth user/set token
//  @route    POST /api/users/auth
//  @access   Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
        user && (await user.matchPassword(password))
    ) {
        generateToken(res, user._id)
        res.status(201)
            .json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
    } else {
        res.status(401)
        throw new Error('Invalid email or password');
    }


});

//  @desc     Register a new user
//  @route    POST /api/user
//  @access   Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201)
            .json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }

});

//  @desc     Get a user profile
//  @route    GET /api/user/profile
//  @access   Private

const getUserProfile = asyncHandler(async (req, res) => {


    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json({ user });
});

//  @desc     Update a user profile
//  @route    PUT /api/user/profile
//  @access   Private

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res
            .status(200)
            .json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            })
    } else {
        res.status(303);
        throw new Error('User not found!')
    }

});

//  @desc     Logout a user
//  @route    POST /api/user/logout
//  @access   Private

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie(
        'jwt',
        '',
        {
            httpOnly: true,
            expires: new Date(0)
        }
    );

    res.status(200).json({ message: "User logged out" });
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
};
