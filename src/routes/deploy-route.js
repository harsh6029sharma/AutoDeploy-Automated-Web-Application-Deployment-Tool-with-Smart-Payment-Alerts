const express = require('express')
const {generateDockerController} = require('../controllers/deploy-controller')
const authMiddleware = require('../middleware/auth-middleware')

const router = express.Router()

router.post('/generate-dockerfile',authMiddleware, generateDockerController)

module.exports = router