const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

router.use(express.json())

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

router.post('/order', (req,res) => {
    fyers.place_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/basket', (req,res) => {
    fyers.place_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/modifyorder', (req,res) => {
    fyers.modify_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/modifybasket', (req,res) => {
    fyers.modify_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/cancelorder', (req,res) => {
    fyers.cancel_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/cancelbasket', (req,res) => {
    fyers.cancel_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/exitposition', (req,res) => {
    fyers.exit_position(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/convertposition', (req,res) => {
    fyers.convert_position(req.body).then((response) => {
        res.status(200).send(response)
    })
})

// Real Time Order Notification 
// function orderSocket(){

// }

module.exports = router