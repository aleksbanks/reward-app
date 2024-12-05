const Balance = require('../models/Balance')

// Controller for getting balance
exports.getBalance = async (req, res) => {
  try {
    const balance = await Balance.findOne()
    res.json(balance)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balance' })
  }
}

// Controller for adding stars to balance
exports.addToBalance = async (req, res) => {
  const { stars } = req.body
  try {
    const balance = await Balance.findOne()
    if (!balance) return res.status(404).json({ error: 'Balance not found' })

    balance.balanceInStars += stars
    const dollarsToAdd = Math.floor(balance.balanceInStars / 10)
    balance.balanceInDollars += dollarsToAdd
    balance.balanceInStars -= dollarsToAdd * 10

    await balance.save()
    res.json(balance)
  } catch (error) {
    res.status(500).json({ error: 'Error updating balance' })
  }
}

// Controller for subtracting from balance
exports.subtractFromBalance = async (req, res) => {
  const { dollars } = req.body
  try {
    const balance = await Balance.findOne()
    if (!balance) return res.status(404).json({ error: 'Balance not found' })

    if (balance.balanceInDollars < dollars) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    balance.balanceInDollars -= dollars
    await balance.save()
    res.json(balance)
  } catch (error) {
    res.status(500).json({ error: 'Error subtracting from balance' })
  }
}
