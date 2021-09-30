const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

router.get('/orderbook', (req, res) => {
    fyers.get_orders().then((response) => {
        res.status(200).send(response)
    })
})

router.get('/orderbook/:order_id', (req, res) => {
    fyers.get_filtered_orders(req.params.order_id).then((response) => {
        res.status(200).send(response)
    })
})

router.get('/positions', (req, res) => {
    fyers.get_positions().then((response) => {
        res.status(200).send(response)
    })
})

router.get('/trades', (req, res) => {
    fyers.get_tradebook().then((response) => {
        res.status(200).send(response)
    })
})

module.exports = router