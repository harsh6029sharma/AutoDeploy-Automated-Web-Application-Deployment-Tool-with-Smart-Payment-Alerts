const express = require('express')
const { uploadGitlinkController } = require('../controllers/upload-gitlink-controller')
const router = express.Router()

router.post('/',uploadGitlinkController)

module.exports = router