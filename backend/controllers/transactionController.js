const Transaction = require('../models/Transaction')

// Controller for creating a transaction
exports.createTransaction = async (req, res) => {
  const { type, amount, date, description } = req.body
  try {
    const transaction = new Transaction({ type, amount, date, description })
    await transaction.save()
    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ error: 'Error creating transaction' })
  }
}
