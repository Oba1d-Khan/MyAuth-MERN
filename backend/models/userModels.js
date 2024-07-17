import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true

    }
)

// 'pre' is a Mongoose middleware function that allows code to run before an event ('save' event here)

UserSchema.pre('save', async function (next) {
    // Checks if the password field has not been modified and skips the rest of the middleware if it hasn't
    if (!this.isModified('password')) {
        next();
    }

    // But, If the password field has been modified (e.g., user has set a new password), hash it before saving to the database

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User 