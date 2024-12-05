const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // The amount subtracted from balance
  description: { type: String, required: true }, // e.g., "Bought a toy"
  date: { type: Date, default: Date.now }, // The date of the transaction
  balanceBefore: { type: Number, required: true }, // Balance before transaction
  balanceAfter: { type: Number, required: true } // Balance after transaction
})

module.exports = mongoose.model('Transaction', transactionSchema)
