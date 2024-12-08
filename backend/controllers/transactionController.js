const Transaction = require('../models/Transaction')
const Balance = require('../models/Balance')

// Controller for creating a transaction
exports.createTransaction = async (req, res) => {
  const { type, amount, date, description } = req.body
  try {
    // Fetch the current balance
    const balanceDoc = await Balance.findOne()
    if (!balanceDoc) {
      return res.status(404).json({ message: 'Balance not found' })
    }

    const balanceBefore = balanceDoc.amount
    const balanceAfter = balanceBefore - amount

    // Ensure sufficient balance
    if (balanceAfter < 0) {
      return res.status(400).json({ message: 'Insufficient balance' })
    }
    // Update balance
    balanceDoc.amount = balanceAfter
    await balanceDoc.save()

    const transaction = new Transaction({ type, amount, date, description })
    await transaction.save()
    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ error: 'Error creating transaction' })
  }
}
