const { insertUser, fetchAllUsers, updateUserInfo, deleteInfo, fetchUserByUsername, fetchUserById } = require('../models/Queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register user controller 
const registerUserController = async (req, res) => {

    //extract user info from req.body
    const { username, email, password } = req.body

    // check if the user already exist or not

    const user = await fetchUserByUsername(username)
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already exist! please login to continue'
        })
    }

    // if user not exist then save in db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await insertUser(username, email, hashedPassword)
    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: newUser
    })
}

// login user controller
const loginUserController = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await fetchUserByUsername(username)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not exist'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            })
        }

        //if user successfully logged in then create jwt access token
        const accessToken = jwt.sign({
            userId: user.id,
            username: user.username,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        })


        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken //passing accessToken to frontend to store in our cookie and create session
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'some error occured! please try again'
        })
    }
}


// change password user controller
const changePasswordController = async (req, res) => {
    try {

        const userId = req.userInfo.userId

        const { oldPassword, newPassword } = req.body

        const user = await fetchUserById(userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        //check if the old password is correct or not 
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Old password is not correct please try again'
            })
        }

        //hash the new password 
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update the user password
        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully!'
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Password cannot change due to internal servers error!'
        })
    }
}
module.exports = { registerUserController, loginUserController, changePasswordController }