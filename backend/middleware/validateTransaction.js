module.exports = (req, res, next) => {
  const { amount, description } = req.body

  // Validate amount
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' })
  }

  // Validate description
  if (typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ message: 'Description is required and must be a non-empty string' })
  }

  // If valid, proceed to the next middleware/controller
  next()
}
