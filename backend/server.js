const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const balanceRoutes = require('./routes/balanceRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const errorHandler = require('./middleware/errorHandler')
const cron = require('node-cron')
const ensureBalanceExists = require('./utils/ensureBalanceExists')

const Balance = require('./models/Balance')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(errorHandler)
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected')
    await ensureBalanceExists()
    console.log('Balance check completed!')
  })
  .catch((err) => console.log(err))

// Use Routes
app.use('/api/tasks', taskRoutes)
app.use('/api/balance', balanceRoutes)
app.use('/api/transactions', transactionRoutes)

// Every Sunday at 00:00 (midnight)
// Schedule the weekly balance update (every Sunday at midnight)
cron.schedule('0 0 * * 0', async () => {
  try {
    // Retrieve the balance document from the database
    const balance = await Balance.findOne()

    // If the balance is not found, log an error and exit
    if (!balance) {
      console.log('Balance not found.')
      return // Exit the cron job early if no balance is found
    }

    // Update balance values
    balance.balanceInDollars += 10
    balance.balanceInStars = balance.balanceInDollars * 10

    // Save the updated balance
    await balance.save()
    console.log('Balance updated with 10 bucks!')
  } catch (error) {
    console.error('Error updating balance:', error)
  }
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
