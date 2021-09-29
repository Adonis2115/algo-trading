const express = require('express')
const app = express()

const profile = require('./brokers/fyers/profile')
const transaction = require('./brokers/fyers/transaction')

app.use(profile)
app.use(transaction)

app.listen(5000, () => console.log(`Server Up and running at ${5000}`))

module.exports = app