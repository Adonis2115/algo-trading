const express = require('express')
const app = express()

const profile = require('./brokers/fyers/profile')
const transaction = require('./brokers/fyers/transaction')
const order = require('./brokers/fyers/order')
const data = require('./brokers/fyers/data')

app.use(profile)
app.use(transaction)
app.use(order)
app.use(data)

app.listen(5000, () => console.log(`Server Up and running at ${5000}`))

module.exports = app