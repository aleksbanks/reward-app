const Balance = require('../models/Balance')

async function ensureBalanceExists() {
  try {
    let balance = await Balance.findOne()
    if (!balance) {
      balance = new Balance({
        balanceInDollars: 0,
        balanceInStars: 0,
        lastBalanceUpdate: new Date()
      })
      await balance.save()
      console.log('Balance document created in MongoDB!')
    } else {
      console.log('Balance already exists.')
    }
  } catch (error) {
    console.error('Error ensuring balance exists:', error)
  }
}

module.exports = ensureBalanceExists
