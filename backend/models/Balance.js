const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
  balanceInStars: { type: Number, default: 0 },
  balanceInDollars: { type: Number, default: 0 },
  lastBalanceUpdate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Balance', balanceSchema)
