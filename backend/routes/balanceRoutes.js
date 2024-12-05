const express = require('express')
const router = express.Router()
const balanceController = require('../controllers/balanceController')

// Route for getting balance
router.get('/', balanceController.getBalance)

// Route for adding stars to balance
router.post('/add', balanceController.addToBalance)

// Route for subtracting from balance
router.post('/subtract', balanceController.subtractFromBalance)

module.exports = router
