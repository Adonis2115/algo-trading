const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

router.use(express.json())

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

router.post('/submit', (req,res) => {
    fyers.place_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/basket', (req,res) => {
    fyers.place_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

module.exports = router