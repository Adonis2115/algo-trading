const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

router.get('/profile', (req,res) => {
    fyers.get_profile().then((response) => {
        res.status(200).send(response.data)
    })
})