const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const validateTransaction = require('../middleware/validateTransaction')

// Route for creating a transaction
router.post('/buy', validateTransaction, transactionController.createTransaction)

module.exports = router
