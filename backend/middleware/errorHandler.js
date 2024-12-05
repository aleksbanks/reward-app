// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack) // Log the error details

  // Customize error messages based on the type of error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  res.status(500).json({ error: 'Internal Server Error' })
}

module.exports = errorHandler
