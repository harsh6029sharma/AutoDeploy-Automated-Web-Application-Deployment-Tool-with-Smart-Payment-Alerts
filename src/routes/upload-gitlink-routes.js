const express = require('express')
const uploadGitlinkController = require('../controllers/upload-gitlink-controller')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

router.post('/',authMiddleware,uploadGitlinkController)

module.exports = router