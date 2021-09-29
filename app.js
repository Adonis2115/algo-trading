const express = require('express')
const app = express()

const profile = require('./brokers/fyers/profile')
app.use(profile)

app.listen(5000, () => console.log(`Server Up and running at ${5000}`))

module.exports = app