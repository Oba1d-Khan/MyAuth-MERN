import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {

    const token = jwt.sign(
        { userId },     // payload
        process.env.JWT_SECRET,     // secret key
        { expiresIn: '30d' }    // expire option
    );

    res.cookie(
        'jwt',
        token,
        {
            httpOnly: true,  // Secure from XSS (JavaScript) attacks
            secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
            sameSite: 'strict', // Helps prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 // Expiry time set to 30 days (in milliseconds)
        }
    );
}

export default generateToken;