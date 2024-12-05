const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

// Route for creating a transaction
router.post('/', transactionController.createTransaction)

module.exports = router
