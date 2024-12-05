const { body, validationResult } = require('express-validator')

// Validation middleware for creating/updating tasks
const validateTask = [
  body('name').isString().withMessage('Name must be a string'),
  body('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be between 1 and 5'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler
  },
]

module.exports = validateTask
