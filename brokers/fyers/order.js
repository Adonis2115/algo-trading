const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

router.use(express.json())

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

// Return Data Stream instead of console and process it
function orderNotification() {
    const reqBody = {
        dataType: 'orderUpdate'
    }
    fyers.fyers_connect(reqBody, function (data) {
        console.log(data)
    })
}

router.get('/ordernotification', (req, res) => {
    orderNotification()
    res.status(200).send("Subscribed")
})

router.post('/order', (req, res) => {
    fyers.place_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/basket', (req, res) => {
    fyers.place_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/modifyorder', (req, res) => {
    fyers.modify_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/modifybasket', (req, res) => {
    fyers.modify_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/cancelorder', (req, res) => {
    fyers.cancel_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/cancelbasket', (req, res) => {
    fyers.cancel_multi_order(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/exitposition', (req, res) => {
    fyers.exit_position(req.body).then((response) => {
        res.status(200).send(response)
    })
})

router.post('/convertposition', (req, res) => {
    fyers.convert_position(req.body).then((response) => {
        res.status(200).send(response)
    })
})

module.exports = router