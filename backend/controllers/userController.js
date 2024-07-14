//  @desc    Auth user/set token
//  @route    POST /api/users/auth
//  @access   Public

const authUser = async (req, res) => {
    await res.status(200).json({ message: "User Auth" })
}

export {
    authUser
}