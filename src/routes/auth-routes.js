const express = require('express')
const { registerUserController, loginUserController, changePasswordController } = require('../controllers/auth-controllers')
const authMiddleware = require('../middleware/auth-middleware')
const { uploadGitlinkController } = require('../controllers/upload-gitlink-controller')

const router = express.Router()

//register route
router.post('/register', registerUserController)

// login route
router.post('/login', loginUserController)

// change password
router.post('/change-password',authMiddleware,changePasswordController )

router.post('/upload-githublink',authMiddleware,uploadGitlinkController )



module.exports = router